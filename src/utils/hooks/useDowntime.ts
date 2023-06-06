import { useCallback } from "react";
import { shallow } from "zustand/shallow";

import { useGoalState } from "~/state/goals";

type Usage = { hour: number, usage: number };

export const useDowntime = () => {
  const goals = useGoalState(state => state.goals.downTime, shallow);
  const isOverLimit = useCallback(({ hour, usage }: Usage) => (
    goals?.some(([start, end]) => (
      !!usage && hour >= start && hour <= end
    ))
  ), [goals]);

  return { goals, isOverLimit };
};
