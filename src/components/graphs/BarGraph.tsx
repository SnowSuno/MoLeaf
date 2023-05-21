import React, { useMemo } from "react";
import { Bar } from "@visx/shape";
import { Group } from "@visx/group";
import { scaleBand, scaleLinear } from "@visx/scale";
import { ScaleSVG } from "@visx/responsive";
import { AxisLeft } from "@visx/axis";
import type { DataPoint } from "../../types";

import { spacing } from "./constants";
// accessors

interface Props {
  data: DataPoint[];
  selected: DataPoint;
  onClickData?: (dataPoint: DataPoint) => void;
  events?: boolean;
  width?: number;
  height?: number;
  marginLeft?: number;
  marginRight?: number;
  marginTop?: number;
  marginBottom?: number;
}

export const BarGraph: React.FC<Props> = ({
  data,
  selected,
  onClickData,
  marginTop = 5,
  marginBottom = 5,
}) => {
  // bounds
  const xMax = spacing.width - 2 * spacing.marginInline;
  const yMax = spacing.height - marginTop - marginBottom;

  // scales, memoize for performance
  const xScale = useMemo(() =>
    scaleBand<number>({
      range: [0, xMax],
      round: true,
      domain: data.map(data => data.date),
      padding: 0.3,
    }), [xMax, data]);
  const yScale = useMemo(() =>
    scaleLinear<number>({
      range: [yMax, 0],
      round: true,
      domain: [0, Math.max(...data.map(data => data.value))],
    }), [yMax, data]);

  return (
    <ScaleSVG width={spacing.width} height={spacing.height}>
      <Group top={marginTop} left={spacing.marginInline}>
        <AxisLeft
          scale={yScale}
          hideAxisLine={true}
          hideTicks={true}
          left={spacing.marginInline - 18}
          numTicks={2}
          tickLength={0}
          tickLabelProps={{
            fill: "var(--gray)",
            fontFamily: "var(--text-font)",
          }}
          tickFormat={tickValue => `${tickValue}h`}
        />

        {data.map(dataPoint => {
          const barWidth = xScale.bandwidth();
          const barHeight = yMax - (yScale(dataPoint.value));
          const barX = xScale(dataPoint.date);
          const barY = yMax - barHeight;
          return (
            <Bar
              key={`bar-${dataPoint.date}`}
              x={barX}
              y={barY}
              width={barWidth}
              height={barHeight}
              fill="#50AA8D"
              opacity={dataPoint.date === selected.date ? 1 : 0.3}
              rx={12}
              onClick={() => onClickData?.(dataPoint)}
            />
          );
        })}
      </Group>
    </ScaleSVG>
  );
};
