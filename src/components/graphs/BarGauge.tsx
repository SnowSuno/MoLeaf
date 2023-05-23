import React from "react";
import { motion, useTransform } from "framer-motion";

import { ScaleSVG } from "@visx/responsive";
import { scaleLinear } from "@visx/scale";
import { Group } from "@visx/group";
import { Bar } from "@visx/shape";
import { DataPoint } from "../../types";

import { useSpringWith } from "../../utils/hooks";

import { width, height, axisHeight } from "./sizes";
import { Axis } from "./Axis";
import styled from "@emotion/styled";

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
  const totHeight = widget ? height : height - axisHeight;

  const value = useSpringWith(data.value);
  const scale = (value: number) => scaleLinear<number>({
    range: [0, width],
    round: true,
    domain: [0, Math.max(limit, value)],
  });

  const isOverLimit = data.value > limit;

  const x = useTransform(value, v => scale(v)(v));
  const x2 = useTransform(value, v => scale(v)(limit));

  return (
    <Container>
      <ScaleSVG width={width} height={height}>
        <Group>
          {widget ? null : <Axis scale={scale(data.value)} />}
          <Bar fill="var(--light-gray)" height={totHeight} width={width} rx={10}/>
          <motion.rect
            fill={isOverLimit ? "#F96D75" : "#50AA8D"}
            height={totHeight}
            width={x}
            rx={10}
          />
          <motion.rect
            fill={`rgba(255, 255, 255, ${isOverLimit ? 0.22 : 0})`}
            height={totHeight}
            width={x2}
          />
          <motion.rect fill="#fff" height={totHeight} x={x2} width={5}/>
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
