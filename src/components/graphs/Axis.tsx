import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AxisBottom } from "@visx/axis";
import { ScaleLinear } from "d3-scale";

import { sizes } from "./sizes";

interface Props {
  scale: ScaleLinear<number, number, never>;
}

export const Axis: React.FC<Props> = ({ scale }) => {
  const { height } = sizes(false);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.g
        key={scale(1)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <AxisBottom
          top={height}
          scale={scale}
          hideAxisLine={true}
          hideTicks={true}
          numTicks={2}
          tickLength={0}
          tickLabelProps={{
            fill: "var(--gray)",
            fontFamily: "var(--text-font)",
            fontSize: 14,
          }}
          tickFormat={(tickValue) => `${tickValue}h`}
        />
      </motion.g>
    </AnimatePresence>
  );
};
