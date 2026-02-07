import com.sun.jdi.*;
import com.sun.jdi.connect.Connector;
import com.sun.jdi.connect.LaunchingConnector;
import com.sun.jdi.connect.IllegalConnectorArgumentsException;
import com.sun.jdi.event.*;
import com.sun.jdi.request.EventRequest;
import com.sun.jdi.request.StepRequest;
import com.sun.jdi.request.BreakpointRequest; 
import com.sun.jdi.request.EventRequestManager;
import com.sun.jdi.connect.Transport;
import com.sun.jdi.request.MethodEntryRequest;
import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.*;

public class Tracer {

    private static VirtualMachine vm;
    private static Map<String, String> objIdMap = new HashMap<>(); // ObjectReference unique ID -> UUID (String)
    private static Map<String, Object> store = new HashMap<>(); // Heap storage
    private static List<Map<String, Object>> history = new ArrayList<>();
    private static Set<String> recursing = new HashSet<>(); // Recursion guard for serialization

    // To identify our target class
    private static String TARGET_CLASS = "Main";

    // Output buffers
    private static StringBuilder targetStdout = new StringBuilder();
    private static StringBuilder targetStderr = new StringBuilder();

    public static void main(String[] args) throws Exception {
        if (args.length < 2) {
            System.err.println("Usage: java Tracer <CLASSPATH> <MainClass>");
            System.exit(1);
        }
        String classPath = args[0];
        String mainClass = args[1];
        TARGET_CLASS = mainClass;

        // 1. Launch the target VM
        try {
            vm = launchTarget(classPath, mainClass);
        } catch (Exception e) {
            System.err.println("Failed to launch: " + e.getMessage());
            e.printStackTrace();
            System.exit(1);
        }

        // 2. Start Stream Readers for Child Process
        startStreamReaders(vm.process());

        // 3. Set up event request for ClassPrepare
        EventRequestManager erm = vm.eventRequestManager();
        com.sun.jdi.request.ClassPrepareRequest classPrepareRequest = erm.createClassPrepareRequest();
        classPrepareRequest.addClassFilter(TARGET_CLASS);
        classPrepareRequest.enable();
        
        // Watch for method entry to capture traceCondition checks
        MethodEntryRequest methodEntryRequest = erm.createMethodEntryRequest();
        methodEntryRequest.addClassFilter(TARGET_CLASS);
        methodEntryRequest.enable();

        // 4. Event Loop
        runEventLoop(vm);

        // 5. Output Result
        printJsonResult();
    }

    private static VirtualMachine launchTarget(String classPath, String mainClass) throws Exception {
        LaunchingConnector launchingConnector = Bootstrap.virtualMachineManager().defaultConnector();
        Map<String, Connector.Argument> arguments = launchingConnector.defaultArguments();
        
        Connector.Argument mainArg = arguments.get("main");
        if (mainArg == null) throw new IllegalStateException("Bad launching connector");
        mainArg.setValue(mainClass);

        Connector.Argument optionsArg = arguments.get("options");
        if (optionsArg != null) {
            // Pass classpath and memory limit
            // Try without quotes first, assuming no spaces in /tmp path
            optionsArg.setValue("-cp " + classPath + " -Xmx64m");
        }

        try {
            return launchingConnector.launch(arguments);
        } catch (IllegalConnectorArgumentsException e) {
            System.err.println("IllegalConnectorArgumentsException: " + e.argumentNames());
            System.out.println("JSON_START{\"error\": \"Launch Failed\", \"details\": \"" + e.argumentNames() + "\"}JSON_END"); // Fallback JSON
            throw e;
        }
    }

    private static void startStreamReaders(Process process) {
        new Thread(() -> readStream(process.getInputStream(), targetStdout)).start();
        new Thread(() -> readStream(process.getErrorStream(), targetStderr)).start();
    }

    private static void readStream(InputStream is, StringBuilder sb) {
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(is))) {
            String line;
            while ((line = reader.readLine()) != null) {
                synchronized (sb) {
                    sb.append(line).append("\n");
                }
            }
        } catch (IOException e) {
            // Ignore stream closed errors
        }
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
                            // Breakpoint at start of main
                            Location loc = mainMethod.location();
                            BreakpointRequest bpReq = vm.eventRequestManager().createBreakpointRequest(loc);
                            bpReq.enable();
                        }
                    } 
                    else if (event instanceof BreakpointEvent) {
                        BreakpointEvent evt = (BreakpointEvent) event;
                        ThreadReference thread = evt.thread();
                        StackFrame frame = thread.frame(0);
                        
                        // We hit main. Now step!
                        EventRequestManager erm = vm.eventRequestManager();
                        // Delete the breakpoint
                        erm.deleteEventRequest(evt.request());

                        // Create StepRequest
                        StepRequest stepReq = erm.createStepRequest(thread, StepRequest.STEP_LINE, StepRequest.STEP_OVER);
                        stepReq.addClassFilter(TARGET_CLASS);
                        stepReq.enable();
                        
                        // Record initial state
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
                             
                             // Record this specialized state
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

    // --- Serialization and Snapshot Logic ---

    private static void recordState(StackFrame frame, ThreadReference thread, String reason) {
        try {
            Map<String, Object> snapshot = new HashMap<>();
            
            // Capture Stack
            List<Map<String, Object>> stackTrace = new ArrayList<>();
            for (StackFrame f : thread.frames()) {
                // Only capture frames from our target class to avoid noise
                if (f.location().declaringType().name().equals(TARGET_CLASS) || f.location().declaringType().name().equals("Main")) {
                     Map<String, Object> frameInfo = new HashMap<>();
                     frameInfo.put("name", f.location().method().name());
                     frameInfo.put("line", f.location().lineNumber());
                     stackTrace.add(frameInfo);
                }
            }
            snapshot.put("stack", stackTrace);
            snapshot.put("line", frame.location().lineNumber());

            // Capture Variables (Roots)
            Map<String, Object> roots = new HashMap<>();
            
            try {
                // Local variables
                Map<LocalVariable, Value> visibleVariables = frame.getValues(frame.visibleVariables());
                for (Map.Entry<LocalVariable, Value> entry : visibleVariables.entrySet()) {
                    roots.put(entry.getKey().name(), serialize(entry.getValue()));
                }
                
                // Static fields of the class
                ReferenceType type = frame.location().declaringType();
                for (Field field : type.visibleFields()) {
                    if (field.isStatic()) {
                        roots.put(field.name(), serialize(type.getValue(field)));
                    } else {
                        // Instance fields if 'this' exists
                        ObjectReference thisObj = frame.thisObject();
                        if (thisObj != null) {
                            roots.put(field.name(), serialize(thisObj.getValue(field)));
                        }
                    }
                }
            } catch (AbsentInformationException e) {
                // Info not available (compiled without -g?)
            }

            snapshot.put("roots", roots);
            
            // Store Snapshot of Heap (Global Store is updated by serialize)
            snapshot.put("store", new HashMap<>(store));
            
            history.add(snapshot);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private static Object serialize(Value value) {
        if (value == null) return null;

        if (value instanceof PrimitiveValue) {
            if (value instanceof IntegerValue) return ((IntegerValue) value).value();
            if (value instanceof BooleanValue) return ((BooleanValue) value).value();
            if (value instanceof ByteValue) return ((ByteValue) value).value();
            if (value instanceof CharValue) return String.valueOf(((CharValue) value).value());
            if (value instanceof ShortValue) return ((ShortValue) value).value();
            if (value instanceof LongValue) return ((LongValue) value).value(); 
            if (value instanceof FloatValue) return ((FloatValue) value).value();
            if (value instanceof DoubleValue) return ((DoubleValue) value).value();
            return value.toString();
        } else if (value instanceof StringReference) {
            return ((StringReference) value).value();
        } else if (value instanceof ArrayReference) {
            ArrayReference arrayRef = (ArrayReference) value;
            String id = getObjectId(arrayRef);
            if (!store.containsKey(id)) {
                store.put(id, null); 
                
                List<Object> elements = new ArrayList<>();
                for (Value v : arrayRef.getValues()) {
                    elements.add(serialize(v));
                }
                
                Map<String, Object> arrayData = new HashMap<>();
                arrayData.put("type", "array");
                arrayData.put("value", elements);
                arrayData.put("__viz_id", id);
                store.put(id, arrayData);
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
            
            if (!store.containsKey(id)) {
                recursing.add(id);
                Map<String, Object> fields = new HashMap<>();
                ReferenceType type = objRef.referenceType();
                
                // Identify Special Types
                for (Field f : type.visibleFields()) {
                    fields.put(f.name(), serialize(objRef.getValue(f)));
                }
                
                Map<String, Object> objData = new HashMap<>();
                objData.put("type", "object");
                objData.put("value", fields);
                objData.put("__viz_id", id);
                
                if (fields.containsKey("val") && (fields.containsKey("next") || fields.containsKey("left") || fields.containsKey("right"))) {
                    if (fields.containsKey("left") || fields.containsKey("right")) {
                        objData.put("__viz_type", "treenode");
                    } else if (fields.containsKey("next")) {
                        objData.put("__viz_type", "node");
                    }
                }
                store.put(id, objData);
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
        
        // Output Streams
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
        return s.replace("\\", "\\\\")
                .replace("\"", "\\\"")
                .replace("\n", "\\n")
                .replace("\r", "\\r")
                .replace("\t", "\\t");
    }
}
