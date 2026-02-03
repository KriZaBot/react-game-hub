const generateSecretCode = () => {
  let code = "";
  for (let i = 0; i < 4; i++) {
    code += Math.floor(Math.random() * 10).toString();
  }
  return code;
};

export const mastermindInitialState = {
  secretCode: generateSecretCode(),
  currentGuess: ["", "", "", ""],
  focusedIndex: 0,
  attempts: [],
  moves: 0,
  bestScore: localStorage.getItem('mastermindBestScore') || null,
  isGameOver: false,
};

export function mastermindReducer(state, action) {
  switch (action.type) {
    case 'START_GAME':
      return {
        ...mastermindInitialState,
        secretCode: generateSecretCode(),
        bestScore: localStorage.getItem('mastermindBestScore') || null,
      };

    case 'SET_GUESS':
      return {
        ...state,
        currentGuess: action.payload.guess,
        focusedIndex: action.payload.nextIndex,
      };

    case 'SET_FOCUS':
      return {
        ...state,
        focusedIndex: action.payload
      };

    case 'SUBMIT_ATTEMPT':
      const newMoves = state.moves + 1;
      const won = action.payload.gameOver;
      let newBest = state.bestScore;

      if (won) {
        if (!state.bestScore || newMoves < state.bestScore) {
          newBest = newMoves;
          localStorage.setItem('mastermindBestScore', newBest);
        }
      }

      return {
        ...state,
        attempts: [action.payload.attempt, ...state.attempts],
        currentGuess: ["", "", "", ""],
        focusedIndex: 0,
        moves: newMoves,
        isGameOver: won,
        bestScore: newBest
      };

    case 'CLEAR_GUESS':
      return {
        ...state,
        currentGuess: ["", "", "", ""],
        focusedIndex: 0
      };

    default:
      return state;
  }
}