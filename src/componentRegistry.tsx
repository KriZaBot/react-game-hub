import React from 'react';
import MemoryGame from './components/MemoryGame/MemoryGame';
import Mastermind from './components/Mastermind/Mastermind';

interface ComponentRegistry {
  [key: string]: React.ComponentType<any>;
}

export const GAME_COMPONENTS: ComponentRegistry = {
  memory: MemoryGame,
  mastermind: Mastermind
};