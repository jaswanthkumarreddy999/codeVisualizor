# Multi-User System Requirements

## Overview
Add authentication, role-based access control, and cloud persistence to Code Visualizer using MongoDB Atlas and NextAuth.js, while fully retaining the existing visualization engine, Java/Python/C tracers, and localStorage-based guest experience.

---

## User Roles

### Guest (unauthenticated)
- Can use the full visualizer with localStorage persistence
- Can view and run all public programs
- Can temporarily edit public program code in-browser (changes are NOT saved)
- Cannot save programs to the cloud
- Prompted to sign in when trying to save

### User (authenticated, Google OAuth)
- Everything a Guest can do
- Can create personal folders and programs (saved to MongoDB)
- Can temporarily edit public programs (fork prompt offered)
- Can fork a public program into their personal workspace
- Cannot edit or delete public programs

### Admin
- Everything a User can do
- Can create, edit, delete public programs and folders
- Can manage the NeetCode 150 and Java Basics collections
- Admin status set manually in MongoDB (no self-registration as admin)

---

## Functional Requirements

### FR-1: Authentication
- Sign in with Google OAuth via NextAuth.js
- Session persisted via JWT (no database sessions needed)
- Sign out clears session, reverts to guest mode
- User profile: name, email, avatar from Google

### FR-2: Public Programs (Admin-managed)
- Public programs visible to all users (guest, user, admin)
- Only admins can create/edit/delete public programs
- Public programs stored in MongoDB `programs` collection with `isPublic: true`
- NeetCode 150 + Java Basics migrated from `neetcode150.ts` to MongoDB on first deploy

### FR-3: Personal Workspace (Authenticated Users)
- Each user has their own programs and folders in MongoDB
- Personal programs only visible to the owner
- Full CRUD: create, rename, overwrite, duplicate, delete
- Folder system: create, rename, delete personal folders
- Programs store: code, language, visualizerPositions, ignoredPointers, folderId

### FR-4: Temporary Editing of Public Programs
- Any user (including guest) can edit a public program's code in the editor
- Changes are local only — NOT saved back to the public program
- A "fork" button appears when the code differs from the original
- Authenticated users can fork → saves a copy to their personal workspace
- Guest users see "Sign in to save your changes"

### FR-5: Data Migration
- Existing localStorage projects preserved when user signs in
- On first sign-in: offer to migrate localStorage projects to cloud
- After migration: localStorage cleared, cloud becomes source of truth
- Guest users continue using localStorage with no disruption

### FR-6: Next/Prev Navigation (already implemented)
- Navigate through programs in the same folder with ← → buttons
- Works for both public and personal programs

---

## Non-Functional Requirements

- **Zero disruption**: existing guest/localStorage flow unchanged
- **Performance**: public programs cached, personal programs fetched on demand
- **Security**: users can only access their own personal programs via API
- **Offline**: if MongoDB unreachable, fall back to localStorage gracefully

---

## Out of Scope (v1)
- Sharing personal programs publicly
- Collaborative editing
- Comments or ratings on programs
- Email/password authentication (Google only for simplicity)
