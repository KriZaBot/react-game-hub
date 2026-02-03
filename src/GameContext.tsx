import { createContext, useReducer, ReactNode, Dispatch } from 'react';
import { GAME_LOGIC } from './gameRegistry';

interface GameAction {
  type: string;
  gameId?: string;
  [key: string]: any;
}

interface GameState {
  [key: string]: any;
}

interface GameContextType {
  state: GameState;
  dispatch: Dispatch<GameAction>;
}

export const GameContext = createContext<GameContextType | undefined>(undefined);

const dynamicInitialState: GameState = {};

function rootReducer(state: GameState, action: GameAction): GameState {
  if (action.gameId) {
    const gameKey = action.gameId;
    const currentGameState = state[gameKey] || GAME_LOGIC[gameKey as keyof typeof GAME_LOGIC].initialState;
    const nextGameState = GAME_LOGIC[gameKey as keyof typeof GAME_LOGIC].reducer(currentGameState, action);

    return {
      ...state,
      [gameKey]: nextGameState
    };
  }
  return state;
}

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(rootReducer, dynamicInitialState);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};