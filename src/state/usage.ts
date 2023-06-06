import { create } from "zustand";
import { UsageData } from "~/types";

interface UsageState {
  data: UsageData;
  // loadData: (path: string) => void;
  loadData: (data: UsageData) => void;
}

export const useUsage = create<UsageState>(set => ({
  data: [],
  // loadData: (path) => fetch(path)
  //   .then(res => res.json())
  //   .then(data => set({ data })),
  loadData: (data) => set({ data }),
}));
