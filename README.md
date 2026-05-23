# Code Visualizer

A web-based interactive debugger and code visualization tool that lets you write code in **TypeScript, Python, Java, C, or C++** and watch it execute step-by-step — with animated visualizations of variables, arrays, matrices, trees, linked lists, and hash maps.

🌐 **Live Demo**: [https://codevisualizor.onrender.com](https://codevisualizor.onrender.com)

---

## What It Does

Write code → Click **Run Code** → Step through execution one line at a time.

At each step you see:
- The **current line highlighted** in the editor (green = condition passed, red = condition failed)
- All **variables in the Heap Explorer** (right panel)
- **Drag any variable** onto the canvas to visualize it
- **Stdout output** updating in real time as you step through

---

## Features

### Multi-Language Execution
| Language | Execution Method | Visualization |
|---|---|---|
| TypeScript | Client-side Babel AST instrumentation | Full — all variable types |
| Python | Server-side `sys.settrace` tracer | Full — all variable types |
| Java | Server-side JDI (Java Debug Interface) | Full — all variable types |
| C | Server-side GDB MI tracer | Primitives only |
| C++ | Server-side GDB MI tracer | Primitives only |

### Visualizers
- **Primitive** — shows value with animated diff indicator (`+N`/`-N`) when it changes
- **Array (1D)** — three view modes: bar chart, box grid, stack. Drag index/pointer variables onto it to highlight elements. For-each iterators highlight by value (teal), index pointers highlight by position (purple)
- **Matrix (2D)** — grid with row/column index labels. Drag `i`/`j` variables to highlight rows, columns, and the intersection cell
- **Linked List** — traverses `.next` pointers, renders nodes with SVG arrows, detects cycles
- **Binary Tree** — recursive layout with SVG Bezier edges, zoom/pan support
- **Hash Map** — renders object key-value pairs in 8 visual hash buckets

### Interactive Canvas
- **Drag & drop** variables from Heap Explorer onto the canvas
- **Drag to reposition** visualizer cards anywhere on the canvas
- **Resize** any card by dragging the bottom-right corner
- **Arithmetic animations** — when stepping through `a = b + c` or `if (a < b)`, values animate flying between visualizers
- **Print animations** — floating text appears when `stdout` grows

### Timeline Controls
- Step **forward / backward** one step at a time
- **Play/pause** with 4 speed presets (0.5x / 1x / 2.5x / 5x)
- **Scrubber** to jump to any step instantly
- Step counter and description label

### Projects & NeetCode 150
- **Save/load projects** with full state (code, language, canvas layout, visualizer positions)
- **Folder system** with drag-and-drop organization
- **Auto-seeded NeetCode 150** problems across all categories (Arrays, Two Pointers, Trees, DP, Graphs, etc.)
- **Java Basics** folder with ~50 problems covering IO, data types, loops, OOP, sorting, and more

### Themes & Customization
- 3 theme modes: **Dark**, **Light**, **CodeNow** (gradient/animated)
- 4 accent colors: Blue, Purple, Green, Orange
- Resizable panels: editor width, watch window width, code/IO split
- Collapsible sidebar, IO panel, and watch window

### IO Panel
- **stdin** input area — enter values before running code that uses `Scanner`/`input()`
- **stdout** output area — shows program output, updates per step
- Runtime errors shown as `⚠ Runtime Error: ExceptionType → at line N`

---

## How It Works

### TypeScript Pipeline (client-side)
```
User code
  → Babel AST instrumentation (instrumenter.ts)
      Wraps every assignment/declaration/condition in _trace()
  → ExecutionEngine.run() (state-machine.ts)
      Executes via new Function(), _trace() builds history[]
  → StateSnapshot[] displayed in UI
```

### Java Pipeline (server-side)
```
User code
  → formatJavaCode() — normalize to multi-line, add braces to braceless bodies
  → wrapConditions() — wrap if/while/for conditions in traceCondition()
  → javac --release 17 -g — compile with debug info
  → Tracer.java (JDI) — spawns user JVM, steps line-by-line via STEP_INTO
      At each step: serialize all local vars + static fields → { roots, store }
      On traceCondition() entry: capture boolean result for line highlighting
  → JSON { stdout, stderr, history[] }
  → hydrateHistory() — resolve __viz_ref pointers, tag for-each iterators
  → StateSnapshot[] displayed in UI
```

### Python Pipeline (server-side)
```
User code
  → lib/python/tracer.py — sys.settrace intercepts every line event
      Serializes frame.f_locals → { roots, store }
  → JSON { stdout, history[] }
  → hydrateHistory() → StateSnapshot[]
```

### C/C++ Pipeline (server-side)
```
User code
  → gcc/g++ -g -O0 — compile with debug info
  → lib/c/gdb_tracer.py — drives GDB via MI protocol
      -stack-list-variables at each breakpoint → { roots }
  → JSON { stdout, history[] }
  → StateSnapshot[]
```

---

## Getting Started

### Prerequisites
- Node.js 20+
- Java 17 JDK (for Java execution)
- Python 3 (for Python execution)
- GCC/G++ + GDB (for C/C++ execution)

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production Build

```bash
npm run build
npm start
```

### Docker

```bash
docker build -t code-visualizer .
docker run -p 3000:3000 code-visualizer
```

The Dockerfile installs Java 17 JDK, Python 3, and build-essential (GCC/G++) automatically.

---

## Project Structure

```
├── app/
│   ├── page.tsx                  # Main page — wires all hooks and components
│   ├── layout.tsx                # Root layout with fonts and metadata
│   └── api/
│       ├── run-java/route.ts     # Java execution API (format → compile → JDI trace)
│       ├── run-python/route.ts   # Python execution API
│       ├── run-c/route.ts        # C execution API
│       └── run-cpp/route.ts      # C++ execution API
│
├── components/
│   ├── CodeEditor.tsx            # Monaco editor with line highlighting
│   ├── UnifiedVisualizer.tsx     # Canvas — dispatches to sub-visualizers
│   ├── ArrayVisualizer.tsx       # 1D array — bar/box/stack views, pointer highlighting
│   ├── MatrixVisualizer.tsx      # 2D array — grid with row/col highlighting
│   ├── TreeVisualizer.tsx        # Binary tree — recursive layout, zoom/pan
│   ├── LinkedListVisualizer.tsx  # Singly linked list with cycle detection
│   ├── HashMapVisualizer.tsx     # Object/map as hash buckets
│   ├── PrimitiveVisualizer.tsx   # Single variable with diff animation
│   ├── ArithmeticAnimator.tsx    # Floating value animation for arithmetic ops
│   ├── PrintAnimator.tsx         # Floating text animation for stdout
│   ├── WatchWindow.tsx           # Heap Explorer + Stack Trace panel
│   ├── Timeline.tsx              # Step controls, scrubber, play/pause
│   ├── IOPanel.tsx               # stdin/stdout split panel
│   ├── Navbar.tsx                # Top bar with Run button and project manager
│   ├── ProjectManager.tsx        # Full project/folder CRUD with NeetCode 150
│   ├── SettingsModal.tsx         # Theme and accent color picker
│   └── ErrorBoundary.tsx         # React error boundary for the canvas
│
├── hooks/
│   ├── useExecution.ts           # Execution state, handleRun, playback
│   ├── useLayout.ts              # Panel sizes and resize handlers
│   ├── usePersistence.ts         # Auto-save/load current state to localStorage
│   └── useTheme.ts               # Theme mode and accent color
│
├── lib/
│   ├── engine/
│   │   ├── instrumenter.ts       # Babel AST transformer for TypeScript
│   │   ├── state-machine.ts      # ExecutionEngine — runs instrumented TS code
│   │   └── hydrateHistory.ts     # Converts backend { roots, store } → StateSnapshot[]
│   ├── java/
│   │   ├── Tracer.java           # JDI-based step debugger for Java
│   │   └── ConnectorProbe.java   # (unused — legacy)
│   ├── python/
│   │   └── tracer.py             # sys.settrace-based tracer for Python
│   ├── c/
│   │   └── gdb_tracer.py         # GDB MI-based tracer for C/C++
│   └── neetcode150.ts            # NeetCode 150 + Java Basics problem definitions
│
├── types/
│   └── Project.ts                # TypeScript interfaces (StateSnapshot, SavedProject, etc.)
│
└── Dockerfile                    # Production container (Node 20 + Java 17 + Python 3 + GCC)
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI | React 19, Tailwind CSS v4 |
| Animations | Framer Motion |
| Code Editor | Monaco Editor (`@monaco-editor/react`) |
| TS Instrumentation | Babel (`@babel/parser`, `@babel/traverse`, `@babel/generator`) |
| Java Debugging | JDI (`jdk.jdi` module, Java 17) |
| Python Tracing | `sys.settrace` |
| C/C++ Tracing | GDB Machine Interface |
| Icons | Lucide React |
| IDs | nanoid |
| Deployment | Render (Docker) |

---

## Known Limitations

### C / C++
- Only **primitive scalar variables** are visualized. Pointers, arrays, and structs show as raw GDB strings (e.g. `"0x7fff..."`, `"{1, 2, 3}"`).
- Programs using `scanf`/`cin` may hang — stdin is not forwarded to the GDB process.
- Uses `step-over` (`-exec-next`), so function-local variables in called functions are not captured.

### Java
- The code formatter handles most common patterns but may misparse complex generics, lambdas, or multi-line string literals.
- Maximum **2000 execution steps** — long loops are silently truncated.
- Requires a full **JDK** (not JRE) — the `jdk.jdi` module must be available.

### Python
- Only **module-level variables** are traced. Variables inside called functions are not captured.
- `set` and `tuple` are displayed as arrays (no distinct visualization).

### TypeScript
- **Destructuring** (`const { a, b } = obj`) is not instrumented.
- **Async/await** and generators are not supported.
- `i++` used as a value expression (e.g. `arr[i++]`) captures the pre-increment value.

### General
- Panel sizes (editor width, watch window width) are **not persisted** — they reset on page reload.
- The **Stack Trace** panel is only populated for Java and Python. TypeScript always shows an empty stack.
- **Condition highlighting** (green/red line) only works for TypeScript and Java.

---

## Suggested Improvements

### High Impact
1. **C/C++ pointer & array visualization** — parse GDB's `{1, 2, 3}` array output and `0x...` pointer values into proper store entries so they render in `ArrayVisualizer`
2. **Python function tracing** — extend the tracer to capture variables in called functions, not just the module level. Show a real call stack.
3. **Persist panel layout** — save editor/watch window sizes to `localStorage` so they survive page reload
4. **TypeScript destructuring** — add a `VariableDeclaration` handler in the instrumenter for destructuring patterns
5. **Async TypeScript support** — wrap the execution engine to handle `async/await` code

### Medium Impact
6. **Fix `HashMapVisualizer` theming** — replace hardcoded dark colors with CSS variables so it respects the theme system
7. **Step count limit UI** — show a warning when the 2000-step limit is hit instead of silently stopping
8. **C/C++ stdin forwarding** — pipe the IO panel's input to the GDB-debugged process so `scanf`/`cin` programs work
9. **Error boundary per visualizer** — wrap each individual visualizer card in its own `ErrorBoundary` so one broken visualizer doesn't crash the whole canvas
10. **TypeScript class field instrumentation** — handle `this.x = value` assignments in class bodies

### Nice to Have
11. **Breakpoints** — let users click a line number to set a breakpoint and jump directly to it
12. **Variable search in Heap Explorer** — filter variables by name when there are many
13. **Export execution trace** — download the full history as JSON or a shareable link
14. **Mobile layout** — the current layout is desktop-only; a simplified mobile view would help
15. **More languages** — Rust, Go, or JavaScript (non-TypeScript) support
16. **Remove dead code** — `Visualizer.tsx` (generic fallback, never rendered), `ConnectorProbe.java` (unused), stray `.class` files at project root
