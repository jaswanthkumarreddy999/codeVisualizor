import com.sun.jdi.*;
import com.sun.jdi.connect.Connector;
import com.sun.jdi.connect.LaunchingConnector;
import com.sun.jdi.event.*;
import com.sun.jdi.request.EventRequest;
import com.sun.jdi.request.StepRequest;
import com.sun.jdi.request.EventRequestManager; // Added import
import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.*;

public class Tracer {

    private static VirtualMachine vm;
    private static Map<String, String> objIdMap = new HashMap<>(); // ObjectReference unique ID -> UUID (String)
    private static Map<String, Object> store = new HashMap<>(); // Heap storage
    private static List<Map<String, Object>> history = new ArrayList<>();
    
    // To identify our target class
    private static String TARGET_CLASS; 
    
    // Output buffers
    private static StringBuilder targetStdout = new StringBuilder();
    private static StringBuilder targetStderr = new StringBuilder();

    public static void main(String[] args) throws Exception {
        if (args.length < 1) {
            System.err.println("Usage: java Tracer <ClassToDebug>");
            System.exit(1);
        }
        TARGET_CLASS = args[0];

        // 1. Launch the target VM
        vm = launchTarget(TARGET_CLASS);
        
        // 1.5 Start threads to gobble output
        Process process = vm.process();
        Thread outThread = new Thread(() -> readStream(process.getInputStream(), targetStdout));
        Thread errThread = new Thread(() -> readStream(process.getErrorStream(), targetStderr));
        outThread.start();
        errThread.start();

        // 2. Set up event request for ClassPrepare (to set breakpoint at main)
        EventRequestManager erm = vm.eventRequestManager();
        // watching for target class load
        com.sun.jdi.request.ClassPrepareRequest classPrepareRequest = erm.createClassPrepareRequest();
        classPrepareRequest.addClassFilter(TARGET_CLASS);
        classPrepareRequest.enable();

        // 3. Event Loop
        runEventLoop(vm);
        
        // Wait for output threads to finish? They might block if process doesn't close streams?
        // VM death should close them.
        try {
            outThread.join(1000);
            errThread.join(1000);
        } catch (InterruptedException e) {}
        
        // 4. Output Result
        printJsonResult();
    }
    
    private static void readStream(InputStream is, StringBuilder sb) {
        try (BufferedReader br = new BufferedReader(new InputStreamReader(is))) {
            String line;
            while ((line = br.readLine()) != null) {
                sb.append(line).append("\n");
            }
        } catch (Exception e) { }
    }

    private static VirtualMachine launchTarget(String mainClass) throws Exception {
        LaunchingConnector launchingConnector = Bootstrap.virtualMachineManager().defaultConnector();
        Map<String, Connector.Argument> arguments = launchingConnector.defaultArguments();
        arguments.get("main").setValue(mainClass);
        // Use the current classpath for the target VM so it can find the user class
        String currentCp = System.getProperty("java.class.path");
        arguments.get("options").setValue("-cp \"" + currentCp + "\""); 
        return launchingConnector.launch(arguments);
    }
    
    private static void runEventLoop(VirtualMachine vm) throws Exception {
        EventQueue eventQueue = vm.eventQueue();
        boolean connected = true;

        while (connected) {
            EventSet eventSet = eventQueue.remove();
            for (Event event : eventSet) {
                if (event instanceof ClassPrepareEvent) {
                    // Set breakpoint at main
                    ClassPrepareEvent evt = (ClassPrepareEvent) event;
                    ReferenceType classType = evt.referenceType();
                    // Find main method
                    Method mainMethod = classType.methodsByName("main").get(0);
                    
                    // Breakpoint at start of main
                    Location loc = mainMethod.location();
                    vm.eventRequestManager().createBreakpointRequest(loc).enable();
                    
                } else if (event instanceof BreakpointEvent) {
                    // We hit main. Now enable stepping.
                    BreakpointEvent bp = (BreakpointEvent) event;
                    enableStepRequest(bp.thread());
                    
                    // Trace this state too? Yes.
                    traceState(bp.thread());
                    
                } else if (event instanceof StepEvent) {
                    StepEvent se = (StepEvent) event;
                    
                    // Only trace if we are in the target class
                    if (se.location().declaringType().name().equals(TARGET_CLASS)) {
                        traceState(se.thread());
                    }
                    
                } else if (event instanceof VMDeathEvent || event instanceof VMDisconnectEvent) {
                    connected = false;
                }
            }
            eventSet.resume();
        }
    }

    private static void enableStepRequest(ThreadReference thread) {
        StepRequest stepRequest = vm.eventRequestManager().createStepRequest(thread, StepRequest.STEP_LINE, StepRequest.STEP_OVER);
        // We can add class filter to only step in our class?
        stepRequest.addClassFilter(TARGET_CLASS);
        stepRequest.enable();
    }

    private static void traceState(ThreadReference thread) {
        try {
            if (thread.frameCount() == 0) return;
            StackFrame frame = thread.frame(0);
            Location loc = frame.location();
            
            // Current Line
            int line = loc.lineNumber();
            
            // Roots (Local Variables)
            Map<String, Object> roots = new HashMap<>();
            
            try {
                // Get all visible variables
                List<LocalVariable> visibleVars = frame.visibleVariables();
                Map<LocalVariable, Value> values = frame.getValues(visibleVars);
                
                for (Map.Entry<LocalVariable, Value> entry : values.entrySet()) {
                    LocalVariable var = entry.getKey();
                    Value val = entry.getValue();
                    roots.put(var.name(), serialize(val));
                }
            } catch (AbsentInformationException e) {
                // Local variable info might be missing if not compiled with -g
                roots.put("<error>", "Compile with -g to see locals");
            }
            
            Map<String, Object> step = new HashMap<>();
            step.put("line", line);
            step.put("roots", roots);
            step.put("store", deepCloneStore()); // Snapshot of the store for this step? 
            // Optimizing: Actually we can just dump the current state of 'store' 
            // assuming the historical playback doesn't mutate past stores?
            // JS frontend might assume store references are stable. 
            // But if an object changes content, we need a new version or the store needs to represent the state AT THAT TIME.
            // Python tracer creates a new "store" snapshot every time. We should do the same copy.
            
            history.add(step);
            
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // Serialize a JDI Value into a JSON-friendly object (primitives) or a Reference
    private static Object serialize(Value value) {
        if (value == null) return null;
        
        if (value instanceof PrimitiveValue) {
            // Boolean, Byte, Char, Double, Float, Integer, Long, Short
            if (value instanceof BooleanValue) return ((BooleanValue)value).value();
            if (value instanceof IntegerValue) return ((IntegerValue)value).value();
            if (value instanceof DoubleValue) return ((DoubleValue)value).value();
            if (value instanceof FloatValue) return ((FloatValue)value).value();
            if (value instanceof LongValue) return ((LongValue)value).value();
            if (value instanceof ShortValue) return ((ShortValue)value).value();
            if (value instanceof ByteValue) return ((ByteValue)value).value();
            if (value instanceof CharValue) return String.valueOf(((CharValue)value).value());
            return value.toString();
        } else if (value instanceof StringReference) {
            return ((StringReference) value).value();
        } else if (value instanceof ObjectReference) {
            return serializeObject((ObjectReference) value);
        }
        
        return value.toString();
    }

    private static Map<String, String> serializeObject(ObjectReference objRef) {
        // Manage Identity
        String uniqueID = String.valueOf(objRef.uniqueID());
        String vizID;
        
        if (objIdMap.containsKey(uniqueID)) {
             vizID = objIdMap.get(uniqueID);
        } else {
             vizID = UUID.randomUUID().toString().substring(0, 8);
             objIdMap.put(uniqueID, vizID);
        }

        // Check if we need to (re)capture the object state.
        // For simplicity, we recapture it every time if it's mutable?
        // Or we just update the 'store'.
        // Python tracer serializes everything recursively.
        
        Map<String, Object> objectData = new HashMap<>();
        objectData.put("__viz_id", vizID);
        
        if (objRef instanceof ArrayReference) {
             ArrayReference arrayRef = (ArrayReference) objRef;
             objectData.put("type", "array");
             List<Object> content = new ArrayList<>();
             for (Value v : arrayRef.getValues()) {
                 content.add(serialize(v));
             }
             objectData.put("value", content);
        } else {
             objectData.put("type", "object");
             // Fields
             Map<String, Object> fieldsData = new HashMap<>();
             ReferenceType refType = objRef.referenceType();
             for (Field field : refType.allFields()) {
                 // Skip statics for now? Or include them?
                 if (field.isStatic()) continue; 
                 // Skip synthetic
                 if (field.isSynthetic()) continue;

                 Value val = objRef.getValue(field);
                 fieldsData.put(field.name(), serialize(val));
             }
             
             // Detect linked list node
             if (fieldsData.containsKey("next") || (fieldsData.containsKey("val") && fieldsData.containsKey("next"))) {
                 objectData.put("__viz_type", "node");
             }
             
             objectData.put("value", fieldsData);
             
             // Merge fields into top level for convenience if desired, but frontend expects 'value' for generic objects usually?
             // Actually python tracer does: 
             // store[id] = { ...content, __viz_id, __viz_type } 
             // where content is the dict of fields.
             // Let's match that structure.
             objectData.putAll(fieldsData);
        }
        
        store.put(vizID, objectData);
        
        Map<String, String> ref = new HashMap<>();
        ref.put("__viz_ref", vizID);
        return ref;
    }
    
    private static Map<String, Object> deepCloneStore() {
        // Deep clone the store map? 
        // The values in store are Maps or Lists. We need to snapshot them because they might be mutated in next step?
        // Actually, in our logic, we create NEW Maps for objectData every time `serializeObject` is called.
        // So `store.put(vizID, objectData)` replaces the old object data with new one.
        // But `history` needs to keep the OLD store state.
        // So yes, we need to clone the current state of `store` for this history step.
        // Since `store` contains Map<String, Object> which are newly created each step, we just need a shallow copy of the store map itself?
        // No, if we don't re-serialize an object, it stays in store?
        // Wait, `serializeObject` is called for every visible variable.
        // If an object is NOT reachable from current roots, it might arguably still be in store from previous steps.
        // But for visualization, we usually show what's capturing.
        // Ideally: clear store at start of traceState? 
        // Python tracer: 
        // store = {} inside trace_execution loop.
        // So it rebuilds store from scratch for reachable objects.
        // Let's do that.
        return new HashMap<>(store); 
    }
    
    // Quick and dirty JSON printer
    private static void printJsonResult() {
        StringBuilder sb = new StringBuilder();
        sb.append("{");
        
        // Output Stderr/Stdout
        sb.append("\"stdout\":").append(toJson(targetStdout.toString())).append(",");
        sb.append("\"stderr\":").append(toJson(targetStderr.toString())).append(",");
        
        sb.append("\"history\": [");
        for (int i = 0; i < history.size(); i++) {
            Map<String, Object> step = history.get(i);
            sb.append(toJson(step));
            if (i < history.size() - 1) sb.append(",");
        }
        sb.append("]");
        sb.append("}");
        System.out.println(sb.toString());
    }

    private static String toJson(Object o) {
        if (o == null) return "null";
        if (o instanceof String) return "\"" + escape((String)o) + "\"";
        if (o instanceof Number || o instanceof Boolean) return o.toString();
        if (o instanceof List) {
            List<?> l = (List<?>) o;
            StringBuilder sb = new StringBuilder();
            sb.append("[");
            for (int i = 0; i < l.size(); i++) {
                sb.append(toJson(l.get(i)));
                if (i < l.size() - 1) sb.append(",");
            }
            sb.append("]");
            return sb.toString();
        }
        if (o instanceof Map) {
            Map<?, ?> m = (Map<?, ?>) o;
            StringBuilder sb = new StringBuilder();
            sb.append("{");
            int i = 0;
            for (Map.Entry<?, ?> entry : m.entrySet()) {
                sb.append("\"").append(entry.getKey()).append("\":");
                sb.append(toJson(entry.getValue()));
                if (i < m.size() - 1) sb.append(",");
                i++;
            }
            sb.append("}");
            return sb.toString();
        }
        return "\"" + o.toString() + "\"";
    }
    
    private static String escape(String s) {
        return s.replace("\\", "\\\\").replace("\"", "\\\"").replace("\n", "\\n").replace("\r", "\\r").replace("\t", "\\t");
    }
}
