import { DailyUsage, UsageType } from "~/types";

const RANGE = 14;
const START = 5;
const OFFSET = 8;

export const paginate = <T extends UsageType> (data: DailyUsage<T>[]): DailyUsage<T>[][] => {
  const padded = [...Array(RANGE).keys()]
    .map(v => v + START)
    .map(date => ({
      date,
      usageData: data[date - OFFSET]?.usageData ?? null,
    }));

  return [
    padded.slice(0, 7),
    padded.slice(7, 14),
  ];
};
