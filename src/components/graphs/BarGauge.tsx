import React from "react";
import { motion, useTransform } from "framer-motion";

import { ScaleSVG } from "@visx/responsive";
import { scaleLinear } from "@visx/scale";
import { Group } from "@visx/group";
import { Bar } from "@visx/shape";
import { DataPoint } from "../../types";

import { useSpringWith } from "../../utils/hooks";

import { yMax, xMax, width, height, margin } from "./sizes";
import { Axis } from "./Axis";

interface Props {
  data: DataPoint;
  widget?: boolean;
  limit?: number;
}


export const BarGauge: React.FC<Props> = ({
  data,
  widget = false,
  limit = 2,
}) => {
  const value = useSpringWith(data.value);
  const scale = (value: number) => scaleLinear<number>({
    range: [0, xMax],
    round: true,
    domain: [0, Math.max(limit, value)],
  });

  const isOverLimit = data.value > limit;

  const x = useTransform(value, v => scale(v)(v));
  const x2 = useTransform(value, v => scale(v)(limit));

  return (
    <ScaleSVG width={width} height={height}>
      <Group top={margin.top} left={margin.inline}>
        {widget ? null : <Axis scale={scale(data.value)} limit={2}/>}
        <Bar fill="var(--light-gray)" height={yMax} width={xMax} rx={10}/>
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
        <motion.rect fill="#fff" height={yMax} x={x2} width={5}/>
      </Group>
    </ScaleSVG>
  );
};
