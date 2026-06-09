import com.sun.jdi.*;
import com.sun.jdi.connect.Connector;
import com.sun.jdi.connect.ListeningConnector;
import com.sun.jdi.connect.IllegalConnectorArgumentsException;
import com.sun.jdi.event.*;
import com.sun.jdi.request.EventRequest;
import com.sun.jdi.request.StepRequest;
import com.sun.jdi.request.BreakpointRequest;
import com.sun.jdi.request.EventRequestManager;
import com.sun.jdi.request.MethodEntryRequest;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.*;

public class Tracer {

    private static VirtualMachine vm;
    private static Map<String, String> objIdMap = new HashMap<>(); 
    private static List<Map<String, Object>> history = new ArrayList<>();
    private static Set<String> recursing = new HashSet<>(); 
    private static ThreadReference lastThread = null; // used for Map.toString() invocation

    private static String TARGET_CLASS = "Main";

    private static StringBuilder targetStdout = new StringBuilder();
    private static StringBuilder targetStderr = new StringBuilder();

    public static void main(String[] args) throws Exception {
        if (args.length < 2) {
            System.err.println("Usage: java Tracer <CLASSPATH> <MainClass>");
            System.exit(1);
        }
        String classPath = args[0];
        String mainClass = args[1];
        TARGET_CLASS = mainClass.split(" ")[0];

        // 1. Setup Listening Connector (Robust against port scanning)
        ListeningConnector connector = null;
        for (ListeningConnector lc : Bootstrap.virtualMachineManager().listeningConnectors()) {
            if (lc.name().equals("com.sun.jdi.SocketListen")) {
                connector = lc;
                break;
            }
        }
        if (connector == null) throw new RuntimeException("No SocketListen connector found");

        Map<String, Connector.Argument> connectorArgs = connector.defaultArguments();
        connectorArgs.get("port").setValue("0");
        connectorArgs.get("localAddress").setValue("127.0.0.1"); // Bind only to localhost

        String listeningAddress = connector.startListening(connectorArgs);
        int portSeparator = listeningAddress.lastIndexOf(':');
        String port = listeningAddress.substring(portSeparator + 1);
        
        // System.err.println("Tracer listening on: " + listeningAddress); // Debug log

        // 2. Launch Target Process
        ProcessBuilder pb = new ProcessBuilder(
            "java",
            "-Xmx64m",
            "-agentlib:jdwp=transport=dt_socket,server=n,address=127.0.0.1:" + port + ",suspend=y",
            "-cp", classPath,
            mainClass
        );

        Process process = pb.start();
        startStreamReaders(process);

        // 3. Robust Accept Loop
        while (true) {
            try {
                vm = connector.accept(connectorArgs);
                break; // Connection accepted!
            } catch (IOException e) {
                // Handshake failed (likely a probe or invalid request)
                if (!process.isAlive()) {
                    System.err.println("Target process died before connecting. Exit code: " + process.exitValue());
                    System.exit(1);
                }
                // Ignore invalid handshake and retry
                // System.err.println("Ignored invalid connection request: " + e.getMessage());
            } catch (Exception e) {
                if (!process.isAlive()) {
                    System.err.println("Target process died. Error: " + e.getMessage());
                    System.exit(1);
                }
                throw e;
            }
        }
        connector.stopListening(connectorArgs); // Stop listening to new connections immediately

        // 4. Setup Events
        EventRequestManager erm = vm.eventRequestManager();
        
        com.sun.jdi.request.ClassPrepareRequest classPrepareRequest = erm.createClassPrepareRequest();
        classPrepareRequest.addClassFilter(TARGET_CLASS);
        classPrepareRequest.enable();

        // 5. Run Event Loop
        runEventLoop(vm);

        // 6. Output Result
        try {
            Thread.sleep(100); 
        } catch (InterruptedException e) {}
        
        printJsonResult();
        
        if (process.isAlive()) {
            process.destroyForcibly();
        }
        System.exit(0);
    }

    private static void startStreamReaders(Process process) {
        new Thread(() -> readStream(process.getInputStream(), targetStdout)).start();
        new Thread(() -> readStream(process.getErrorStream(), targetStderr)).start();
        
        // Forward stdin from Tracer (System.in) to Target Process
        new Thread(() -> {
            try (InputStream in = System.in; java.io.OutputStream out = process.getOutputStream()) {
                byte[] buffer = new byte[1024];
                int len;
                while ((len = in.read(buffer)) != -1) {
                    out.write(buffer, 0, len);
                    out.flush();
                }
            } catch (IOException e) {
                 // Broken pipe or closed stream is expected when process ends
            }
        }).start();
    }

    private static void readStream(InputStream is, StringBuilder sb) {
        try (InputStreamReader reader = new InputStreamReader(is)) {
            char[] buffer = new char[1024];
            int len;
            while ((len = reader.read(buffer)) != -1) {
                synchronized (sb) {
                    sb.append(buffer, 0, len);
                }
            }
        } catch (IOException e) { }
    }

    private static void runEventLoop(VirtualMachine vm) throws Exception {
        EventQueue eventQueue = vm.eventQueue();
        boolean connected = true;
        int stepCount = 0;
        final int MAX_STEPS = 2000;

        // Set of method names to skip recording (internal helpers)
        final Set<String> SKIP_METHODS = new HashSet<>(Arrays.asList("traceCondition"));

        while (connected) {
            try {
                EventSet eventSet = eventQueue.remove();
                for (Event event : eventSet) {
                    if (event instanceof ClassPrepareEvent) {
                        ClassPrepareEvent evt = (ClassPrepareEvent) event;
                        ReferenceType classType = evt.referenceType();
                        Method mainMethod = classType.methodsByName("main").get(0);
                        if (mainMethod != null) {
                            Location loc = mainMethod.location();
                            BreakpointRequest bpReq = vm.eventRequestManager().createBreakpointRequest(loc);
                            bpReq.enable();
                        }
                    } 
                    else if (event instanceof BreakpointEvent) {
                        BreakpointEvent evt = (BreakpointEvent) event;
                        ThreadReference thread = evt.thread();
                        StackFrame frame = thread.frame(0);
                        EventRequestManager erm = vm.eventRequestManager();
                        erm.deleteEventRequest(evt.request());
                        // Use STEP_INTO so we step line-by-line through user code
                        StepRequest stepReq = erm.createStepRequest(thread, StepRequest.STEP_LINE, StepRequest.STEP_INTO);
                        stepReq.addClassExclusionFilter("java.*");
                        stepReq.addClassExclusionFilter("javax.*");
                        stepReq.addClassExclusionFilter("sun.*");
                        stepReq.addClassExclusionFilter("com.sun.*");
                        stepReq.addClassExclusionFilter("jdk.*");
                        stepReq.enable();
                        recordState(frame, thread, "Breakpoint hit");
                    } 
                    else if (event instanceof StepEvent) {
                        StepEvent evt = (StepEvent) event;
                        ThreadReference thread = evt.thread();
                        StackFrame frame = thread.frame(0);
                        String methodName = frame.location().method().name();

                        if (!SKIP_METHODS.contains(methodName)) {
                            // Only record steps in user code (not internal helpers)
                            recordState(frame, thread, "Stepping");
                            stepCount++;
                            if (stepCount >= MAX_STEPS) {
                                vm.eventRequestManager().deleteEventRequests(vm.eventRequestManager().stepRequests());
                                vm.dispose();
                                connected = false;
                            }
                        }
                        // If we're inside a skipped method (e.g. traceCondition), just resume -
                        // the stepper will naturally return to user code on the next step event.
                    }
                    else if (event instanceof MethodEntryEvent) {
                        MethodEntryEvent evt = (MethodEntryEvent) event;
                        if (evt.method().name().equals("traceCondition")) {
                             ThreadReference thread = evt.thread();
                             StackFrame frame = thread.frame(0);
                             Value arg = frame.getArgumentValues().get(0);
                             boolean condResult = false;
                             if (arg instanceof BooleanValue) {
                                 condResult = ((BooleanValue) arg).value();
                             }
                             if (!history.isEmpty()) {
                                 Map<String, Object> lastStep = history.get(history.size() - 1);
                                 lastStep.put("conditionResult", condResult);
                             }
                        }
                    }
                    else if (event instanceof VMDeathEvent || event instanceof VMDisconnectEvent) {
                        connected = false;
                    }
                }
                eventSet.resume();
            } catch (VMDisconnectedException e) {
                connected = false;
            }
        }
    }

    // Variables that are internal/noise and should not appear in the heap.
    // Only filter "args" (the main method's String[] args parameter) - never filter
    // single-letter names like "b" which are valid user variable names.
    private static final Set<String> HIDDEN_VARS = new HashSet<>(Arrays.asList("args", "__viz_b"));

    private static void recordState(StackFrame frame, ThreadReference thread, String reason) {
        try {
            lastThread = thread; // save for Map serialization
            Map<String, Object> snapshot = new HashMap<>();
            Map<String, Object> currentStore = new HashMap<>();

            // Stack - filter out traceCondition and other internal helpers
            List<Map<String, Object>> stackTrace = new ArrayList<>();
            for (StackFrame f : thread.frames()) {
                String declType = f.location().declaringType().name();
                String methodName = f.location().method().name();
                if (!declType.startsWith("java.") && !declType.startsWith("javax.")
                        && !declType.startsWith("sun.") && !declType.startsWith("com.sun.")
                        && !declType.startsWith("jdk.")
                        && !methodName.equals("traceCondition")) {
                    Map<String, Object> frameInfo = new HashMap<>();
                    frameInfo.put("name", methodName);
                    frameInfo.put("line", f.location().lineNumber());
                    stackTrace.add(frameInfo);
                }
            }
            snapshot.put("stack", stackTrace);
            snapshot.put("line", frame.location().lineNumber());

            // Roots - collect visible variables, filtering out internal noise
            Map<String, Object> roots = new HashMap<>();
            try {
                Map<LocalVariable, Value> visibleVariables = frame.getValues(frame.visibleVariables());
                for (Map.Entry<LocalVariable, Value> entry : visibleVariables.entrySet()) {
                    String varName = entry.getKey().name();
                    if (!HIDDEN_VARS.contains(varName)) {
                        roots.put(varName, serialize(entry.getValue(), currentStore));
                    }
                }
                ReferenceType type = frame.location().declaringType();
                for (Field field : type.visibleFields()) {
                    if (HIDDEN_VARS.contains(field.name())) continue;
                    if (field.isStatic()) {
                        roots.put(field.name(), serialize(type.getValue(field), currentStore));
                    } else {
                        ObjectReference thisObj = frame.thisObject();
                        if (thisObj != null) {
                            roots.put(field.name(), serialize(thisObj.getValue(field), currentStore));
                        }
                    }
                }
            } catch (AbsentInformationException e) { }
            snapshot.put("roots", roots);
            snapshot.put("store", currentStore);
            
            // Capture Stdout
            synchronized (targetStdout) {
                snapshot.put("stdout", targetStdout.toString());
            }

            history.add(snapshot);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private static Object serialize(Value value, Map<String, Object> currentStore) {
        if (value == null) return null;

        if (value instanceof PrimitiveValue) {
            if (value instanceof IntegerValue) return ((IntegerValue) value).value();
            if (value instanceof BooleanValue) return ((BooleanValue) value).value();
            if (value instanceof ByteValue) return ((ByteValue) value).value();
            if (value instanceof CharValue) return String.valueOf(((CharValue) value).value());
            if (value instanceof ShortValue) return ((ShortValue) value).value();
            if (value instanceof LongValue) return ((LongValue) value).value(); 
            if (value instanceof FloatValue) {
                float f = ((FloatValue) value).value();
                if (Float.isNaN(f) || Float.isInfinite(f)) return String.valueOf(f);
                return f;
            }
            if (value instanceof DoubleValue) {
                double d = ((DoubleValue) value).value();
                if (Double.isNaN(d) || Double.isInfinite(d)) return String.valueOf(d);
                return d;
            }
            return value.toString();
        } else if (value instanceof StringReference) {
            return ((StringReference) value).value();
        } else if (value instanceof ArrayReference) {
            ArrayReference arrayRef = (ArrayReference) value;
            String id = getObjectId(arrayRef);
            if (!currentStore.containsKey(id)) {
                currentStore.put(id, null); 
                List<Object> elements = new ArrayList<>();
                for (Value v : arrayRef.getValues()) {
                    elements.add(serialize(v, currentStore));
                }
                Map<String, Object> arrayData = new HashMap<>();
                arrayData.put("type", "array");
                arrayData.put("value", elements);
                arrayData.put("__viz_id", id);
                currentStore.put(id, arrayData);
            }
            Map<String, String> ref = new HashMap<>();
            ref.put("__viz_ref", id);
            return ref;
        } else if (value instanceof ObjectReference) {
            ObjectReference objRef = (ObjectReference) value;
            String id = getObjectId(objRef);
            if (recursing.contains(id)) {
                Map<String, String> ref = new HashMap<>();
                ref.put("__viz_ref", id);
                return ref;
            }
            // Skip system classes to avoid bloating output (e.g. Scanner, System, etc.)
            // BUT: special-case java.util.Map and java.util.Set — serialize their contents
            ReferenceType type = objRef.referenceType();
            boolean isMap = false;
            boolean isSet = false;
            try {
                if (type instanceof ClassType) {
                    for (InterfaceType iface : ((ClassType) type).allInterfaces()) {
                        if (iface.name().equals("java.util.Map")) { isMap = true; break; }
                        if (iface.name().equals("java.util.Set")) { isSet = true; break; }
                    }
                }
            } catch (Exception ignored) {}

            // Serialize java.util.Set (HashSet, LinkedHashSet, TreeSet, etc.)
            if (isSet) {
                if (!currentStore.containsKey(id)) {
                    currentStore.put(id, null);
                    List<Object> elements = new ArrayList<>();
                    try {
                        // HashSet internally uses a HashMap — read its 'map' field
                        // then read the map's 'table' array and collect keys
                        Field mapField = null;
                        for (Field f : type.allFields()) {
                            if (f.name().equals("map") || f.name().equals("m") || f.name().equals("backingMap")) {
                                mapField = f; break;
                            }
                        }
                        if (mapField != null) {
                            Value mapVal = objRef.getValue(mapField);
                            if (mapVal instanceof ObjectReference) {
                                ObjectReference innerMap = (ObjectReference) mapVal;
                                ReferenceType mapType = innerMap.referenceType();
                                Field tableField = null;
                                for (Field f : mapType.allFields()) {
                                    if (f.name().equals("table")) { tableField = f; break; }
                                }
                                if (tableField != null) {
                                    Value tableVal = innerMap.getValue(tableField);
                                    if (tableVal instanceof ArrayReference) {
                                        ArrayReference table = (ArrayReference) tableVal;
                                        for (Value slot : table.getValues()) {
                                            if (!(slot instanceof ObjectReference)) continue;
                                            ObjectReference node = (ObjectReference) slot;
                                            int chainLimit = 0;
                                            while (node != null && chainLimit++ < 100) {
                                                ReferenceType nodeType = node.referenceType();
                                                Field keyField = null, nextField = null;
                                                for (Field f : nodeType.allFields()) {
                                                    if (f.name().equals("key")) keyField = f;
                                                    else if (f.name().equals("next")) nextField = f;
                                                }
                                                if (keyField != null) {
                                                    Value k = node.getValue(keyField);
                                                    elements.add(serialize(k, currentStore));
                                                }
                                                if (nextField != null) {
                                                    Value nextVal = node.getValue(nextField);
                                                    node = (nextVal instanceof ObjectReference) ? (ObjectReference) nextVal : null;
                                                } else { node = null; }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    } catch (Exception e) { /* fallback: empty set */ }
                    Map<String, Object> setData = new LinkedHashMap<>();
                    setData.put("type", "hashset");
                    setData.put("__viz_type", "hashset");
                    setData.put("value", elements);
                    setData.put("__viz_id", id);
                    currentStore.put(id, setData);
                }
                Map<String, String> ref = new HashMap<>();
                ref.put("__viz_ref", id);
                return ref;
            }

            if (isMap) {
                if (!currentStore.containsKey(id)) {
                    currentStore.put(id, null); // placeholder to break cycles
                    Map<String, Object> entries = new LinkedHashMap<>();
                    try {
                        // Read HashMap internals directly via field access (no method invocation needed)
                        // HashMap stores entries in a 'table' array of Node objects
                        // Each Node has: hash, key, value, next
                        Field tableField = null;
                        for (Field f : type.allFields()) {
                            if (f.name().equals("table")) { tableField = f; break; }
                        }
                        if (tableField != null) {
                            Value tableVal = objRef.getValue(tableField);
                            if (tableVal instanceof ArrayReference) {
                                ArrayReference table = (ArrayReference) tableVal;
                                for (Value slot : table.getValues()) {
                                    if (!(slot instanceof ObjectReference)) continue;
                                    ObjectReference node = (ObjectReference) slot;
                                    // Walk the chain (for collision chaining)
                                    int chainLimit = 0;
                                    while (node != null && chainLimit++ < 100) {
                                        ReferenceType nodeType = node.referenceType();
                                        Field keyField = null, valField = null, nextField = null;
                                        for (Field f : nodeType.allFields()) {
                                            if (f.name().equals("key")) keyField = f;
                                            else if (f.name().equals("value")) valField = f;
                                            else if (f.name().equals("next")) nextField = f;
                                        }
                                        if (keyField != null && valField != null) {
                                            Value k = node.getValue(keyField);
                                            Value v = node.getValue(valField);
                                            // Serialize key as string
                                            String keyStr;
                                            if (k instanceof StringReference) {
                                                keyStr = ((StringReference) k).value();
                                            } else if (k instanceof ObjectReference) {
                                                // For Character/Integer wrapper: get the 'value' field
                                                ReferenceType kt = ((ObjectReference) k).referenceType();
                                                Field innerVal = null;
                                                for (Field f : kt.allFields()) {
                                                    if (f.name().equals("value")) { innerVal = f; break; }
                                                }
                                                if (innerVal != null) {
                                                    Value inner = ((ObjectReference) k).getValue(innerVal);
                                                    keyStr = (inner instanceof CharValue)
                                                        ? String.valueOf(((CharValue) inner).value())
                                                        : inner.toString();
                                                } else {
                                                    keyStr = k.toString();
                                                }
                                            } else {
                                                keyStr = (k != null) ? k.toString() : "null";
                                            }
                                            entries.put(keyStr, serialize(v, currentStore));
                                        }
                                        // Move to next node in chain
                                        if (nextField != null) {
                                            Value nextVal = node.getValue(nextField);
                                            node = (nextVal instanceof ObjectReference) ? (ObjectReference) nextVal : null;
                                        } else {
                                            node = null;
                                        }
                                    }
                                }
                            }
                        }
                    } catch (Exception e) {
                        // Fallback: empty map shown
                    }
                    Map<String, Object> mapData = new LinkedHashMap<>();
                    mapData.put("type", "hashmap");
                    mapData.put("__viz_type", "hashmap");
                    mapData.put("value", entries);
                    mapData.put("__viz_id", id);
                    currentStore.put(id, mapData);
                }
                Map<String, String> ref = new HashMap<>();
                ref.put("__viz_ref", id);
                return ref;
            }

            if (type.name().startsWith("java.") || type.name().startsWith("sun.") || type.name().startsWith("jdk.")) {
                // Unwrap Java primitive wrapper types (Integer, Character, Boolean, etc.)
                // so they display as plain values instead of "java.lang.Integer@id"
                try {
                    Field innerVal = null;
                    for (Field f : type.allFields()) {
                        if (f.name().equals("value")) { innerVal = f; break; }
                    }
                    if (innerVal != null) {
                        Value wrapped = objRef.getValue(innerVal);
                        if (wrapped instanceof PrimitiveValue) {
                            return serialize(wrapped, currentStore);
                        }
                    }
                } catch (Exception ignored) {}
                return type.name() + "@" + id;
            }

            if (!currentStore.containsKey(id)) {
                recursing.add(id);
                Map<String, Object> fields = new HashMap<>();
                // ReferenceType type = objRef.referenceType(); // Already got it above
                for (Field f : type.visibleFields()) {
                    fields.put(f.name(), serialize(objRef.getValue(f), currentStore));
                }
                Map<String, Object> objData = new HashMap<>();
                objData.put("type", "object");
                objData.put("value", fields);
                objData.put("__viz_id", id);
                // Heuristic for types
                if (fields.containsKey("val") && (fields.containsKey("next") || fields.containsKey("left"))) {
                    if (fields.containsKey("left")) objData.put("__viz_type", "treenode");
                    else if (fields.containsKey("next")) objData.put("__viz_type", "node");
                }
                currentStore.put(id, objData);
                recursing.remove(id);
            }
            Map<String, String> ref = new HashMap<>();
            ref.put("__viz_ref", id);
            return ref;
        }
        return value.toString();
    }

    private static String getObjectId(ObjectReference ref) {
        String unique = String.valueOf(ref.uniqueID());
        if (!objIdMap.containsKey(unique)) {
            objIdMap.put(unique, UUID.randomUUID().toString());
        }
        return objIdMap.get(unique);
    }

    private static void printJsonResult() {
        System.out.print("{");
        System.out.print("\"stdout\": \"");
        System.out.print(escapeJson(targetStdout.toString()));
        System.out.print("\", ");
        System.out.print("\"stderr\": \"");
        System.out.print(escapeJson(targetStderr.toString()));
        System.out.print("\", ");
        System.out.print("\"history\": [");
        for (int i = 0; i < history.size(); i++) {
            printJsonMap(history.get(i));
            if (i < history.size() - 1) System.out.print(", ");
        }
        System.out.print("]");
        System.out.println("}");
    }

    private static void printJsonMap(Map<String, Object> map) {
        System.out.print("{");
        int i = 0;
        for (Map.Entry<String, Object> entry : map.entrySet()) {
             System.out.print("\"" + entry.getKey() + "\": ");
             Object val = entry.getValue();
             if (val instanceof String) {
                 System.out.print("\"" + escapeJson((String) val) + "\"");
             } else if (val instanceof List) {
                 System.out.print("[");
                 List<?> list = (List<?>) val;
                 for (int j = 0; j < list.size(); j++) {
                     Object item = list.get(j);
                     if (item instanceof Map) {
                         printJsonMap((Map<String, Object>) item);
                     } else if (item instanceof String) {
                         System.out.print("\"" + escapeJson((String) item) + "\"");
                     } else {
                         System.out.print(item);
                     }
                     if (j < list.size() - 1) System.out.print(", ");
                 }
                 System.out.print("]");
             } else if (val instanceof Map) {
                 printJsonMap((Map<String, Object>) val);
             } else {
                 System.out.print(val);
             }
             if (i < map.size() - 1) System.out.print(", ");
             i++;
        }
        System.out.print("}");
    }

    private static String escapeJson(String s) {
        if (s == null) return "";
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            switch (c) {
                case '\\': sb.append("\\\\"); break;
                case '"': sb.append("\\\""); break;
                case '\b': sb.append("\\b"); break;
                case '\f': sb.append("\\f"); break;
                case '\n': sb.append("\\n"); break;
                case '\r': sb.append("\\r"); break;
                case '\t': sb.append("\\t"); break;
                default:
                    if (c < 32) {
                        String hex = Integer.toHexString(c);
                        sb.append("\\u");
                        for (int k = 0; k < 4 - hex.length(); k++) sb.append('0');
                        sb.append(hex);
                    } else {
                        sb.append(c);
                    }
            }
        }
        return sb.toString();
    }
}
