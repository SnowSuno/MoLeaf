import { useGoalState } from "~/state/goals";
import { shallow } from "zustand/shallow";
import { useCallback } from "react";
import { DailyUsage, isDataType, UsageType } from "~/types";

interface ReturnType {
  goal: number | [number, number][] | undefined;
  overLimit: (data: DailyUsage) => boolean;
}

export const useLimitOf = <T extends UsageType> (type: T): ReturnType => {
  const goal = useGoalState(state => state.goals[type], shallow);

  return {
    goal,
    overLimit: useCallback(
      (data: DailyUsage): boolean => {
        if (!goal || !data.usageData) return false;

        if (isDataType(type, data, ["downTime"])) {
          return data.usageData.usages
            .filter(({ usage }) => !!usage)
            .some(({ hour }) => {
              (goal as [number, number][]).some(([start, end]) => (
                hour >= start && hour <= end
              ));
            });
        }

        if (isDataType(type, data,
          ["totalTime", "pickups", "maxTime", "avgTime"])) {
          return data.usageData.usage >= (goal as number);
        }

        return false;
      }, [goal, type])
  };
};
