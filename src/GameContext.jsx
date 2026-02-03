import React, { createContext, useReducer } from 'react';
import { GAME_LOGIC } from './gameRegistry';

export const GameContext = createContext();

const dynamicInitialState = {};

function rootReducer(state, action) {
  if (action.gameId) {
    const gameKey = action.gameId;
  
    const currentGameState = state[gameKey] || GAME_LOGIC[gameKey].initialState;
    const nextGameState = GAME_LOGIC[gameKey].reducer(currentGameState, action);


    return {
      ...state,
      [gameKey]: nextGameState
    };
  }
  return state;
}

export const GameProvider = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, dynamicInitialState);
  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};