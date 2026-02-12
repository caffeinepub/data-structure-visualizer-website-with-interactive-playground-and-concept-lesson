import { useReducer } from 'react';
import type { ExamplePreset } from '@/backend';

export interface PlaygroundState {
  data: any[];
  lastOperation?: string;
}

export type PlaygroundAction =
  | { type: 'INSERT'; value: string }
  | { type: 'DELETE'; value: string }
  | { type: 'SEARCH'; value: string }
  | { type: 'POP' }
  | { type: 'RESET' }
  | { type: 'LOAD_PRESET'; preset: ExamplePreset };

function playgroundReducer(state: PlaygroundState, action: PlaygroundAction): PlaygroundState {
  switch (action.type) {
    case 'INSERT':
      return {
        ...state,
        data: [...state.data, action.value],
        lastOperation: `Inserted ${action.value}`,
      };
    case 'DELETE':
      return {
        ...state,
        data: state.data.filter((item) => item !== action.value),
        lastOperation: `Deleted ${action.value}`,
      };
    case 'SEARCH':
      return {
        ...state,
        lastOperation: state.data.includes(action.value)
          ? `Found ${action.value}`
          : `${action.value} not found`,
      };
    case 'POP':
      if (state.data.length === 0) return state;
      return {
        ...state,
        data: state.data.slice(0, -1),
        lastOperation: `Removed ${state.data[state.data.length - 1]}`,
      };
    case 'RESET':
      return {
        data: [],
        lastOperation: 'Reset',
      };
    case 'LOAD_PRESET':
      const parsedData = parsePresetInput(action.preset.sampleInput);
      return {
        data: parsedData,
        lastOperation: `Loaded preset: ${action.preset.title}`,
      };
    default:
      return state;
  }
}

function parsePresetInput(input: string): any[] {
  try {
    const cleaned = input.replace(/[\[\]]/g, '');
    return cleaned.split(',').map((item) => {
      const trimmed = item.trim();
      const num = parseInt(trimmed);
      return isNaN(num) ? trimmed : num;
    });
  } catch {
    return [];
  }
}

export function usePlaygroundState(dataStructure: string) {
  const [state, dispatch] = useReducer(playgroundReducer, { data: [] });
  return { state, dispatch };
}
