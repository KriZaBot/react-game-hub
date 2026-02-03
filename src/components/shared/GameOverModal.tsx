
import './GameOverModal.css';

interface GameOverModalProps {
  isOpen: boolean;
  title: string;
  score: string | number;
  bestScore: string | number | null;
  onRestart: () => void;
}

function GameOverModal({ isOpen, title, score, bestScore, onRestart }: GameOverModalProps) {
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