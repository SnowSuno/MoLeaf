export type UsageType =
  | "totalTime"
  | "pickups"
  | "downTime"
  | "maxTime"
  | "avgTime"

// | "lastPickup";

interface BaseUsage {
  usage: number;
}

interface UsageWithDetails extends BaseUsage {
  details: {
    appName: string;
    usage: number;
  }[];
}

interface DownTimeUsage {
  usages: {
    hour: number;
    usage: number;
  }[];
  details: {
    appName: string;
    usages: number[];
  }[];
}

// type LastPickupUsage = {
//   time: number;
// }

export type UsageOf<T extends UsageType> = {
  totalTime: UsageWithDetails;
  pickups: BaseUsage;
  downTime: DownTimeUsage;
  maxTime: UsageWithDetails;
  avgTime: UsageWithDetails;
  // lastPickup: LastPickupUsage;
}[T]

export interface RawUsage {
  date: number;

  totalTime: UsageOf<"totalTime">;
  pickups: UsageOf<"pickups">;
  downTime: UsageOf<"downTime">;
  maxTime: UsageOf<"maxTime">;
  avgTime: UsageOf<"avgTime">;
  // lastPickup: UsageOf<"lastPickup">;
}

export type UsageData = RawUsage[];

export interface DailyUsage<T extends UsageType> {
  date: number;
  usageData: UsageOf<T> | null;
}

export interface DailyUsageRequired<T extends UsageType> {
  date: number;
  usageData: UsageOf<T>;
}

export const hasData =
  <T extends UsageType>(data: DailyUsage<T>): data is DailyUsageRequired<T> => !!data.usageData;
