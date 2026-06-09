import sys
import subprocess
import json
import re
import uuid

def run_gdb_tracer(binary_path):
    # Start GDB with MI interpreter
    gdb_process = subprocess.Popen(
        ['gdb', '-q', '-nx', '--interpreter=mi', binary_path],
        stdin=subprocess.PIPE,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True,
        bufsize=0 # Unbuffered
    )

    history = []
    store = {}
    obj_id_map = {} # addr -> viz_id

    def send_command(cmd):
        # formatted_cmd = f"{cmd}\n"
        # print(f"SEND: {cmd}", file=sys.stderr)
        gdb_process.stdin.write(f"{cmd}\n")
        gdb_process.stdin.flush()

    def read_response():
        output_lines = []
        while True:
            line = gdb_process.stdout.readline()
            if not line: break
            # Check for (gdb) prompt
            if line.strip() == '(gdb)':
                break
            output_lines.append(line)
        return output_lines

    def parse_mi_output(lines):
        # Very basic MI parser
        # We are looking for things like *stopped,reason="...",frame={...}
        # and ^done,variables=[...]
        result = {}
        for line in lines:
            line = line.rstrip() # Remove trailing newline for parsing logic
            if line.startswith('*stopped'):
                result['stopped'] = line
            elif line.startswith('^done'):
                result['done'] = line
            elif line.startswith('@'): # Target output (if caught by MI)
                val = json.loads(line[1:]) 
                clean_val = val.replace(r'\n', '\n').replace(r'\t', '\t')
                if 'stdout' not in result: result['stdout'] = ""
                result['stdout'] += clean_val
            elif line.startswith('~'): # Console output - Ignore
                pass
            elif line.startswith('&'): # Log output
                pass
            elif line.startswith('^') or line.startswith('*') or line.startswith('='):
                 # Other MI records
                 pass
            else:
                 # Raw output (Target stdout)
                 # Keep original formatting (restore newline if needed, but 'lines' has it?)
                 # Wait, I stripped it above inside loop? No, I stripped it in `line = line.rstrip()`.
                 # But 'lines' comes from read_response where I removed strip().
                 # So `lines` elements have `\n`.
                 # I should use the original content.
                 # Let's verify loop variable scope.
                 # Actually, better to just use the original line from `lines` list if it falls here.
                 # But I need to detect MI prefixes.
                 
                 # Logic change:
                 clean_line = line.strip()
                 if not (clean_line.startswith('*') or clean_line.startswith('^') or 
                         clean_line.startswith('=') or clean_line.startswith('~') or 
                         clean_line.startswith('@') or clean_line.startswith('&')):
                     if 'stdout' not in result: result['stdout'] = ""
                     # Add back newline if it was stripped? 
                     # Actually, `line` variable "line = line.rstrip()" shadows the loop variable?
                     # No, Python loops reuse variable.
                     # Let's fix the iteration.
                     
                     if 'stdout' not in result: result['stdout'] = ""
                     result['stdout'] += line + "\n" # Add newline as `rstrip` removed it
        return result
    
    # Helper to parse GDB var list: name="i",value="0",type="int"
    # MI list format: variables=[{name="i",value="0",type="int"},...]
    def parse_vars(mi_line):
        # This regex is a simplistic approximation for GDB MI output
        # Real parsing requires a robust tokenizer, but for simple C programs we can try regex
        # or use -enable-pretty-printing and var-objects maybe?
        
        # NOTE: -stack-list-variables --simple-values output:
        # ^done,variables=[{name="i",arg="1",type="int",value="0"},{name="argc",...}]
        
        if 'variables=[' not in mi_line: return []
        
        content = mi_line.split('variables=[')[1]
        # remove trailing ]
        if content.endswith(']'): content = content[:-1]
        
        # Split by }, {
        # This is fragile if values contain curlies.
        # But let's try.
        
        objs = []
        # Basic split by "},{"
        # We need a smarter splitter that respects nested braces/quotes?
        # For simple values, it's flat.
        
        # Regex to capture {name="...",...} blocks?
        # Let's iterate.
        
        raw_items = re.findall(r'\{([^}]+)\}', content)
        for item in raw_items:
            # item resembles: name="i",arg="1",type="int",value="0"
            var = {}
            parts = re.findall(r'([a-zA-Z0-9_]+)="([^"]+)"', item)
            for k, v in parts:
                var[k] = v
            objs.append(var)
        return objs

    # --- Start Debugging ---
    
    # Check output buffer threads?
    # Actually we drive it synchronously: send command, read until (gdb)
    
    # Read initial startup banner
    read_response() 
    
    # Set breakpoint at main
    send_command('-break-insert main')
    read_response()
    
    # Run
    send_command('-exec-run')
    # Loop until stopped
    
    running = True
    
    # Accumulate target stdout from the beginning?
    target_stdout = ""
    target_stderr = ""

    while running:
        lines = read_response()
        parsed = parse_mi_output(lines)
        
        if 'stdout' in parsed:
            target_stdout += parsed['stdout']
            
        if 'stopped' in parsed:
            stopped_line = parsed['stopped']
            
            if 'reason="exited-normally"' in stopped_line or 'reason="exited"' in stopped_line:
                running = False
                break
                
            # Check if we are in our file (optional, but good)
            # frame={level="0",addr="...",func="main",file="program.c",fullname="/.../program.c",line="6",...}
            match = re.search(r'line="(\d+)"', stopped_line)
            line_no = int(match.group(1)) if match else -1
            
            # Capture variables
            # -stack-list-variables --simple-values
            send_command('-stack-list-variables --simple-values')
            var_lines = read_response()
            
            # Combine all output lines for parsing done message
            full_var_resp = "".join(var_lines)
            
            vars_list = parse_vars(full_var_resp)
            
            roots = {}
            
            for v in vars_list:
                name = v.get('name')
                val_str = v.get('value')
                type_str = v.get('type')
                
                # Check for pointers/arrays in type logic if needed?
                # GDB value="0x..." for pointer
                # value="{...}" for struct/array
                
                # Simplified Serialization
                roots[name] = val_str
                
                # TODO: Handle pointers and proper objects
                # If value starts with 0x, it's a pointer.
                # If value starts with {, it's aggregate.
            
            history.append({
                "line": line_no,
                "roots": roots,
                "store": store # TODO: Populate store for pointers
            })
            
            # Step
            send_command('-exec-next')
        else:
            # Maybe just output or running info
            pass

    # Quit
    send_command('-gdb-exit')
    gdb_process.wait()
    
    print(json.dumps({
        "stdout": target_stdout,
        "stderr": target_stderr,
        "history": history
    }))

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print("Usage: python3 gdb_tracer.py <binary>")
        sys.exit(1)
    
    run_gdb_tracer(sys.argv[1])
