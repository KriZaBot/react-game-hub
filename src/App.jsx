import React, { useState, useContext } from 'react';
import { GAME_LOGIC } from './gameRegistry';
import { GAME_COMPONENTS } from './componentRegistry';
import { GameContext } from './GameContext';
import GameOverModal from './components/shared/GameOverModal';
import './styles/App.css';
import './styles/Mastermind.css';
import './styles/MemoryGame.css';

function App() {
  const { state, dispatch } = useContext(GameContext);
  const [activeId, setActiveId] = useState(Object.keys(GAME_LOGIC)[0]);
  const ActiveGame = GAME_COMPONENTS[activeId];
  
  const gameTitle = GAME_LOGIC[activeId]?.title || "Игра";
  const activeGameState = state[activeId];

  const handleRestart = () => {
    dispatch({ type: 'START_GAME' });
  };

  return (
    <div className="app-layout">
      <aside className="game-sidebar">
        <h2 className="sidebar-title">Игри</h2>
        <nav className="nav-list">
          {Object.entries(GAME_LOGIC).map(([id, config]) => (
            <button 
              key={id} 
              className={`nav-btn ${activeId === id ? 'active' : ''}`} 
              onClick={() => setActiveId(id)}
            >
              {config.title}
            </button>
          ))}
        </nav>
      </aside>

      <main className="game-display-area">
        <div className="game-header">
          <div className="header-top">
            <h1 className="main-game-title">{gameTitle}</h1>
            <button className="universal-start-btn" onClick={handleRestart}>
              Нова Игра
            </button>
          </div>

          <div className="live-score">
            <span>Moves: <strong>{activeGameState?.moves ?? 0}</strong></span>
            <span>Best: <strong>{activeGameState?.bestScore || '--'}</strong></span>
          </div>
        </div>

        {ActiveGame ? <ActiveGame /> : <div>Изберете игра</div>}
      </main>

      <GameOverModal 
        isOpen={activeGameState?.isGameOver}
        title={`${gameTitle} Завршена!`}
        score={`${activeGameState?.moves} потези`}
        bestScore={activeGameState?.bestScore}
        onRestart={handleRestart}
      />
    </div>
  );
}

export default App;