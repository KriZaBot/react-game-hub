import { memoryReducer, memoryInitialState } from './components/MemoryGame/memoryReducer';
import { mastermindReducer, mastermindInitialState } from './components/Mastermind/mastermindReducer';

export const GAME_LOGIC = {
  memory: {
    title: 'Меморија',
    reducer: memoryReducer,
    initialState: memoryInitialState
  },
  mastermind: {
    title: 'Мастермајнд',
    reducer: mastermindReducer,
    initialState: mastermindInitialState
  }
};