# Multi-Game React Architecture

This project is a demonstration of a scalable **React architecture**, focusing on advanced state management and modular system design rather than just simple game logic.

## 🚀 Architectural Approach

The primary goal of this project was to implement a **Scalable Frontend System** where adding new features or games requires zero changes to the core application logic.

### 1. Centralized State Management
- Utilizes the **Context API** combined with **useReducer** to manage a complex, global state.
- Each game module has its own isolated **Reducer** (`memoryReducer.jsx`, `mastermindReducer.jsx`), keeping the business logic clean and decoupled from the UI layer.
- The global `GameContext` orchestrates these reducers, ensuring data consistency across the entire application.

### 2. Registry Pattern (Dynamic Component Loading)
- Implemented a **Registry Pattern** using `gameRegistry.js` for metadata and `componentRegistry.js` for component mapping.
- The `App.jsx` acts as a pure orchestrator (decoupled); it does not have hardcoded references to specific games, allowing it to render any game dynamically based on the active ID.

### 3. Reusable Logic & Agnostic UI
- **GameOverModal**: A fully agnostic UI component that handles game-over states for any module within the system.
- **Unified Score Engine**: A dynamic header in `App.js` that reads `moves` and `bestScore` from the active state regardless of which game is currently mounted.



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

## 🛠️ Technical Stack
* **React 18** (Functional Components & Hooks)
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