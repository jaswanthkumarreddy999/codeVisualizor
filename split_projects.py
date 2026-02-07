import os
import json
import re

PROBLEMS_DIR = "/home/jaswanth/projects/codeVisualizor/problems"
OUTPUT_FILE = "/home/jaswanth/projects/codeVisualizor/lib/neetcode150.ts"

FOLDER_MAP = {
    "01_arrays_hashing": "arrays",
    "02_two_pointers": "two-pointers",
    "03_sliding_window": "sliding-window",
    "04_stack": "stack",
    "05_binary_search": "binary-search",
    "06_linked_list": "linked-list",
    "07_trees": "trees",
    "08_tries": "tries",
    "09_heap": "heap",
    "10_backtracking": "backtracking",
    "11_graphs": "graphs",
    "12_advanced_graphs": "advanced-graphs",
    "13_1d_dp": "1d-dp",
    "14_2d_dp": "2d-dp",
    "15_greedy": "greedy",
    "16_intervals": "intervals",
    "17_math_geometry": "math",
    "18_bit_manipulation": "bit-manipulation",
    "01_input_output": "basics",
    "02_data_types": "basics", 
    "03_conditionals": "basics",
    "04_loops": "basics",
    "05_basic_math": "basics",
    "06_ascii_chars": "basics",
    "07_functions": "basics",
    "08_arrays": "basics",
    "09_strings": "basics",
    "10_mixed": "basics"
}

projects = []

def to_title_case(filename):
    name = re.sub(r'^\d+_', '', filename)
    name = re.sub(r'\.java$', '', name)
    return name.replace('_', ' ').title()

def parse_java_file(content):
    lines = content.split('\n')
    
    imports = []
    helper_classes = []
    approaches = []
    
    current_approach_name = "Solution"
    current_approach_code = []
    
    # regex for approach header
    # // APPROACH 1: Name
    approach_regex = re.compile(r'//\s*APPROACH\s*\d+:\s*(.*)')
    
    # regex for helper class start (class X {)
    class_regex = re.compile(r'^\s*(?:static\s+)?class\s+\w+')
    
    in_helper_class = False
    brace_count = 0
    
    # First pass: Extract common imports and helper classes (global context)
    # Actually, simpler: Scanning linearly.
    
    # We need to capture the "Header" (Problem description) to prepend to each project?
    # Or just keep it.
    
    # Strategy:
    # 1. Split content by Approach Headers.
    # 2. The text BEFORE the first approach is "Global/Description". 
    #    It might contain imports and helper classes.
    # 3. Text matches "APPROACH X".
    
    parts = re.split(r'(//\s*=+\s*\n//\s*APPROACH\s*\d+:\s*.*?\n//\s*=+\s*)', content, flags=re.DOTALL)
    
    # parts[0] is header. parts[1] is separator 1, parts[2] is code 1, parts[3] is separator 2, parts[4] is code 2...
    
    header = parts[0]
    
    # Extract imports from Header
    header_lines = header.split('\n')
    problem_description = []
    global_helpers = [] # helper classes code
    
    capture_helpers = False
    current_helper = []
    
    img_imports = []
    for line in header_lines:
        if line.strip().startswith("import "):
            img_imports.append(line.strip())
        elif class_regex.match(line):
             # Start of a class definition in header area (e.g. TreeNode)
             capture_helpers = True
             current_helper.append(line)
             brace_count += line.count('{') - line.count('}')
        elif capture_helpers:
            current_helper.append(line)
            brace_count += line.count('{') - line.count('}')
            if brace_count == 0:
                capture_helpers = False
                global_helpers.append("\n".join(current_helper))
                current_helper = []
        else:
            # Check if it's description (comments)
            if line.strip().startswith("//"):
                problem_description.append(line)
    
    # If standard imports missing, add them
    defaults = [
        "import java.util.*;",
        "import java.util.concurrent.*;",
        "import java.util.stream.*;",
        "import java.io.*;",
        "import java.math.*;"
    ]
    for d in defaults:
        if d not in img_imports:
            img_imports.append(d)
            
    # Process Approaches
    parsed_approaches = []
    
    # iterate parts starting from 1
    i = 1
    while i < len(parts):
        separator = parts[i]
        code_block = parts[i+1] if i+1 < len(parts) else ""
        
        # Extract approach name
        match = approach_regex.search(separator)
        approach_name = match.group(1).split('-')[0].strip() if match else "Solution"
        # Removing complexity info from name if present (e.g. "Brute Force - O(n)")
        
        parsed_approaches.append({
            "name": approach_name,
            "code": code_block
        })
        i += 2
        
    # If no approaches found (e.g. only 1 solution without header), treat whole file as one
    if not parsed_approaches:
        # Check if there is ANY code in parts[0] that isn't imports/classes
        # This fallback is tricky. Let's assume parsed_approaches is empty means single file.
        # But we processed header... 
        # If parts has length 1, then everything is in header.
        if len(parts) == 1:
             parsed_approaches.append({
                 "name": "Solution",
                 "code": "\n".join([l for l in header_lines if not l.strip().startswith("import ") and not class_regex.match(l)]) # This excludes imports/classes we already captured
             })

    return {
        "imports": img_imports,
        "global_helpers": global_helpers,
        "description": "\n".join(problem_description),
        "approaches": parsed_approaches
    }

def wrap_code(imports, global_helpers, description, code_block):
    # Parsing the code_block to separate Methods vs Script
    # And cleaning up
    
    lines = code_block.split('\n')
    
    methods = []
    script = []
    
    # robust-ish regex for method start
    # static void dfs(...) { or void dfs(...) { or int func(...) {
    # We assume methods in these snippets are static or standard
    method_regex = re.compile(r'^\s*(?:(?:public|protected|private|static|final|abstract|synchronized)\s+)*[\w<>\[\]]+\s+\w+\s*\(.*\)\s*\{')
    
    in_method = False
    brace_balance = 0
    method_lines = []
    
    for line in lines:
        stripped = line.strip()
        if not stripped:
            if in_method: method_lines.append(line)
            else: script.append(line)
            continue
            
        if stripped.startswith('//'):
            if in_method: method_lines.append(line)
            else: script.append(line)
            continue
            
        # Check method start
        if brace_balance == 0:
            if method_regex.match(line):
                in_method = True
                method_lines.append(line)
                brace_balance += line.count('{') - line.count('}')
                continue
        
        if in_method:
            method_lines.append(line)
            brace_balance += line.count('{') - line.count('}')
            if brace_balance == 0:
                in_method = False
                methods.append("\n".join(method_lines))
                method_lines = []
        else:
            script.append(line)
            
    # Normalize script indentation (simple)
    script_str = "\n        ".join(script) # Add 8 spaces indent
    
    # HEURISTIC: Fix common missing declarations for m, n, len, size
    # If a line starts with "m =" or "n =", prepend "int "
    # This happens when approach 2 reuses variables from approach 1
    script_lines = script_str.split('\n')
    fixed_script_lines = []
    
    declared_vars = set()
    
    for line in script_lines:
        stripped = line.strip()
        
        # Check for declarations to add to set
        # e.g. "int m =" or "int m;"
        decl_match = re.match(r'^\s*(?:int|long|double|var)\s+([a-zA-Z0-9_]+)', line)
        if decl_match:
            declared_vars.add(decl_match.group(1))
            fixed_script_lines.append(line)
            continue
            
        # Check for assignments to common vars that might be missing declaration
        # targets: m, n, len, size, length, count, ans, res, result, total
        assign_match = re.match(r'^\s*([a-zA-Z0-9_]+)\s*=', line)
        if assign_match:
            var_name = assign_match.group(1)
            # List of common variables that are often ints in these problems
            common_vars = ["m", "n", "len", "size", "length", "count", "ans", "res", "result", "total", "idx", "left", "right", "low", "high", "start", "end"]
            
            if var_name in common_vars and var_name not in declared_vars:
                # Heuristic: If it's being assigned, and hasn't been declared, assume it's a new int declaration
                # BUT be careful of re-assignment in loops. 
                # If it's inside a loop (indentation > 8), maybe don't touch it?
                # Actually, our indentation is all 8 spaces (plus original indent).
                # If original indent was 0 (now 8), it's likely a declaration.
                # If indent > 8, it might be inside if/while.
                # Let's check indentation relative to script block
                
                # count spaces
                indent = len(line) - len(line.lstrip())
                # if indent == 8: # Top level of main <-- REMOVED strict check
                if True: # Apply to all scopes if not declared yet
                    line = line.replace(f"{var_name} =", f"int {var_name} =", 1)
                    declared_vars.add(var_name)
        
        fixed_script_lines.append(line)
        
    script_str = "\n".join(fixed_script_lines)

    
    # Process methods to ensure they are static if generic
    # Actually, for "Old way with classes", putting them in Main class means 
    # main() is static, so called methods MUST be static.
    # We will enforce 'static' keyword on methods if missing
    
    final_methods = []
    for m in methods:
        # Check if starts with static
        if 'static' not in m.split('(')[0]:
            # Inject static
            # Find first word that is not an annotation or modifier? 
            # Simple hack: replace first occurrence of (" " + returnType) with (" static " + returnType)
            # Or just prepend static if it starts with types.
            # E.g. "void dfs..." -> "static void dfs..."
            m = "static " + m
        final_methods.append(m)
        
    methods_str = "\n    ".join(final_methods)
    imports_str = "\n".join(imports)
    helpers_str = "\n\n".join(global_helpers)

    final_source = f"""{imports_str}

{description}

{helpers_str}

public class Main {{
    // Helper Methods
    {methods_str}

    public static void main(String[] args) {{
        {script_str}
    }}
}}
"""
    return final_source

# Main execution
for root, dirs, files in os.walk(PROBLEMS_DIR):
    dirs.sort()
    files.sort()
    
    dir_name = os.path.basename(root)
    if dir_name not in FOLDER_MAP:
        continue
    folder_id = FOLDER_MAP[dir_name]
    
    for file in files:
        if not file.endswith(".java"):
            continue
        
        file_path = os.path.join(root, file)
        with open(file_path, 'r') as f:
            content = f.read()
            
        parsed = parse_java_file(content)
        
        base_name = to_title_case(file)
        
        for idx, approach in enumerate(parsed["approaches"]):
            # Project ID
            p_id = f"nc150-{folder_id}-{file.replace('.java', '')}-{idx+1}"
            
            # Project Name
            p_name = f"{base_name}: {approach['name']}"
            if len(parsed["approaches"]) == 1:
                p_name = base_name # Don't append "Solution" if only one
            
            # Wrap Code
            final_code = wrap_code(parsed["imports"], parsed["global_helpers"], parsed["description"], approach["code"])
            
            project = {
                "id": p_id,
                "name": p_name,
                "updatedAt": 1700000000000 + idx,
                "code": final_code,
                "language": "java",
                "visualizedVariables": [],
                "ignoredPointers": {},
                "folderId": folder_id
            }
            projects.append(project)

# Output TS file
ts_content = f"""import {{ SavedProject }} from '../types/Project';

export const NEETCODE_150_PROJECTS: SavedProject[] = {json.dumps(projects, indent=4)};
"""

with open(OUTPUT_FILE, 'w') as f:
    f.write(ts_content)

print(f"Generated {len(projects)} projects.")
