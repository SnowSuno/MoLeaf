import { shallow } from "zustand/shallow";
import { useMemo } from "react";

import type { DailyUsage, UsageType } from "~/types";
import { useUsage } from "~/state/usage";

export const useUsageOf = <T extends UsageType>(usage: T): DailyUsage<T>[] => {
  const data = useUsage(state => state.data, shallow);

  return useMemo(() => data.map(dailyData => ({
    date: dailyData.date + 7,
    usageData: dailyData[usage],
  })), [data, usage]);
};


