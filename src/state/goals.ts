import { create } from "zustand";
import { UsageType } from "~/types";

interface Goals {
  totalTime: number | undefined;
  pickups: number | undefined;
  downTime: [number, number][] | undefined;
  maxTime: number | undefined;
  avgTime: number | undefined;
}

interface GoalState {
  goals: Goals;
  setGoal: (
    type: UsageType,
    goal: number | [number, number][] | undefined
  ) => void;
}

export const useGoalState = create<GoalState>((set) => ({
  goals: {
    totalTime: 240,
    pickups: 100,
    downTime: [
      [5, 9],
      [15, 16],
    ],
    maxTime: 40,
    avgTime: 10,
  },
  setGoal: <T extends UsageType>(type: T, goal: Goals[T]) => {
    set((prev) => ({
      ...prev,
      goals: {
        ...prev.goals,
        [type]: goal,
      },
    }));
    //   const newGoal = { ...prev.goals };
    //   newGoal[type] = goal;
    //   return newGoal;
    // });
  },
}));
