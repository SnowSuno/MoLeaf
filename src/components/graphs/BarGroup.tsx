import React, { useCallback, useMemo } from "react";
import { Group } from "@visx/group";
import { scaleBand, scaleLinear } from "@visx/scale";
import { ScaleSVG } from "@visx/responsive";

import styled from "@emotion/styled";
import { graphSizes } from "./sizes";
import { Axis } from "./Axis";
import { Bar } from "./Bar";
import { motion } from "framer-motion";
import { DailyUsage, hasData, UsageType } from "~/types";

interface Props {
  type: UsageType;
  data: DailyUsage<"totalTime" | "pickups" | "maxTime" | "avgTime">[];
  limit?: number;
  selectedDate: number;
  onClickDate?: (date: number) => void;
}

export const BarGroup: React.FC<Props> = ({
  type,
  data,
  limit,
  selectedDate,
  onClickDate,
}) => {
  const { width, height } = graphSizes();

  const max = useMemo(() => (
    Math.max(...data.map(data => data.usageData?.usage || 0))
  ), [data]);

  const isTime = useMemo(() => (
      ["totalTime", "maxTime", "avgTime"].includes(type)
  ), [type]);

  const d = useCallback((value: number) => {
    return isTime && max > 60 ? value / 60 : value;
  }, [isTime, max]);

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
      domain: [0, d(max)],
    }), [d, height, max]);

  return (
    <Container>
      <ScaleSVG width={width} height={height}>
        <Group>
          <Axis
            orientation="left"
            unit={isTime ? (max > 60 ? "h" : "m") : ""}
            scale={yScale}
            left={0}
          />

          {data.map(dataPoint =>
            hasData(dataPoint) && <Bar
              key={dataPoint.date}
              data={dataPoint}
              d={d}
              limit={limit}
              xScale={xScale}
              yScale={yScale}
              focused={dataPoint.date === selectedDate}
              onClick={() => onClickDate?.(dataPoint.date)}
            />)
          }
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
