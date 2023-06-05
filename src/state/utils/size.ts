import React, { useEffect, useRef } from "react";
import { create } from "zustand";

interface SizeState {
  height: number;
  setHeight: (height: number) => void;
}

export const useElementStore = create<SizeState>(set => ({
  height: 0,
  setHeight: (height: number) => set({ height }),
}));

export const useMeasureElement = () => {
  const ref = useRef<SVGSVGElement>(null);
  const setHeight = useElementStore(state => state.setHeight);

  useEffect(() => {
    setHeight(ref.current?.height.baseVal.value ?? 0);
  }, [setHeight, ref]);

  return ref;
};

export const useElementHeight = () => {
  return useElementStore(state => state.height);
};
