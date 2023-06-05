import { RawUsage } from "~/types";

interface OriginalData {
  date: number;
  totalTime: number;
  details: {
    appName: string;
    usage: number;
  }[];
  keys: {
    hour: string;
    usage: number;
  }[];
}

const transform = (data: OriginalData): RawUsage => ({
  date: data.date,
  totalTime: {
    usage: data.totalTime,
    details: data.details,
  },
  pickups: {
    usage: 0,
  },
  downTime: {
    usages: data.keys.map(({ hour, usage }) => ({
      hour: parseInt(hour),
      usage,
    })),
    details: [],
  },
  maxTime: { usage: 0, details: [] },
  avgTime: { usage: 0, details: [] },
});

export const migrate = (data: OriginalData[]) => data.map(transform);
