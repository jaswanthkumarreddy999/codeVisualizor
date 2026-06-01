# Multi-User System Design

## Tech Stack Additions

| Layer | Technology | Reason |
|---|---|---|
| Auth | NextAuth.js v5 | Built for Next.js App Router, Google OAuth, JWT |
| Database | MongoDB Atlas | Flexible schema, free tier, cloud-hosted |
| ODM | Mongoose | Schema validation, TypeScript support |
| API | Next.js Route Handlers | Already using App Router |

---

## MongoDB Schema

### Collection: `programs`
```typescript
{
  _id: ObjectId,
  title: string,
  code: string,
  language: 'typescript' | 'python' | 'java' | 'c' | 'cpp',
  folderId: string | null,       // references folders._id
  isPublic: boolean,             // true = admin-managed public program
  ownerId: string | null,        // null for public, userId for personal
  visualizedVariables: string[],
  ignoredPointers: Record<string, string[]>,
  visualizerPositions: Record<string, {x: number, y: number}>,
  order: number,                 // for sorting within folder
  createdAt: Date,
  updatedAt: Date
}
```

### Collection: `folders`
```typescript
{
  _id: ObjectId,
  name: string,
  icon: string,
  color: string,
  description: string,
  isPublic: boolean,
  ownerId: string | null,        // null for public folders
  order: number,
  createdAt: Date
}
```

### Collection: `users`
```typescript
{
  _id: ObjectId,
  googleId: string,              // from Google OAuth
  email: string,
  name: string,
  avatar: string,
  role: 'admin' | 'user',       // default 'user', set manually for admin
  createdAt: Date,
  lastLoginAt: Date
}
```

---

## API Routes

### Auth
```
GET/POST  /api/auth/[...nextauth]   — NextAuth handler (Google OAuth)
GET       /api/auth/me              — current user info + role
```

### Public Programs (read: all, write: admin only)
```
GET    /api/public/folders          — list all public folders
GET    /api/public/folders/[id]/programs  — programs in a public folder
GET    /api/public/programs/[id]    — single public program
POST   /api/public/programs         — create (admin only)
PUT    /api/public/programs/[id]    — update (admin only)
DELETE /api/public/programs/[id]    — delete (admin only)
```

### Personal Programs (authenticated users only)
```
GET    /api/user/folders            — user's folders
POST   /api/user/folders            — create folder
PUT    /api/user/folders/[id]       — rename/update folder
DELETE /api/user/folders/[id]       — delete folder

GET    /api/user/programs           — user's programs (optionally ?folderId=)
POST   /api/user/programs           — create program
PUT    /api/user/programs/[id]      — update program
DELETE /api/user/programs/[id]      — delete program
POST   /api/user/programs/fork      — fork a public program to personal
```

### Migration
```
POST   /api/user/migrate            — migrate localStorage data to cloud
```

---

## Frontend Architecture Changes

### New files
```
lib/
  mongodb.ts              — MongoDB connection singleton
  models/
    User.ts               — Mongoose User model
    Program.ts            — Mongoose Program model
    Folder.ts             — Mongoose Folder model

app/
  api/
    auth/[...nextauth]/route.ts   — NextAuth handler
    auth/me/route.ts
    public/folders/route.ts
    public/folders/[id]/programs/route.ts
    public/programs/[id]/route.ts
    user/folders/route.ts
    user/folders/[id]/route.ts
    user/programs/route.ts
    user/programs/[id]/route.ts
    user/programs/fork/route.ts
    user/migrate/route.ts

hooks/
  useAuth.ts              — current user, sign in/out
  usePrograms.ts          — fetch/mutate programs (cloud or localStorage)

components/
  AuthButton.tsx          — sign in/out button for Navbar
  ForkBanner.tsx          — "code changed, fork to save?" banner
```

### Modified files
```
components/Navbar.tsx     — add AuthButton
components/ProjectManager.tsx  — switch between localStorage and cloud API
hooks/usePersistence.ts   — skip localStorage when signed in
app/page.tsx              — add ForkBanner, pass auth state
```

---

## Data Flow

### Guest user
```
page.tsx → usePersistence → localStorage
ProjectManager → reads/writes localStorage
```

### Authenticated user
```
page.tsx → usePersistence → SKIP (cloud is source of truth)
ProjectManager → reads/writes /api/user/* endpoints
Public programs → reads /api/public/* endpoints
```

### Public program editing (any user)
```
User opens public program → code loaded into editor
User edits code → ForkBanner appears ("Save as your own?")
Guest clicks fork → "Sign in to save"
Auth user clicks fork → POST /api/user/programs/fork → saved to personal
```

---

## Environment Variables Needed
```env
# MongoDB Atlas
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/codevisualizer

# NextAuth
NEXTAUTH_URL=https://codevisualizor.onrender.com
NEXTAUTH_SECRET=<random-32-char-string>

# Google OAuth (from Google Cloud Console)
GOOGLE_CLIENT_ID=xxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=xxx
```

---

## Migration Strategy

### NeetCode 150 seed
- One-time script: `scripts/seed-mongodb.ts`
- Reads from `lib/neetcode150.ts`
- Inserts into `programs` and `folders` collections with `isPublic: true, ownerId: null`
- Run once on first deploy via `npm run seed`

### localStorage → cloud migration
- On first sign-in, check if localStorage has projects
- Show modal: "You have N saved projects. Import to cloud?"
- POST /api/user/migrate with the localStorage data
- On success: clear localStorage, use cloud going forward

---

## Security

- All `/api/user/*` routes check `session.user.id` — users can only access their own data
- All `/api/public/*` write routes check `session.user.role === 'admin'`
- MongoDB queries always include `ownerId: session.user.id` filter for personal data
- No user can set their own `role` field via API
