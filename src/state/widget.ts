import { create } from "zustand";
import { persist } from "zustand/middleware";

import { UsageType } from "~/types";

interface WidgetState {
  order: UsageType[];
  setOrder: (order: UsageType[]) => void;
}

export const useWidgetState = create(
  persist<WidgetState>(
    set => ({
      order: ["totalTime", "pickups", "downTime", "maxTime", "avgTime"],
      setOrder: (order) => set({ order }),
    }),
    {
      name: "widget",
      // storage: createJSONStorage(),
    }
  )
);
