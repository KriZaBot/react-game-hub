import React, { useEffect, useContext } from 'react';
import { GameContext } from '../../GameContext';

function MemoryGame() {
  const { state, dispatch } = useContext(GameContext);
  const { cards, flipped, matched } = state.memory;

  useEffect(() => {
    if (cards.length === 0) {
      dispatch({ type: 'START_GAME' });
    }
  }, [cards.length, dispatch]);

  const handleCardClick = (index) => {
    if (flipped.length === 2 || flipped.includes(index) || matched.includes(cards[index].icon)) return;

    const newFlipped = [...flipped, index];
    dispatch({ type: 'FLIP_CARD', payload: index });

    if (newFlipped.length === 2) {
      const firstCard = cards[newFlipped[0]];
      const secondCard = cards[newFlipped[1]];

      if (firstCard.icon === secondCard.icon) {
        setTimeout(() => {
          dispatch({ type: 'SET_MATCHED', payload: firstCard.icon });
        }, 600);
      } else {
        setTimeout(() => {
          dispatch({ type: 'RESET_FLIPPED' });
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