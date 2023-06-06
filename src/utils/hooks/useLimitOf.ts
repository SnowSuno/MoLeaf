import { useGoalState } from "~/state/goals";
import { shallow } from "zustand/shallow";
import { useMemo } from "react";

export const useLimitOf = <T extends "totalTime" | "pickups" | "maxTime" | "avgTime">(type: T): number | undefined => {
  const goals = useGoalState(state => state.goals, shallow);
  return useMemo(() => goals[type], [goals, type]);
};
