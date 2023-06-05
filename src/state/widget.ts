import { create } from "zustand";
import { UsageType } from "../types";

interface WidgetState {
  main: UsageType;
  order: UsageType[];
  setMain: (main: UsageType) => void;
  setOrder: (order: UsageType[]) => void;
}

export const useWidget = create<WidgetState>(set => ({
  main: "totalTime",
  order: ["totalTime", "pickups", "downTime", "maxTime", "avgTime", "lastPickup"],
  setMain: (main) => set({ main }),
  setOrder: (order) => set({ order }),
}));
