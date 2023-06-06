import React, { useCallback } from "react";
import { motion, useTransform } from "framer-motion";

import { ScaleSVG } from "@visx/responsive";
import { scaleLinear } from "@visx/scale";
import { Group } from "@visx/group";
import { Bar } from "@visx/shape";

import { useSpringWith } from "../../utils/hooks";

import { gaugeSizes } from "./sizes";
import { AnimatedAxis } from "./AnimatedAxis";
import styled from "@emotion/styled";
import { UsageType } from "~/types";

interface Props {
  type: UsageType;
  value: number;
  limit?: number;
  widget?: boolean;
}

export const BarGauge: React.FC<Props> = ({
  type,
  value,
  widget = false,
  limit,
}) => {
  const { width, height, axisHeight, radius } = gaugeSizes(widget);

  const d = useCallback((value: number) => {
    const isTime = ["totalTime", "maxTime", "avgTime"].includes(type);
    return isTime ? value / 60 : value;
  }, [type]);

  const motionValue = useSpringWith(value);
  const scale = useCallback((value: number) => scaleLinear<number>({
    range: [0, width],
    round: true,
    domain: [0, d(limit ? Math.max(limit, value) : value)],
  }), [d, limit, width]);

  const isOverLimit = !!limit && (value > limit);

  const valueWidth = useTransform(motionValue, v => scale(v)(d(v)));
  const limitWidth = useTransform(motionValue, v => scale(v)(d(limit || 0)));

  return (
    <Container>
      <ScaleSVG width={width} height={height + axisHeight}>
        <Group>
          {widget ? null : <AnimatedAxis scale={scale(value)}/>}
          <Bar fill="var(--background-color)" height={height} width={width}
               rx={radius}/>
          <motion.rect
            fill={isOverLimit ? "var(--red)" : "var(--primary)"}
            height={height}
            width={valueWidth}
            rx={radius}
          />
          {limit && <>
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
