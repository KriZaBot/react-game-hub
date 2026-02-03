const baseIcons = ['🍎', '🍌', '🍇', '🍓', '🍒', '🥑', '🥦', '🥕', '🌽', '🍉'];

const generateInitialCards = () => {
  return [...baseIcons, ...baseIcons]
    .sort(() => Math.random() - 0.5)
    .map((icon, index) => ({ id: index, icon }));
};

export const memoryInitialState = {
  cards: generateInitialCards(),
  flipped: [],
  matched: [],
  moves: 0,
  bestScore: localStorage.getItem('memoryBestScore') || null,
  isGameOver: false
};

export function memoryReducer(state, action) {
  switch (action.type) {
    case 'START_GAME':
      return {
        ...state,
        cards: generateInitialCards(),
        matched: [],
        flipped: [],
        moves: 0,
        isGameOver: false
      };

    case 'FLIP_CARD':
      const isSecondCard = state.flipped.length === 1;
      return {
        ...state,
        flipped: [...state.flipped, action.payload],
        moves: isSecondCard ? state.moves + 1 : state.moves
      };

    case 'RESET_FLIPPED':
      return {
        ...state,
        flipped: []
      };

    case 'SET_MATCHED':
      const newMatched = [...state.matched, action.payload];
      const isWin = newMatched.length === baseIcons.length;
      let newBest = state.bestScore;

      if (isWin) {
        if (!state.bestScore || state.moves < state.bestScore) {
          newBest = state.moves;
          localStorage.setItem('memoryBestScore', newBest);
        }
      }

      return {
        ...state,
        matched: newMatched,
        flipped: [],
        isGameOver: isWin,
        bestScore: newBest
      };

    default:
      return state;
  }
}