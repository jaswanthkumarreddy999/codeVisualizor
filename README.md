# Code Visualizer

Code Visualizer is a powerful, web-based educational and debugging tool that allows developers to write code in multiple languages and watch its execution step-by-step. By providing an interactive UI with timeline controls, variable watch windows, and unified memory visualizers, it helps users to deeply understand code flow, stack traces, and heap allocations.

## Key Features

- **Multi-Language Support**: Write and visualize code in TypeScript, Python, Java, C, and C++.
- **Interactive Timeline**: Step forward and backward through the code execution history to see exactly how states change line-by-line.
- **Unified Visualizer**: A dynamic visualization of memory, displaying primitive variables, complex objects, arrays, and standard output. 
- **Watch Window**: Inspect the call stack and track variable values scoped to specific execution frames.
- **Customizable UI**: Drag & drop variables, resize editor panels, and toggle between Light, Dark, and custom themes.

## Tech Stack

**Frontend**
- **Framework**: [Next.js](https://nextjs.org/)
- **UI & Styling**: [React](https://react.dev/), [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Editor**: [Monaco Editor](https://microsoft.github.io/monaco-editor/) (`@monaco-editor/react`)
- **Icons**: [Lucide React](https://lucide.dev/)

**Code Analysis & Execution Base**
- **TypeScript**: Client-side AST instrumentation utilizing Babel (`@babel/parser`, `@babel/traverse`, `@babel/generator`).
- **Python / Java / C / C++**: Backend API-driven execution tracing that evaluates code outputs and visualizes data structures.

## Getting Started

First, install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Development

The main layout and logic can be found in `app/page.tsx` and the core visualization components are located in the `components/` directory.

To learn more about Next.js, take a look at the following resources:
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
