import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AxisBottom } from "@visx/axis";
import { ScaleLinear } from "d3-scale";

import { yMax } from "./sizes";

interface Props {
  scale: ScaleLinear<number, number, never>;
  limit: number;
}

export const Axis: React.FC<Props> = ({ scale, limit }) => (
  <AnimatePresence mode="wait" initial={false}>
    <motion.g
      key={scale(1)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <AxisBottom
        top={yMax}
        scale={scale}
        hideAxisLine={true}
        hideTicks={true}
        numTicks={limit}
        tickLength={0}
        tickLabelProps={{
          fill: "var(--gray)",
          fontFamily: "var(--text-font)",
        }}
        tickFormat={(tickValue) => `${tickValue}h`}
      />
    </motion.g>
  </AnimatePresence>
);
