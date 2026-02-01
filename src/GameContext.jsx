import React, { createContext, useReducer } from 'react';
import { GAME_LOGIC } from './gameRegistry';

export const GameContext = createContext();

const dynamicInitialState = {};
Object.keys(GAME_LOGIC).forEach(key => {
  dynamicInitialState[key] = GAME_LOGIC[key].initialState;
});

function rootReducer(state, action) {
  const newState = { ...state };
  Object.keys(GAME_LOGIC).forEach(key => {
    newState[key] = GAME_LOGIC[key].reducer(state[key], action);
  });
  return newState;
}

export const GameProvider = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, dynamicInitialState);
  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};