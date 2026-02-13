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
import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.*;

public class Tracer {

    private static VirtualMachine vm;
    private static Map<String, String> objIdMap = new HashMap<>(); 
    // private static Map<String, Object> store = new HashMap<>();  // Removed
    private static List<Map<String, Object>> history = new ArrayList<>();
    private static Set<String> recursing = new HashSet<>(); 

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
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(is))) {
            String line;
            while ((line = reader.readLine()) != null) {
                synchronized (sb) {
                    sb.append(line).append("\n");
                }
            }
        } catch (IOException e) { }
    }

    private static void runEventLoop(VirtualMachine vm) throws Exception {
        EventQueue eventQueue = vm.eventQueue();
        boolean connected = true;

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
                        StepRequest stepReq = erm.createStepRequest(thread, StepRequest.STEP_LINE, StepRequest.STEP_OVER);
                        stepReq.addClassFilter(TARGET_CLASS);
                        stepReq.enable();
                        recordState(frame, thread, "Breakpoint hit");
                    } 
                    else if (event instanceof StepEvent) {
                        StepEvent evt = (StepEvent) event;
                        ThreadReference thread = evt.thread();
                        StackFrame frame = thread.frame(0);
                        recordState(frame, thread, "Stepping");
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

    private static void recordState(StackFrame frame, ThreadReference thread, String reason) {
        try {
            Map<String, Object> snapshot = new HashMap<>();
            Map<String, Object> currentStore = new HashMap<>();
            
            // Stack
            List<Map<String, Object>> stackTrace = new ArrayList<>();
            for (StackFrame f : thread.frames()) {
                if (f.location().declaringType().name().equals(TARGET_CLASS) || f.location().declaringType().name().equals("Main")) {
                     Map<String, Object> frameInfo = new HashMap<>();
                     frameInfo.put("name", f.location().method().name());
                     frameInfo.put("line", f.location().lineNumber());
                     stackTrace.add(frameInfo);
                }
            }
            snapshot.put("stack", stackTrace);
            snapshot.put("line", frame.location().lineNumber());

            // Roots
            Map<String, Object> roots = new HashMap<>();
            try {
                Map<LocalVariable, Value> visibleVariables = frame.getValues(frame.visibleVariables());
                for (Map.Entry<LocalVariable, Value> entry : visibleVariables.entrySet()) {
                    roots.put(entry.getKey().name(), serialize(entry.getValue(), currentStore));
                }
                ReferenceType type = frame.location().declaringType();
                for (Field field : type.visibleFields()) {
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
            ReferenceType type = objRef.referenceType();
            if (type.name().startsWith("java.") || type.name().startsWith("sun.") || type.name().startsWith("jdk.")) {
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
