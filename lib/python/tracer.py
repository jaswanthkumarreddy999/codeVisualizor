import sys
import json
import uuid
import types
import traceback
import io

# Map object ID (int) to UUID (str)
obj_id_map = {}

def get_viz_id(obj):
    oid = id(obj)
    if oid not in obj_id_map:
        obj_id_map[oid] = str(uuid.uuid4())[:8]
    return obj_id_map[oid]

def trace_execution(code, filename="<string>"):
    history = []
    
    def tracer(frame, event, arg):
        if event != 'line' and event != 'return':
            return tracer
        if frame.f_code.co_filename != filename:
            return tracer
            
        # For return events, we ONLY care if it's the module level return (end of script)
        # or potentially function returns if we want deep tracing, but for now let's focus on top level.
        # Actually, for the visualizer, we usually just want line-by-line.
        # The issue is the last line doesn't have a *subsequent* line event.
        # So we want to capture the state at the 'return' of the module.
        if event == 'return' and frame.f_code.co_name != '<module>':
            return tracer

            
        store = {}
        roots = {}
        
        # Helper to recursively serialize and populate store
        def serialize(val):
            # Primitives
            if isinstance(val, (int, float, bool, str, type(None))):
                return val
            
            # Complex objects
            if isinstance(val, (list, dict, set, tuple)) or hasattr(val, '__dict__'):
                viz_id = get_viz_id(val)
                
                # If complex object, return a reference
                ref = {"__viz_ref": viz_id}
                
                # If already in store, we don't need to re-serialize content (it's built for this step)
                if viz_id in store:
                    return ref
                
                # Placeholder to break recursion
                store[viz_id] = {} 
                
                if isinstance(val, list):
                    # We serialize lists as arrays
                    # Content is list of serialized values (primitives or refs)
                    content = [serialize(x) for x in val]
                    store[viz_id] = {
                        "type": "array",
                        "value": content,
                        "__viz_id": viz_id
                    }
                elif isinstance(val, (set, tuple)):
                    # Treat set/tuple as arrays for visualization for now
                    content = [serialize(x) for x in val]
                    store[viz_id] = {
                        "type": "array",
                        "value": content,
                        "__viz_id": viz_id
                    }
                elif isinstance(val, dict):
                    content = {str(k): serialize(v) for k, v in val.items()}
                    store[viz_id] = {
                        "type": "object", 
                        "value": content,
                        "__viz_id": viz_id
                    }
                elif hasattr(val, '__dict__'):
                    # Custom Object / Node
                    # We treat it as a dictionary of its attributes, but flattened into the object
                    # for the visualizer, similar to how JS objects work.
                    
                    # Serialize dict items
                    content = {}
                    for k, v in val.__dict__.items():
                        if k.startswith('__'): continue
                        content[k] = serialize(v)
                        
                    # Auto-detect type
                    vtype = 'object'
                    if 'next' in content: vtype = 'node'
                    elif 'left' in content or 'right' in content: vtype = 'treenode'
                    
                    # We merge content directly into the store object because 
                    # specific visualizers look for properties directly on the object.
                    store[viz_id] = {
                        **content,
                        "__viz_id": viz_id,
                        "__viz_type": vtype
                    }
                    
                return ref

            # Fallback for other types
            return str(val)

        # Capture visible variables
        for k, v in frame.f_locals.items():
            if k.startswith('__'): continue
            if isinstance(v, (types.ModuleType, types.FunctionType)): continue
            
            roots[k] = serialize(v)

        history.append({
            "line": frame.f_lineno,
            "roots": roots,
            "store": store, # The flat heap for this step
            "stdout": captured_out.getvalue() if captured_out else ""
        })
        
        return tracer

    captured_out = io.StringIO()
    old_stdout = sys.stdout
    
    try:
        compiled = compile(code, filename, 'exec')
        sys.settrace(tracer)
        
        # Capture stdout
        sys.stdout = captured_out

        # Mock input() to handle missing input gracefully
        def mock_input(prompt_msg=""):
            sys.stdout.write(prompt_msg)
            sys.stdout.flush()
            line = sys.stdin.readline()
            if not line:
                raise EOFError("Input expected but none provided in the IO panel. Please enter input and click 'Run' again.")
            return line.rstrip('\n')
        
        # Inject mock input into globals
        global_scope = {"input": mock_input}
        exec(compiled, global_scope)
    except Exception as e:
        traceback.print_exc(file=sys.stderr)

    finally:
        sys.settrace(None)
        # Restore stdout
        sys.stdout = old_stdout
        
    return {
        "history": history,
        "stdout": captured_out.getvalue()
    }

if __name__ == "__main__":
    import sys
    import os
    import io
    
    if len(sys.argv) < 2:
        print("Usage: python tracer.py <file>")
        sys.exit(1)
        
    target = sys.argv[1]
    with open(target, 'r') as f:
        code = f.read()
        
    res = trace_execution(code, target)
    print(json.dumps(res))
