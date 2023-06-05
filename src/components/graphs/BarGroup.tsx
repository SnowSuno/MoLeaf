import React, { useMemo } from "react";
import { Group } from "@visx/group";
import { scaleBand, scaleLinear } from "@visx/scale";
import { ScaleSVG } from "@visx/responsive";

import styled from "@emotion/styled";
import { graphSizes } from "./sizes";
import { Axis } from "./Axis";
import { Bar } from "./Bar";
import { motion } from "framer-motion";
import { useMeasureElement } from "~/state/utils/size";
import { DailyUsage, hasData } from "~/types";

interface Props {
  data: DailyUsage<"totalTime" | "pickups" | "maxTime" | "avgTime">[];
  limit: number;
  selectedDate: number;
  onClickDate?: (date: number) => void;
}

export const BarGroup: React.FC<Props> = ({
  data,
  limit,
  selectedDate,
  onClickDate,
}) => {
  const ref = useMeasureElement();
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
      domain: [0, Math.max(...data.map(data => data.usageData?.usage || 0))],
    }), [height, data]);

  return (
    <Container>
      <ScaleSVG width={width} height={height} innerRef={ref}>
        <Group>
          <Axis
            orientation="left"
            scale={yScale}
            left={0}
          />

          {data.map(dataPoint =>
            hasData(dataPoint) && <Bar
              key={dataPoint.date}
              data={dataPoint}
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
