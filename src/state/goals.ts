import { create } from "zustand";

interface GoalState {
  goals: {
    totalTime: number | null;
    pickups: number | null;
    downTime: [number, number][] | null;
    maxTime: number | null
    avgTime: number | null;
  };

}

export const useGoalState = create<GoalState>(set => ({
  goals: {
    totalTime: 0,
    pickups: 0,
    downTime: [],
    maxTime: 0,
    avgTime: 0,
  }
}));
