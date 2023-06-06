import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ScaleLinear } from "d3-scale";

import { gaugeSizes } from "./sizes";
import { Axis } from "./Axis";

interface Props {
  scale: ScaleLinear<number, number>;
  unit?: string;
}

export const AnimatedAxis: React.FC<Props> = ({ scale, unit }) => {
  const { height } = gaugeSizes(false);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.g
        key={scale(1)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Axis
          orientation="bottom"
          top={height}
          scale={scale}
          unit={unit}
        />
      </motion.g>
    </AnimatePresence>
  );
};
