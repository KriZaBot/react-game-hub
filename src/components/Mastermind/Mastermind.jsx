import React, { useEffect, useContext } from 'react';
import { GameContext } from '../../GameContext'; 

const Mastermind = () => {
  const { state, dispatch } = useContext(GameContext);
  const { secretCode, currentGuess, focusedIndex, attempts, gameOver } = state.mastermind;

  // Иницијализација само ако играта не е започната
  useEffect(() => {
    if (!secretCode) {
      dispatch({ type: 'START_GAME' });
    }
  }, [secretCode, dispatch]);

  // Логика за проверка (истата твоја логика, препакувана за dispatch)
  const getFeedback = (secret, guess) => {
    let feedback = [];
    let sArr = secret.split("");
    let gArr = [...guess];
    for (let i = 0; i < 4; i++) {
      if (gArr[i] === sArr[i]) { feedback.push("✅"); sArr[i] = null; gArr[i] = "done"; }
    }
    for (let i = 0; i < 4; i++) {
      if (gArr[i] !== "done" && sArr.includes(gArr[i])) { feedback.push("❌"); sArr[sArr.indexOf(gArr[i])] = null; }
    }
    return feedback.join("");
  };

  const submitGuess = () => {
    const guessStr = currentGuess.join("");
    if (guessStr.length !== 4 || !secretCode) return;
    
    const res = getFeedback(secretCode, guessStr);
    const newAttempt = { guess: guessStr, result: res };
    
    let isWin = res === "✅✅✅✅";
    let isLoss = (attempts.length + 1) >= 10;

    dispatch({ 
      type: 'SUBMIT_ATTEMPT', 
      payload: { attempt: newAttempt, gameOver: isWin || isLoss } 
    });

    if (isWin) alert("ПОБЕДА!");
    else if (isLoss) alert("КРАЈ! Бројот беше: " + secretCode);
  };

  const handleKeypadClick = (n) => {
    if (gameOver) return;
    const newGuess = [...currentGuess];
    newGuess[focusedIndex] = n.toString();
    
    dispatch({ 
      type: 'SET_GUESS', 
      payload: { 
        guess: newGuess, 
        nextIndex: focusedIndex < 3 ? focusedIndex + 1 : focusedIndex 
      } 
    });
  };

  return (
    <div className="master-wrapper">
   
     
      
      <div className="main-layout">
        <div className="history-panel">
          <h3>Историја</h3>
          {attempts.map((att, i) => (
            <div key={i} className="attempt-card">
              <span className="att-num">{attempts.length - i}.</span>
              <div className="mini-slots">
                {att.guess.split("").map((n, j) => <div key={j} className="mini-slot">{n}</div>)}
              </div>
              <div className="att-result-tag">{att.result}</div>
            </div>
          ))}
        </div>

        <div className="input-panel">
          <div className="slots">
            {[0, 1, 2, 3].map(i => (
              <div 
                key={i} 
                className={`slot ${focusedIndex === i ? 'current-focus' : ''} ${currentGuess[i] ? 'has-value' : ''}`}
                onClick={() => dispatch({ type: 'SET_FOCUS', payload: i })}
              >
                {currentGuess[i]}
              </div>
            ))}
          </div>
          <button className="ok-btn" onClick={submitGuess} disabled={currentGuess.includes("") || gameOver}>ПРОВЕРИ</button>
          
          <div className="keypad">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map(n => (
              <button key={n} onClick={() => handleKeypadClick(n)}>{n}</button>
            ))}
            <button className="clear-btn" onClick={() => dispatch({ type: 'CLEAR_GUESS' })}>C</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mastermind;