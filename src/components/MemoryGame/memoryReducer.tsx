interface Card {
  id: number;
  icon: string;
}

interface MemoryState {
  cards: Card[];
  flipped: number[];
  matched: string[];
  moves: number;
  bestScore: any;
  isGameOver: boolean;
}

type MemoryAction =
  | { type: 'START_GAME' }
  | { type: 'FLIP_CARD'; payload: number }
  | { type: 'RESET_FLIPPED' }
  | { type: 'SET_MATCHED'; payload: string };

const baseIcons: string[] = ['🍎', '🍌', '🍇', '🍓', '🍒', '🥑', '🥦', '🥕', '🌽', '🍉'];

const generateInitialCards = (): Card[] => {
  return [...baseIcons, ...baseIcons]
    .sort(() => Math.random() - 0.5)
    .map((icon, index) => ({ id: index, icon }));
};

export const memoryInitialState: MemoryState = {
  cards: generateInitialCards(),
  flipped: [],
  matched: [],
  moves: 0,
  bestScore: localStorage.getItem('memoryBestScore') || null,
  isGameOver: false
};

export function memoryReducer(state: MemoryState, action: MemoryAction): MemoryState {
  switch (action.type) {
    case 'START_GAME':
      return {
        ...memoryInitialState,
        cards: generateInitialCards(),
        bestScore: localStorage.getItem('memoryBestScore') || null,
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
        const currentBest = state.bestScore ? parseInt(state.bestScore.toString()) : null;
        if (!currentBest || state.moves < currentBest) {
          newBest = state.moves;
          localStorage.setItem('memoryBestScore', newBest.toString());
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