import React, { useEffect, useMemo, useRef } from "react";
import { Group } from "@visx/group";
import { scaleBand, scaleLinear } from "@visx/scale";
import { ScaleSVG } from "@visx/responsive";
import type { DataPoint } from "../../types";

import styled from "@emotion/styled";
import { graphSizes } from "./sizes";
import { Axis } from "./Axis";
import { Bar } from "./Bar";
import { motion } from "framer-motion";

interface Props {
  data: DataPoint[];
  selectedDate: number;
  onClickDate?: (date: number) => void;
  updateHeight?: (height: number) => void;
}

export const BarGroup: React.FC<Props> = ({
  data,
  selectedDate,
  onClickDate,
  updateHeight,
}) => {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    console.log("HEIGHT", ref.current?.height.baseVal.value);
    if (ref.current) updateHeight?.(ref.current.height.baseVal.value);
  }, [updateHeight]);

  const { width, height } = graphSizes();

  const xScale = useMemo(() =>
    scaleBand<number>({
      range: [0, width],
      round: true,
      domain: data.map(data => data.date),
      padding: 0.3,
    }), [data, width]);
  const yScale = useMemo(() =>
    scaleLinear<number>({
      range: [height, 0],
      round: true,
      domain: [0, Math.max(...data.map(data => data.value))],
    }), [height, data]);

  return (
    <Container
      variants={{
        hidden: { height: 0 },
        visible: { height: "auto" },
      }}
      animate="visible"
    >
      <ScaleSVG width={width} height={height} innerRef={ref}>
        <Group>
          <Axis
            orientation="left"
            scale={yScale}
            left={0}
          />

          {data.map(dataPoint => <Bar
            key={dataPoint.date}
            data={dataPoint}
            xScale={xScale}
            yScale={yScale}
            focused={dataPoint.date === selectedDate}
            onClick={() => onClickDate?.(dataPoint.date)}
          />)}
        </Group>
      </ScaleSVG>
    </Container>
  );
};

const Container = styled(motion.div)`
  z-index: 20;
  
  &, & > div, & > div > svg {
    overflow: visible !important;
  }
`;
