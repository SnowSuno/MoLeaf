import React, { useMemo } from "react";
import { motion, useTransform } from "framer-motion";

import { DailyUsageRequired } from "~/types";
import { MarginInline } from "~/components/elements/MarginInline";
import { graphSizes } from "~/components/graphs/sizes";
import { ScaleSVG } from "@visx/responsive";
import { Group } from "@visx/group";
import { scaleBand, scaleLinear } from "@visx/scale";
import { Axis } from "~/components/graphs/Axis";
import styled from "@emotion/styled";
import { useSpringWith } from "~/utils/hooks";
import { useDowntime } from "~/utils/hooks/useDowntime";

interface Props {
  data: DailyUsageRequired<"downTime">;
}

type Usage = { hour: number, usage: number };

const { width, height, boxPadding, axisHeight, axisMargin } = graphSizes();

const xScale = scaleBand<number>({
  range: [0, width],
  round: true,
  domain: [...Array(25).keys()],
  padding: 0.4,
});
const yScale = scaleLinear<number>({
  range: [height, 0],
  round: true,
  domain: [0, 60],
});

const span = (start: number, end: number) => {
  const xStart = xScale(start);
  const xEnd = xScale(end);

  return xStart && xEnd && ({
    x: xStart - boxPadding,
    y: -boxPadding,
    width: (xEnd - xStart) + xScale.bandwidth() + 2 * boxPadding,
    height: height + 2 * boxPadding,
    rx: xScale.bandwidth() / 2 + 3
  });
};
export const DowntimeGraph: React.FC<Props> = ({
  data: { usageData: { usages } }
}) => {
  const filledUsages = useMemo(() => fillZeros(usages), [usages]);

  const { goals, isOverLimit } = useDowntime();

  return (
    <MarginInline>
      <Container>
        <ScaleSVG width={width} height={height + axisHeight}>
          <Group>
            <Axis
              orientation="left"
              scale={yScale}
              left={0}
              unit="m"
              tickValues={[0, 30, 60]}
            />
            {goals?.map(([start, end]) => <rect
              key={start}
              {...span(start, end)}
              fill="var(--light-gray)"
            />)}

            {filledUsages.map(usage => <Bar
              key={usage.hour}
              data={usage}
              isOverLimit={isOverLimit(usage)}
            />)}

            <Axis
              orientation="bottom"
              scale={xScale}
              top={height + axisMargin}
              unit="h"
            />

          </Group>
        </ScaleSVG>
      </Container>
    </MarginInline>
  );
};

interface BarProps {
  data: Usage;
  isOverLimit?: boolean;
}
const Bar: React.FC<BarProps> = ({data: { hour, usage }, isOverLimit}) => {
  const value = useSpringWith(yScale(usage));

  return <motion.rect
    x={xScale(hour)}
    y={value}
    width={xScale.bandwidth()}
    height={useTransform(value, v => height - v)}
    rx={xScale.bandwidth() / 2}
    fill={`var(--${isOverLimit ? "red" : "primary"})`}
  />;
};

const Container = styled(motion.div)`
  padding-top: 10px;

  &, & > div, & > div > svg {
    overflow: visible !important;
  }
`;

const fillZeros = (usages: Usage[]): Usage[] => {
  const zeros = Object.fromEntries(
    [...Array(24).keys()].map(hour => [hour, 0]));

  const values = Object.fromEntries(
    usages.map(usage => [(usage.hour + 9) % 24 + 1, usage.usage]));

  return Object
    .entries({ ...zeros, ...values })
    .map(([hour, usage]) => ({ hour: parseInt(hour), usage }));
};


