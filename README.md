# Code Visualizer — Professional Architecture

A high-performance interactive code execution visualizer for TypeScript, Python, Java, C, and C++.

## 📂 Project Structure

This project follows a clean **client-server** architecture:

```
.
├── client/              # Next.js Frontend (React, Tailwind, Framer Motion)
│   ├── app/             # Application routes & pages
│   ├── components/      # UI components (ProjectManager, Visualizer, etc.)
│   ├── hooks/           # Custom hooks (Auth, Execution)
│   ├── lib/             # Utility libraries and static data
│   └── public/          # Static assets
└── server/              # Spring Boot Backend (Java, MongoDB)
    ├── src/             # Java source code
    ├── lib/             # Language execution tracers (Java, Python, C)
    └── pom.xml          # Maven dependencies
```

## 🔐 Role-Based Access Control (RBAC)

The system identifies users through Google OAuth2 and secures all sessions with JWT (JSON Web Tokens).

### 1. **Guest** (Anonymous)
- **Scope**: Local access for quick experimentation.
- **Data**: Stored in browser `localStorage`.
- **Visibility**: Can see global public problems from NeetCode 150.

### 2. **User** (Authenticated)
- **Scope**: Personal cloud storage.
- **Data**: Synced to MongoDB, isolated by `userId`.
- **Features**: Save programs, create custom folders, and fork public problems.

### 3. **Admin** (Privileged)
- **Scope**: Global platform management.
- **Permissions**:
  - Create and manage **Global Public Collections**.
  - Moderate user data via the **Admin Dashboard**.
  - Update system tracers and defaults.

## 🚀 Getting Started

### **Environment Setup**
1. Ensure you have **Node.js 20+**, **Java 17**, and **Maven** installed.
2. A running **MongoDB** instance (Atlas or local).
3. Google OAuth2 Client ID/Secret.

### **Running Locally**

#### **1. Start the Backend**
```bash
cd server
mvn spring-boot:run
```
*Runs on `http://localhost:8085`*

#### **2. Start the Frontend**
```bash
cd client
npm install
npm run dev
```
*Runs on `http://localhost:3000`*

## 🛠️ Technology Stack
- **Frontend**: Next.js 15, TypeScript, Tailwind CSS, Lucide Icons, Framer Motion.
- **Backend**: Spring Boot, Spring Security (JWT + OAuth2), MongoDB.
- **Execution**: Custom tracers for multi-language visualization.

---
© 2026 Code Visualizer Team
