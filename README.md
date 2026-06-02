# Code Visualizer

A web-based interactive debugger and code visualization tool. Write code in **TypeScript, Python, Java, C, or C++** and watch it execute step-by-step with animated visualizations of variables, arrays, matrices, trees, linked lists, hash maps, and hash sets.

🌐 **Live Demo**: [https://codevisualizor.onrender.com](https://codevisualizor.onrender.com)

> **Note (Free Tier):** The backend may take ~60 seconds to wake up after inactivity. The app pings the backend on load to minimize this delay.

---

## Features

### Multi-Language Execution
| Language | Method | Visualization |
|---|---|---|
| TypeScript | Client-side Babel AST | Full |
| Python | Server-side `sys.settrace` | Full |
| Java | Server-side JDI (Java Debug Interface) | Full |
| C | Server-side GDB MI tracer | Primitives only |
| C++ | Server-side GDB MI tracer | Primitives only |

### Visualizers
- **Primitive** — value with animated `+N`/`-N` diff on change
- **1D Array** — bar chart / box / stack views with pointer highlighting (index, value, search modes)
- **2D Matrix** — grid with row/column index labels, drag `i`/`j` to highlight cells
- **Linked List** — traverses `.next` pointers, SVG arrows, cycle detection
- **Binary Tree** — recursive layout, SVG Bezier edges, zoom/pan
- **HashMap** — glowing table with key-value rows, animated value changes
- **HashSet** — chip layout with glow border, highlights newly added elements

### Canvas
- Drag variables from Heap Explorer → canvas
- Drag to reposition, resize by corner handle, pinch on trackpad (`Ctrl+scroll`) to resize
- Arithmetic animations — values fly between boxes during assignments
- Print animations — text floats when stdout grows

### Timeline
- Step forward/backward, play/pause, 4 speed presets
- Step counter, description label, scrubber

### Projects & NeetCode 150
- Save/load with full canvas state
- Folder system with drag-and-drop
- Auto-seeded NeetCode 150 + Java Basics (~200 problems)
- Next/prev navigation within a folder (← → buttons in navbar)

### Authentication (Google OAuth)
- Sign in with Google via Spring Boot OAuth2
- JWT-based sessions stored in localStorage
- Admin role: create/edit/delete public programs
- User role: personal folders, fork public programs
- Guest mode: full visualization, localStorage persistence

### Themes
- Dark, Light, CodeNow (animated gradient)
- 4 accent colors: Blue, Purple, Green, Orange

---

## Architecture

```
Browser (React/Next.js)
    │
    ├─ /api/* proxy ──────────────► Spring Boot Backend (port 8080)
    │                                   ├─ /api/run-java    (JDI Tracer)
    │                                   ├─ /api/run-python  (sys.settrace)
    │                                   ├─ /api/run-c/cpp   (GDB MI)
    │                                   ├─ /api/auth/*      (Google OAuth2)
    │                                   ├─ /api/public/*    (public programs)
    │                                   └─ /api/user/*      (personal workspace)
    │                                             │
    │                                             └─ MongoDB Atlas
    │
    └─ TypeScript execution (client-side, Babel AST)
```

### How Execution Works

**TypeScript** — fully client-side via Babel AST instrumentation (no network call)

**Java** — Spring Boot:
1. Format code (normalize single-line to multi-line)
2. Inject `traceCondition()` for condition highlighting
3. Compile with `javac --release 17 -g`
4. Run `Tracer.java` via JDI — steps line-by-line, serializes variables
5. Returns `{ stdout, stderr, history[], lineOffset }`

**Python** — Spring Boot spawns `python3 lib/python/tracer.py` with `sys.settrace`

**C/C++** — Spring Boot compiles with `gcc/g++ -g -O0`, runs `lib/c/gdb_tracer.py` via GDB MI

---

## Project Structure

```
├── app/
│   ├── page.tsx                     # Main visualizer page
│   ├── auth/callback/page.tsx       # Handles JWT from Spring Boot OAuth redirect
│   └── api/
│       └── keepalive/route.ts       # Pings backend to prevent free-tier sleep
│
├── components/
│   ├── ArrayVisualizer.tsx          # 1D array (bar/box/stack) with pointer modes
│   ├── MatrixVisualizer.tsx         # 2D array grid
│   ├── TreeVisualizer.tsx           # Binary tree with zoom/pan
│   ├── LinkedListVisualizer.tsx     # SLL with cycle detection
│   ├── HashMapVisualizer.tsx        # Key-value table with glow border
│   ├── HashSetVisualizer.tsx        # Chip layout
│   ├── PrimitiveVisualizer.tsx      # Single variable with diff animation
│   ├── UnifiedVisualizer.tsx        # Canvas dispatcher
│   ├── ArithmeticAnimator.tsx       # Assignment/arithmetic flying animations
│   ├── PrintAnimator.tsx            # stdout floating text
│   ├── CodeEditor.tsx               # Monaco editor with line highlighting
│   ├── Timeline.tsx                 # Step controls
│   ├── IOPanel.tsx                  # stdin/stdout split panel
│   ├── WatchWindow.tsx              # Heap Explorer + Stack Trace
│   ├── Navbar.tsx                   # Top bar with auth button + prev/next nav
│   ├── AuthButton.tsx               # Google sign-in/out button
│   ├── ProjectManager.tsx           # Projects/folders CRUD + NeetCode 150
│   └── SettingsModal.tsx            # Theme/color picker
│
├── hooks/
│   ├── useExecution.ts              # Run code, handle history + cold start errors
│   ├── useAuth.ts                   # JWT auth state from localStorage
│   ├── useLayout.ts                 # Panel resize state
│   ├── usePersistence.ts            # Auto-save state to localStorage
│   └── useTheme.ts                  # Theme + accent color
│
├── lib/
│   ├── engine/
│   │   ├── instrumenter.ts          # Babel AST transformer (TypeScript)
│   │   ├── state-machine.ts         # ExecutionEngine (runs instrumented TS)
│   │   └── hydrateHistory.ts        # Backend { roots, store } → StateSnapshot[]
│   ├── java/
│   │   └── Tracer.java              # JDI step debugger for Java
│   ├── python/
│   │   └── tracer.py                # sys.settrace tracer for Python
│   └── c/
│       └── gdb_tracer.py            # GDB MI tracer for C/C++
│
├── backend/                         # Spring Boot backend
│   ├── src/main/java/com/codevisualizer/
│   │   ├── controller/              # REST endpoints
│   │   ├── service/                 # Execution services (Java/Python/C)
│   │   ├── model/                   # MongoDB documents (User/Folder/Program)
│   │   ├── repository/              # Spring Data MongoDB repos
│   │   ├── security/                # JWT filter, OAuth2 success handler
│   │   └── config/                  # Spring Security config, CORS
│   ├── src/main/resources/
│   │   └── application.properties
│   └── Dockerfile
│
├── types/Project.ts                 # TypeScript interfaces
├── next.config.ts                   # Proxy /api/* to Spring Boot
├── Dockerfile                       # Frontend container
└── render.yaml                      # Render deployment config
```

---

## Getting Started

### Prerequisites
- Node.js 20+
- Java 17 JDK
- Python 3
- GCC/G++ + GDB
- Maven 3.9+
- MongoDB Atlas account (or local MongoDB)

### Local Development

**1. Clone and install frontend:**
```bash
npm install
```

**2. Set up environment:**
```bash
# .env.local
MONGODB_URI=mongodb+srv://...
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
BACKEND_URL=http://localhost:8080
```

**3. Start Spring Boot backend:**
```bash
cd backend
mvn spring-boot:run
# Backend runs on http://localhost:8080
```

**4. Start Next.js frontend:**
```bash
npm run dev
# Frontend runs on http://localhost:3000
# All /api/* requests proxy to Spring Boot
```

### Production Build

**Frontend:**
```bash
npm run build && npm start
```

**Backend:**
```bash
cd backend && mvn clean package -DskipTests
java --add-modules jdk.jdi -jar target/codevisualizer-backend-1.0.0.jar
```

### Docker

```bash
# Build and run backend
docker build -f backend/Dockerfile -t codevisualizer-api .
docker run -p 8080:8080 -e MONGODB_URI=... codevisualizer-api

# Build and run frontend
docker build -t codevisualizer .
docker run -p 3000:3000 codevisualizer
```

---

## Environment Variables

### Frontend (`next.config.ts`)
| Variable | Description | Default |
|---|---|---|
| `BACKEND_URL` | Spring Boot backend URL | `https://codevisualizor-api-v2.onrender.com` |

### Backend (`application.properties`)
| Variable | Description |
|---|---|
| `MONGODB_URI` | MongoDB Atlas connection string |
| `MONGODB_DATABASE` | Database name (default: `codevisualizer`) |
| `JWT_SECRET` | 32+ char secret for JWT signing |
| `GOOGLE_CLIENT_ID` | Google OAuth2 client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth2 client secret |
| `FRONTEND_URL` | Frontend URL for CORS (default: `http://localhost:3000`) |
| `BACKEND_URL` | Backend URL for OAuth redirect (default: `http://localhost:8080`) |

---

## API Reference

### Execution (no auth required)
```
POST /api/run-java      { code, input } → { stdout, stderr, history[], lineOffset }
POST /api/run-python    { code, input } → { stdout, history[] }
POST /api/run-c         { code, input } → { stdout, history[] }
POST /api/run-cpp       { code, input } → { stdout, history[] }
```

### Public Programs (read: anyone, write: admin only)
```
GET    /api/public/folders
GET    /api/public/folders/{id}/programs
GET    /api/public/programs/{id}
POST   /api/public/folders/{id}/programs   [ADMIN]
PUT    /api/public/programs/{id}           [ADMIN]
DELETE /api/public/programs/{id}           [ADMIN]
```

### Personal Workspace (authenticated users)
```
GET    /api/user/folders
POST   /api/user/folders
PUT    /api/user/folders/{id}
DELETE /api/user/folders/{id}
GET    /api/user/programs?folderId=
POST   /api/user/programs
PUT    /api/user/programs/{id}
DELETE /api/user/programs/{id}
POST   /api/user/programs/fork    { programId, code, folderId }
POST   /api/user/migrate          { projects[], folders[] }
```

### Auth
```
GET  /api/auth/me                → { id, name, email, avatar, role } | null
POST /api/auth/signout
GET  /oauth2/authorization/google → redirects to Google
GET  /api/auth/callback/google    → handled by Spring Security
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend Framework | Next.js 16 (App Router) |
| UI | React 19, Tailwind CSS v4 |
| Animations | Framer Motion |
| Code Editor | Monaco Editor |
| TS Instrumentation | Babel (parser + traverse + generator) |
| Backend | Spring Boot 3.2 |
| Security | Spring Security + OAuth2 + JWT (JJWT) |
| Database | MongoDB Atlas + Spring Data MongoDB |
| Java Debugging | JDI (`jdk.jdi` module, Java 17) |
| Python Tracing | `sys.settrace` |
| C/C++ Tracing | GDB Machine Interface |
| Deployment | Render (Docker, free tier) |

---

## Known Limitations

### Free Tier Cold Starts
The Render free tier sleeps after 15 minutes of inactivity. First request takes ~60 seconds. The app pre-warms the backend on page load to minimize this.

### C / C++
- Only primitive scalars visualized (pointers/arrays show as raw strings)
- `scanf`/`cin` programs may hang (stdin not forwarded to GDB)

### Java
- Max 2000 execution steps (silently truncated)
- Complex generics/lambdas may not format correctly

### Python
- Only module-level variables traced (not inside function calls)

### TypeScript
- No destructuring instrumentation
- No async/await support
