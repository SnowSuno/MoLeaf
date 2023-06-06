import { create } from "zustand";

interface GoalState {
  goals: {
    totalTime: number | undefined;
    pickups: number | undefined;
    downTime: [number, number][] | undefined;
    maxTime: number | undefined;
    avgTime: number | undefined;
  };

}

export const useGoalState = create<GoalState>(set => ({
  goals: {
    totalTime: 240,
    pickups: undefined,
    downTime: [],
    maxTime: 40,
    avgTime: undefined,
  }
}));
