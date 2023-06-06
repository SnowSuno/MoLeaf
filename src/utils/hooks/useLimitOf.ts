import { useGoalState } from "~/state/goals";
import { shallow } from "zustand/shallow";
import { DailyUsage, type UsageType } from "~/types";
import { useCallback, useMemo } from "react";

export const useLimitOf = <T extends UsageType> (type: T) => {
  const goals = useGoalState(state => state.goals, shallow);
  const limit = useMemo(() => goals[type], [goals, type]);

  return useCallback((data: DailyUsage<T>) => {

  }, [limit])
};
