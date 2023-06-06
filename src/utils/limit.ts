import type { DailyUsage, UsageType } from "~/types";
import { isDataType } from "~/types";

export const isOverLimit = (
  type: UsageType,
  usage: DailyUsage,
  limit?: number,
): boolean | null => {
  if (isDataType(type, usage, ["totalTime", "maxTime", "avgTime", "pickups"])) {
    if (limit === undefined) return null;
    return !!usage.usageData && usage.usageData.usage > limit;
  }

  return true;
};
