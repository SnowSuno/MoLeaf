import { shallow } from "zustand/shallow";
import { useMemo } from "react";

import type { DailyUsage, UsageType } from "~/types";
import { useUsage } from "~/state/usage";

export const useUsageOf = (usage: UsageType): DailyUsage<typeof usage>[] => {
  const data = useUsage(state => state.data, shallow);

  return useMemo(() => data.map(dailyData => ({
    date: dailyData.date,
    usageData: dailyData[usage],
  })), [data, usage]);
};


