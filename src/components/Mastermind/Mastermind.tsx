import  { useEffect, useContext } from 'react';
import { GameContext } from '../../GameContext'; 
import { GAME_LOGIC } from '../../gameRegistry';

interface Attempt {
  guess: string;
  result: string;
}

interface MastermindState {
  secretCode: string;
  currentGuess: string[];
  focusedIndex: number;
  attempts: Attempt[];
  isGameOver: boolean;
  moves: number;
  bestScore: number | string;
}

const Mastermind = () => {
  const context = useContext(GameContext);
  
  if (!context) return null;
  const { state, dispatch } = context;

  const mastermindState = (state.mastermind as MastermindState) || (GAME_LOGIC.mastermind.initialState as MastermindState);
  const { secretCode, currentGuess, focusedIndex, attempts, isGameOver } = mastermindState;

  useEffect(() => {
    if (!secretCode) {
      dispatch({ type: 'START_GAME', gameId: 'mastermind' });
    }
  }, [secretCode, dispatch]);

  const getFeedback = (secret: string, guess: string): string => {
    let feedback: string[] = [];
    let sArr: (string | null)[] = secret.split("");
    let gArr: string[] = [...guess];

    for (let i = 0; i < 4; i++) {
      if (gArr[i] === sArr[i]) {
        feedback.push("✅");
        sArr[i] = null;
        gArr[i] = "done";
      }
    }

    for (let i = 0; i < 4; i++) {
      if (gArr[i] !== "done" && sArr.includes(gArr[i])) {
        feedback.push("❌");
        sArr[sArr.indexOf(gArr[i])] = null;
      }
    }
    return feedback.join("");
  };

  const submitGuess = (): void => {
    const guessStr = currentGuess.join("");
    if (guessStr.length !== 4 || !secretCode) return;
    
    const res = getFeedback(secretCode, guessStr);
    const newAttempt: Attempt = { guess: guessStr, result: res };
    
    let isWin = res === "✅✅✅✅";
    let isLoss = (attempts.length + 1) >= 10;

    dispatch({ 
      type: 'SUBMIT_ATTEMPT', 
      gameId: 'mastermind',
      payload: { attempt: newAttempt, gameOver: isWin || isLoss } 
    });

    if (isWin) alert("ПОБЕДА!");
    else if (isLoss) alert("КРАЈ! Бројот беше: " + secretCode);
  };

  const handleKeypadClick = (n: number): void => {
    if (isGameOver) return;
    const newGuess = [...currentGuess];
    newGuess[focusedIndex] = n.toString();
    
    dispatch({ 
      type: 'SET_GUESS', 
      gameId: 'mastermind',
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
          {[...attempts].reverse().map((att, i) => (
            <div key={i} className="attempt-card">
              <span className="att-num">{attempts.length - i}.</span>
              <div className="mini-slots">
                {att.guess.split("").map((num, j) => <div key={j} className="mini-slot">{num}</div>)}
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
                onClick={() => dispatch({ type: 'SET_FOCUS', payload: i, gameId: 'mastermind' })}
              >
                {currentGuess[i]}
              </div>
            ))}
          </div>
          <button className="ok-btn" onClick={submitGuess} disabled={currentGuess.includes("") || isGameOver}>ПРОВЕРИ</button>
          
          <div className="keypad">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map(n => (
              <button key={n} onClick={() => handleKeypadClick(n)}>{n}</button>
            ))}
            <button className="clear-btn" onClick={() => dispatch({ type: 'CLEAR_GUESS', gameId: 'mastermind' })}>C</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mastermind;