import React, { useEffect, useMemo } from "react";
import {
  AnimatePresence,
  motion,
  useSpring, useTransform,
} from "framer-motion";

import { ScaleSVG } from "@visx/responsive";
import { scaleLinear } from "@visx/scale";
import { Group } from "@visx/group";
import { Bar } from "@visx/shape";
import { AxisBottom } from "@visx/axis";
import { DataPoint } from "../../types";

import { type ScaleLinear } from "d3-scale";

const width = 400;
const height = 50;
const margin = { top: 0, bottom: 15, inline: 20 };

const yMax = height - margin.top - margin.bottom;

interface Props {
  data: DataPoint;
}

export const BarGauge: React.FC<Props> = ({ data }) => {
  const value = useSpringWith(data.value);

  const xMax = width - margin.inline * 2;

  const xScale = useMemo(() => scaleLinear<number>({
      range: [0, xMax],
      round: true,
      domain: [0, Math.max(2, data.value)],
    },
  ), [xMax, data]);

  const isOverLimit = data.value > 2;

  // const x = useSpringWith(xScale(data.value));
  // const x2 = useSpringWith(xScale(2));

  const x = useTransform(value, value => {
    const xScale = scaleLinear<number>({
      range: [0, xMax],
      round: true,
      domain: [0, Math.max(2, value)],
    });

    return xScale(value);
  });
  const x2 = useTransform(value, value => {
    const xScale = scaleLinear<number>({
      range: [0, xMax],
      round: true,
      domain: [0, Math.max(2, value)],
    });

    return xScale(2);
  });

  return (
    <ScaleSVG width={width} height={height}>
      <Group top={margin.top} left={margin.inline}>
        <Axis scale={xScale}/>
        <Bar
          fill="var(--light-gray)"
          height={yMax}
          width={xMax}
          rx={10}
        />
        <motion.rect
          fill={isOverLimit ? "#F96D75" : "#50AA8D"}
          height={yMax}
          width={x}
          rx={10}
        />
        <motion.rect
          fill={`rgba(255, 255, 255, ${isOverLimit ? 0.22 : 0})`}
          height={yMax}
          width={x2}
        />
        <motion.rect
          fill="#fff"
          height={yMax}
          x={x2}
          width={5}
        />
      </Group>
    </ScaleSVG>
  );
};

interface ScaleProps {
  scale: ScaleLinear<number, number, never>;
}

const Axis: React.FC<ScaleProps> = ({ scale }) => (
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
        numTicks={2}
        tickLength={0}
        tickLabelProps={{
          fill: "var(--gray)",
          fontFamily: "var(--text-font)",
        }}
        tickFormat={tickValue => `${tickValue}h`}
      />;
    </motion.g>
  </AnimatePresence>
);

const useSpringWith = (x: number) => {
  const springX = useSpring(x, { stiffness: 1000, damping: 100 });

  useEffect(() => {
    springX.set(x);
  }, [x, springX]);

  return springX;
};
