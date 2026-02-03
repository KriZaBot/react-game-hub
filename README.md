# Multi-Game React & TypeScript Architecture

This project is a demonstration of a scalable **React & TypeScript architecture**, focusing on strict type safety, advanced state management, and modular system design.

## 🚀 Architectural Approach

The primary goal of this project was to implement a **Scalable Frontend System** where adding new features or games requires zero changes to the core application logic.

### 1. Type-Safe State Management
- Utilizes the **Context API** with **useReducer** and **TypeScript Interfaces**.
- Each game module has an isolated **Typed Reducer** (`memoryReducer.ts`, `mastermindReducer.ts`), ensuring strict type checking for actions and state transitions.
- The global `GameContext` orchestrates these reducers with a unified `GameState` interface.

### 2. Registry Pattern (Dynamic Component Loading)
- Implemented a **Registry Pattern** using `gameRegistry.ts` for metadata and `componentRegistry.ts` for component mapping.
- Uses TypeScript's `keyof typeof` to ensure the orchestrator only attempts to render valid, registered game components.

### 3. Reusable Logic & Agnostic UI
- **GameOverModal**: A fully typed, agnostic UI component that handles game-over states for any module.
- **Unified Score Engine**: A dynamic header in `App.tsx` that reads `moves` and `bestScore` from the active state, leveraging TypeScript for safe property access.

## 🛠️ Technical Stack
* **React 19**
* **TypeScript 5**
* **Vite** (Optimized Build Tool)
* **State Hooks**: `useReducer`, `useContext`, `useState`, `useEffect`
* **Persistence**: `localStorage API` for persistent High Scores
* **CSS3**: Native CSS focusing on Flexbox and Grid layouts

## 💻 Local Setup
1. **Clone the repository.**
2. **Install dependencies:**
   ```bash
   npm install
   npm run dev


## 📂 Project Structure

```text
src/
├── components/
│   ├── Mastermind/         # View layer for Mastermind
│   ├── MemoryGame/         # View layer for Memory Game
│   └── shared/             # Agnostic UI components (Modals, etc.)
├── styles/                 # Modular CSS architecture
├── App.jsx                 # Main Application Orchestrator
├── GameContext.jsx         # Global State Store & Context Provider
├── gameRegistry.jsx        # Initial states and game configurations
└── componentRegistry.jsx   # Mapping of IDs to React Components

