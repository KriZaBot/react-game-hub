import React from 'react';
import './GameOverModal.css';

function GameOverModal({ isOpen, title, score, bestScore, onRestart }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{title}</h2>
        <div className="stats">
          <p>Result: <strong>{score}</strong></p>
          <p>Best: <strong>{bestScore || 'N/A'}</strong></p>
        </div>
        <button className="restart-btn" onClick={onRestart}>Play Again</button>
      </div>
    </div>
  );
}

export default GameOverModal;