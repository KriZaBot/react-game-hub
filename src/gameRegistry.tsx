import { memoryReducer, memoryInitialState } from './components/MemoryGame/memoryReducer';
import { mastermindReducer, mastermindInitialState } from './components/Mastermind/mastermindReducer';

interface GameConfig {
  title: string;
  reducer: (state: any, action: any) => any;
  initialState: any;
}

interface GameRegistry {
  [key: string]: GameConfig;
}

export const GAME_LOGIC: GameRegistry = {
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