import  { useContext } from 'react';
import { GameContext } from '../../GameContext';
import { GAME_LOGIC } from '../../gameRegistry';

interface Card {
  id: number;
  icon: string;
}

interface MemoryState {
  cards: Card[];
  flipped: number[];
  matched: string[];
  isGameOver: boolean;
  moves: number;
  bestScore: number | string | null;
}

function MemoryGame() {
  const context = useContext(GameContext);
  
  if (!context) return null;
  const { state, dispatch } = context;

  const memoryState = (state.memory as MemoryState) || (GAME_LOGIC.memory.initialState as MemoryState);
  const { cards, flipped, matched } = memoryState;

  const handleCardClick = (index: number): void => {
    if (flipped.length === 2 || flipped.includes(index) || matched.includes(cards[index].icon)) return;

    dispatch({ type: 'FLIP_CARD', payload: index, gameId: 'memory' });

    const newFlipped = [...flipped, index];
    if (newFlipped.length === 2) {
      const firstCard = cards[newFlipped[0]];
      const secondCard = cards[newFlipped[1]];

      if (firstCard.icon === secondCard.icon) {
        setTimeout(() => {
          dispatch({ type: 'SET_MATCHED', payload: firstCard.icon, gameId: 'memory' });
        }, 600);
      } else {
        setTimeout(() => {
          dispatch({ type: 'RESET_FLIPPED', gameId: 'memory' });
        }, 1300);
      }
    }
  };

  return (
    <div className="game-container">
      <div className="grid-container">
        {cards.map((card, index) => {
          const isFlipped = flipped.includes(index);
          const isMatched = matched.includes(card.icon);
          const isCollecting = flipped.length === 2 && 
                               cards[flipped[0]].icon === cards[flipped[1]].icon && 
                               flipped.includes(index);

          return (
            <div
              key={index}
              className={`card ${isMatched ? 'matched' : ''} ${isCollecting ? 'collecting' : ''}`}
              onClick={() => handleCardClick(index)}
            >
              <div className={`card-inner ${isFlipped || isMatched ? 'is-flipped' : ''}`}>
                <div className="card-front">?</div>
                <div className="card-back">{card.icon}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="collection-area">
        {matched.map((icon, idx) => (
          <div key={idx} className="matched-pair-stack">
            <div className="collected-card bottom"></div>
            <div className="collected-card top">{icon}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MemoryGame;