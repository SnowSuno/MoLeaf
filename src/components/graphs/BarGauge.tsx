import React, { useCallback, useMemo } from "react";
import { motion, useTransform } from "framer-motion";

import { ScaleSVG } from "@visx/responsive";
import { scaleLinear } from "@visx/scale";
import { Group } from "@visx/group";
import { Bar } from "@visx/shape";

import { useSpringWith } from "~/utils/hooks";

import { gaugeSizes } from "./sizes";
import { AnimatedAxis } from "./AnimatedAxis";
import styled from "@emotion/styled";
import { UsageType } from "~/types";

interface Props {
  type: UsageType;
  value: number;
  goal?: number;
  widget?: boolean;
}

export const BarGauge: React.FC<Props> = ({
  type,
  value,
  widget = false,
  goal,
}) => {
  const { width, height, axisHeight, radius } = gaugeSizes(widget);


  const max = useMemo(() => (
    goal ? Math.max(goal, value) : value
  ), [goal, value]);

  const isTime = useMemo(() => (
      ["totalTime", "maxTime", "avgTime"].includes(type)
  ), [type]);

  const d = useCallback((value: number) => {
    return isTime && max > 60 ? value / 60 : value;
  }, [isTime, max]);

  // const d = useCallback((value: number) => {
  //   const isTime = ["totalTime", "maxTime", "avgTime"].includes(type);
  //   return isTime ? value / 60 : value;
  // }, [type]);

  const motionValue = useSpringWith(value);
  const scale = useCallback((value: number) => scaleLinear<number>({
    range: [0, width],
    round: true,
    domain: [0, d(goal ? Math.max(goal, value) : value)],
  }), [d, goal, width]);

  const isOverLimit = !!goal && (value > goal);

  const valueWidth = useTransform(motionValue, v => scale(v)(d(v)));
  const limitWidth = useTransform(motionValue, v => scale(v)(d(goal || 0)));

  return (
    <Container>
      <ScaleSVG width={width} height={height + axisHeight}>
        <Group>
          {widget ? null : <AnimatedAxis
            scale={scale(value)}
            unit={isTime ? (max > 60 ? "h" : "m") : ""}
          />}
          <Bar fill="var(--background-color)" height={height} width={width}
               rx={radius}/>
          <motion.rect
            fill={isOverLimit ? "var(--red)" : "var(--primary)"}
            height={height}
            width={valueWidth}
            rx={radius}
          />
          {goal && <>
            <motion.rect
              fill={`rgba(var(--white_w), ${isOverLimit ? 0.22 : 0})`}
              height={height}
              width={limitWidth}
            />
            <motion.rect fill="#fff" height={height} x={limitWidth} width={5}/>
          </>}
        </Group>
      </ScaleSVG>
    </Container>
  );
};

const Container = styled.div`
  &, & > div, & > div > svg {
    overflow: visible !important;
  }
`;
