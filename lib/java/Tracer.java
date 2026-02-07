import com.sun.jdi.*;
import com.sun.jdi.connect.Connector;
import com.sun.jdi.connect.AttachingConnector;
import com.sun.jdi.event.*;
import com.sun.jdi.request.EventRequest;
import com.sun.jdi.request.StepRequest;
import com.sun.jdi.request.EventRequestManager;
import com.sun.jdi.connect.Transport;
import com.sun.jdi.request.MethodEntryRequest;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.*;

public class Tracer {

    private static VirtualMachine vm;
    private static Map<String, String> objIdMap = new HashMap<>(); // ObjectReference unique ID -> UUID (String)
    private static Map<String, Object> store = new HashMap<>(); // Heap storage
    private static List<Map<String, Object>> history = new ArrayList<>();
    private static Set<String> recursing = new HashSet<>(); // Recursion guard for serialization

    // To identify our target class
    private static String TARGET_CLASS;

    // Output buffers
    private static StringBuilder targetStdout = new StringBuilder();
    private static StringBuilder targetStderr = new StringBuilder();

    public static void main(String[] args) throws Exception {
        if (args.length < 2) {
            System.err.println("Usage: java Tracer <PORT> <ClassToDebug>");
            System.exit(1);
        }
        String port = args[0];
        TARGET_CLASS = args[1];

        // 1. Attach to the target VM
        try {
            vm = attachTarget(port);
        } catch (Exception e) {
            System.err.println("Failed to attach: " + e.getMessage());
            e.printStackTrace();
            System.exit(1);
        }

        // 2. Set up event request for ClassPrepare (to set breakpoint at main)
        EventRequestManager erm = vm.eventRequestManager();
        // watching for target class load
        com.sun.jdi.request.ClassPrepareRequest classPrepareRequest = erm.createClassPrepareRequest();
        classPrepareRequest.addClassFilter(TARGET_CLASS);
        classPrepareRequest.enable();
        
        // Watch for method entry to capture traceCondition checks
        MethodEntryRequest methodEntryRequest = erm.createMethodEntryRequest();
        methodEntryRequest.addClassFilter(TARGET_CLASS);
        methodEntryRequest.enable();

        // 3. Event Loop
        runEventLoop(vm);

        // 4. Output Result
        printJsonResult();
    }

    private static VirtualMachine attachTarget(String port) throws Exception {
        AttachingConnector attachingConnector = null;
        
        // Find SocketAttachingConnector
        for (AttachingConnector ac : Bootstrap.virtualMachineManager().attachingConnectors()) {
            if (ac.name().equals("com.sun.jdi.SocketAttach")) {
                attachingConnector = ac;
                break;
            }
        }

        if (attachingConnector == null) {
            throw new IllegalStateException("Could not find SocketAttachingConnector");
        }

        Map<String, Connector.Argument> arguments = attachingConnector.defaultArguments();
        arguments.get("hostname").setValue("localhost");
        arguments.get("port").setValue(port);
        arguments.get("timeout").setValue("10000"); // 10s timeout

        return attachingConnector.attach(arguments);
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

                    if (se.location().declaringType().name().equals(TARGET_CLASS)) {
                        traceState(se.thread());
                    }

                } else if (event instanceof MethodEntryEvent) {
                    MethodEntryEvent me = (MethodEntryEvent) event;
                    if (me.method().name().equals("traceCondition")) {
                         // Get argument
                         try {
                             // The argument is the first one.
                             // But wait, we are AT entry. The arguments are in the stack frame?
                             // Or we can just get them from the frame since we are stopped.
                             ThreadReference t = me.thread();
                             StackFrame frame = t.frame(0);
                             List<Value> args = frame.getArgumentValues();
                             if (args.size() > 0 && args.get(0) instanceof BooleanValue) {
                                 boolean val = ((BooleanValue)args.get(0)).value();
                                 
                                 // We need to attach this 'val' to the *current* or *correct* history step.
                                 // Usually the 'if' statement is on a line. We probably traced that line JUST BEFORE entering this method?
                                 // Or we will trace it after returning?
                                 // The 'if (traceCondition(...))' evaluation happens. 
                                 // 1. Eval args (condition)
                                 // 2. Call traceCondition
                                 // 3. Return
                                 // 4. Evaluate 'if'
                                 
                                 // So we are inside the call. 
                                 // We should look at the *caller's* line number?
                                 // Frame 1 is the caller.
                                 // Let's add this result to the PREVIOUS history step?
                                 // OR create a new "partial" step?
                                 // The Instrumenter (backend) usually emits the trace AFTER the condition eval in some cases.
                                 // But here we are injecting a call.
                                 // Let's modify the LAST history entry if it matches the line?
                                 // Or just store it in a temporary variable that 'traceState' reads?
                                 // BUT 'traceState' is called by StepEvent.
                                 
                                 // Sequence:
                                 // 1. Line X (Start of If) -> StepEvent -> traceState()
                                 // 2. Main.traceCondition() -> MethodEntryEvent -> We are here.
                                 // 3. Return -> StepEvent (maybe?)
                                 
                                 // If (1) happened, we have a history entry for Line X.
                                 // We can update that entry with `conditionResult`.
                                 
                                 if (!history.isEmpty()) {
                                     Map<String, Object> lastStep = history.get(history.size() - 1);
                                     // Check if line matches caller?
                                     // StackFrame caller = t.frame(1);
                                     // int callerLine = caller.location().lineNumber();
                                     // if (lastStep.get("line").equals(callerLine)) {
                                         lastStep.put("conditionResult", val);
                                     // }
                                 }
                             }
                         } catch (Exception e) {
                             e.printStackTrace();
                         }
                    }

                } else if (event instanceof VMDeathEvent || event instanceof VMDisconnectEvent) {
                    connected = false;
                }
            }
            eventSet.resume();
        }
    }

    private static void enableStepRequest(ThreadReference thread) {
        StepRequest stepRequest = vm.eventRequestManager().createStepRequest(thread, StepRequest.STEP_LINE,
                StepRequest.STEP_INTO);
        // We can add class filter to only step in our class?
        stepRequest.addClassFilter(TARGET_CLASS);
        stepRequest.enable();
    }

    private static ThreadReference currentThread; // Added to support invokeMethod

    private static void traceState(ThreadReference thread) {
        currentThread = thread; // Update current thread
        recursing.clear(); // Clear recursion guard for new step
        store.clear(); // Clear store to only capture currently reachable objects
        try {
            if (thread.frameCount() == 0)
                return;
            StackFrame frame = thread.frame(0);
            Location loc = frame.location();

            // Current Line
            int line = loc.lineNumber();

            // Stack Trace
            List<Map<String, Object>> stackTrace = new ArrayList<>();
            for (StackFrame f : thread.frames()) {
                Map<String, Object> frameData = new HashMap<>();
                frameData.put("name", f.location().method().name());
                frameData.put("line", f.location().lineNumber());
                frameData.put("class", f.location().declaringType().name());
                stackTrace.add(frameData);
            }

            // Roots (Local Variables of Top Frame)
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

            // Capture Static Fields of the Target Class
            try {
                // We need the ReferenceType of the target class
                // We can get it from the location if we are in it?
                // Or search by name?
                if (loc.declaringType().name().equals(TARGET_CLASS)) {
                    ReferenceType type = loc.declaringType();
                    for (Field field : type.allFields()) {
                        if (field.isStatic() && !field.isSynthetic()) {
                            Value val = type.getValue(field);
                            roots.put(field.name(), serialize(val));
                        }
                    }
                }
            } catch (Exception e) {
                // Ignore statics error
            }

            Map<String, Object> step = new HashMap<>();
            step.put("line", line);
            step.put("roots", roots);
            step.put("stack", stackTrace); // Added stack
            step.put("store", deepCloneStore());
            // Optimizing: Actually we can just dump the current state of 'store'
            // assuming the historical playback doesn't mutate past stores?
            // JS frontend might assume store references are stable.
            // But if an object changes content, we need a new version or the store needs to
            // represent the state AT THAT TIME.
            // Python tracer creates a new "store" snapshot every time. We should do the
            // same copy.

            history.add(step);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // Serialize a JDI Value into a JSON-friendly object (primitives) or a Reference
    private static Object serialize(Value value) {
        if (value == null)
            return null;

        if (value instanceof PrimitiveValue) {
            // Boolean, Byte, Char, Double, Float, Integer, Long, Short
            if (value instanceof BooleanValue)
                return ((BooleanValue) value).value();
            if (value instanceof IntegerValue)
                return ((IntegerValue) value).value();
            if (value instanceof DoubleValue)
                return ((DoubleValue) value).value();
            if (value instanceof FloatValue)
                return ((FloatValue) value).value();
            if (value instanceof LongValue)
                return ((LongValue) value).value();
            if (value instanceof ShortValue)
                return ((ShortValue) value).value();
            if (value instanceof ByteValue)
                return ((ByteValue) value).value();
            if (value instanceof CharValue)
                return String.valueOf(((CharValue) value).value());
            return value.toString();
        } else if (value instanceof StringReference) {
            return ((StringReference) value).value();
        } else if (value instanceof ObjectReference) {
            ObjectReference objRef = (ObjectReference) value;
            String typeName = objRef.referenceType().name();

            // 1. Try Field Access First (Fastest and usually reliable)
            try {
                if (typeName.equals("java.lang.Integer")) {
                    Field f = objRef.referenceType().fieldByName("value");
                    if (f != null)
                        return ((IntegerValue) objRef.getValue(f)).value();
                } else if (typeName.equals("java.lang.Double")) {
                    Field f = objRef.referenceType().fieldByName("value");
                    if (f != null)
                        return ((DoubleValue) objRef.getValue(f)).value();
                } else if (typeName.equals("java.lang.Float")) {
                    Field f = objRef.referenceType().fieldByName("value");
                    if (f != null)
                        return ((FloatValue) objRef.getValue(f)).value();
                } else if (typeName.equals("java.lang.Long")) {
                    Field f = objRef.referenceType().fieldByName("value");
                    if (f != null)
                        return ((LongValue) objRef.getValue(f)).value();
                } else if (typeName.equals("java.lang.Short")) {
                    Field f = objRef.referenceType().fieldByName("value");
                    if (f != null)
                        return ((ShortValue) objRef.getValue(f)).value();
                } else if (typeName.equals("java.lang.Byte")) {
                    Field f = objRef.referenceType().fieldByName("value");
                    if (f != null)
                        return ((ByteValue) objRef.getValue(f)).value();
                } else if (typeName.equals("java.lang.Boolean")) {
                    Field f = objRef.referenceType().fieldByName("value");
                    if (f != null)
                        return ((BooleanValue) objRef.getValue(f)).value();
                } else if (typeName.equals("java.lang.Character")) {
                    Field f = objRef.referenceType().fieldByName("value");
                    if (f != null)
                        return String.valueOf(((CharValue) objRef.getValue(f)).value());
                }
            } catch (Exception e) {
                // Field access failed
            }

            // 2. Try Method Invocation Second (Fallback)
            if (currentThread != null) {
                try {
                    if (typeName.equals("java.lang.Integer")) {
                        Method m = objRef.referenceType().methodsByName("intValue").get(0);
                        Value v = objRef.invokeMethod(currentThread, m, Collections.emptyList(), 0);
                        return ((IntegerValue) v).value();
                    } else if (typeName.equals("java.lang.Double")) {
                        Method m = objRef.referenceType().methodsByName("doubleValue").get(0);
                        Value v = objRef.invokeMethod(currentThread, m, Collections.emptyList(), 0);
                        return ((DoubleValue) v).value();
                    } else if (typeName.equals("java.lang.Float")) {
                        Method m = objRef.referenceType().methodsByName("floatValue").get(0);
                        Value v = objRef.invokeMethod(currentThread, m, Collections.emptyList(), 0);
                        return ((FloatValue) v).value();
                    } else if (typeName.equals("java.lang.Long")) {
                        Method m = objRef.referenceType().methodsByName("longValue").get(0);
                        Value v = objRef.invokeMethod(currentThread, m, Collections.emptyList(), 0);
                        return ((LongValue) v).value();
                    } else if (typeName.equals("java.lang.Short")) {
                        Method m = objRef.referenceType().methodsByName("shortValue").get(0);
                        Value v = objRef.invokeMethod(currentThread, m, Collections.emptyList(), 0);
                        return ((ShortValue) v).value();
                    } else if (typeName.equals("java.lang.Byte")) {
                        Method m = objRef.referenceType().methodsByName("byteValue").get(0);
                        Value v = objRef.invokeMethod(currentThread, m, Collections.emptyList(), 0);
                        return ((ByteValue) v).value();
                    } else if (typeName.equals("java.lang.Boolean")) {
                        Method m = objRef.referenceType().methodsByName("booleanValue").get(0);
                        Value v = objRef.invokeMethod(currentThread, m, Collections.emptyList(), 0);
                        return ((BooleanValue) v).value();
                    } else if (typeName.equals("java.lang.Character")) {
                        Method m = objRef.referenceType().methodsByName("charValue").get(0);
                        Value v = objRef.invokeMethod(currentThread, m, Collections.emptyList(), 0);
                        return String.valueOf(((CharValue) v).value());
                    }
                } catch (Exception e) {
                    // Invoke failed
                }
            }

            // 3. Fallback: Return error string for Wrappers instead of object ref
            // This ensures we don't get "NaN" in frontend
            if (typeName.startsWith("java.lang.")) {
                if (typeName.equals("java.lang.Integer") || typeName.equals("java.lang.Double") ||
                        typeName.equals("java.lang.Float") || typeName.equals("java.lang.Long") ||
                        typeName.equals("java.lang.Short") || typeName.equals("java.lang.Byte") ||
                        typeName.equals("java.lang.Boolean") || typeName.equals("java.lang.Character")) {
                    return "<Unboxing Failed>";
                }
            }

            return serializeObject(objRef);
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

        // Recursion Guard
        if (recursing.contains(uniqueID)) {
            Map<String, String> ref = new HashMap<>();
            ref.put("__viz_ref", vizID);
            return ref;
        }
        recursing.add(uniqueID);

        try {
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
                    if (field.isStatic())
                        continue;
                    // Skip synthetic
                    if (field.isSynthetic())
                        continue;

                    Value val = objRef.getValue(field);
                    fieldsData.put(field.name(), serialize(val));
                }

                // Detect linked list node
                if (fieldsData.containsKey("next") || (fieldsData.containsKey("val") && fieldsData.containsKey("next"))) {
                    objectData.put("__viz_type", "node");
                }
                // Detect tree node
                if (fieldsData.containsKey("left") && fieldsData.containsKey("right")) {
                    objectData.put("__viz_type", "treenode");
                }

                // Detect java.util.Stack (or Vector/ArrayList) and treat as Array for
                // visualization
                if (refType.name().equals("java.util.Stack") || refType.name().equals("java.util.ArrayList")
                        || refType.name().equals("java.util.Vector")) {
                    try {
                        Field fieldData = refType.fieldByName("elementData");
                        Field fieldCount = refType.fieldByName("elementCount"); // Vector/Stack has elementCount
                        if (fieldCount == null)
                            fieldCount = refType.fieldByName("size"); // ArrayList has size

                        if (fieldData != null && fieldCount != null) {
                            Value dataVal = objRef.getValue(fieldData);
                            Value countVal = objRef.getValue(fieldCount);

                            if (dataVal instanceof ArrayReference && countVal instanceof IntegerValue) {
                                ArrayReference arrRef = (ArrayReference) dataVal;
                                int count = ((IntegerValue) countVal).value();

                                objectData.put("type", "array");
                                List<Object> content = new ArrayList<>();
                                // Only add up to count
                                for (int i = 0; i < count; i++) {
                                    if (i < arrRef.length()) { // Safety check
                                        content.add(serialize(arrRef.getValue(i)));
                                    }
                                }
                                objectData.put("value", content);
                                store.put(vizID, objectData);

                                Map<String, String> ref = new HashMap<>();
                                ref.put("__viz_ref", vizID);
                                return ref;
                            }
                        }
                    } catch (Exception e) {
                        // Fallback to default object serialization
                    }
                }

                objectData.put("value", fieldsData);

                // Merge fields into top level for convenience
                objectData.putAll(fieldsData);
            }

            store.put(vizID, objectData);

            Map<String, String> ref = new HashMap<>();
            ref.put("__viz_ref", vizID);
            return ref;
        } finally {
            recursing.remove(uniqueID);
        }
    }

    private static Map<String, Object> deepCloneStore() {
        // Deep clone the store map?
        // The values in store are Maps or Lists. We need to snapshot them because they
        // might be mutated in next step?
        // Actually, in our logic, we create NEW Maps for objectData every time
        // `serializeObject` is called.
        // So `store.put(vizID, objectData)` replaces the old object data with new one.
        // But `history` needs to keep the OLD store state.
        // So yes, we need to clone the current state of `store` for this history step.
        // Since `store` contains Map<String, Object> which are newly created each step,
        // we just need a shallow copy of the store map itself?
        // No, if we don't re-serialize an object, it stays in store?
        // Wait, `serializeObject` is called for every visible variable.
        // If an object is NOT reachable from current roots, it might arguably still be
        // in store from previous steps.
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
            if (i < history.size() - 1)
                sb.append(",");
        }
        sb.append("]");
        sb.append("}");
        System.out.println(sb.toString());
    }

    private static String toJson(Object o) {
        if (o == null)
            return "null";
        if (o instanceof String)
            return "\"" + escape((String) o) + "\"";
        if (o instanceof Number || o instanceof Boolean)
            return o.toString();
        if (o instanceof List) {
            List<?> l = (List<?>) o;
            StringBuilder sb = new StringBuilder();
            sb.append("[");
            for (int i = 0; i < l.size(); i++) {
                sb.append(toJson(l.get(i)));
                if (i < l.size() - 1)
                    sb.append(",");
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
                if (i < m.size() - 1)
                    sb.append(",");
                i++;
            }
            sb.append("}");
            return sb.toString();
        }
        return "\"" + o.toString() + "\"";
    }

    private static String escape(String s) {
        return s.replace("\\", "\\\\").replace("\"", "\\\"").replace("\n", "\\n").replace("\r", "\\r").replace("\t",
                "\\t");
    }
}
