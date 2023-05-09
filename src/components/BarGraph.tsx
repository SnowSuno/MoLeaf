import React, { useMemo } from "react";
import { Bar } from "@visx/shape";
import { Group } from "@visx/group";
import { scaleBand, scaleLinear } from "@visx/scale";
import { ScaleSVG } from "@visx/responsive";
import { AxisLeft } from "@visx/axis";

const data = [
  { date: 12, value: 2.4 },
  { date: 13, value: 4.2 },
  { date: 14, value: 1.1 },
  { date: 15, value: 0.7 },
  { date: 16, value: 2.8 },
  { date: 17, value: 1.4 },
  { date: 18, value: 2 },
];

// accessors

interface Props {
  events?: boolean;
  marginLeft?: number;
  marginRight?: number;
  marginTop?: number;
  marginBottom?: number;
}

export const BarGraph: React.FC<Props> = ({
  events = false,
  marginLeft = 25,
  marginRight = 5,
  marginTop = 5,
  marginBottom = 5,
}) => {
  // bounds
  const xMax = 400 - marginLeft - marginRight;
  const yMax = 200 - marginTop - marginBottom;

  // scales, memoize for performance
  const xScale = useMemo(() =>
    scaleBand<number>({
      range: [0, xMax],
      round: true,
      domain: data.map(data => data.date),
      padding: 0.4,
    }), [xMax]);
  const yScale = useMemo(() =>
    scaleLinear<number>({
      range: [yMax, 0],
      round: true,
      domain: [0, Math.max(...data.map(data => data.value))],
    }), [yMax]);

  return (
    <ScaleSVG width={400} height={300}>
      {/*<rect width={width} height={height} fill="url(#teal)" rx={14} />*/}
      <Group top={marginTop} left={marginLeft}>
        <AxisLeft
          scale={yScale}
          hideAxisLine={true}
          hideTicks={true}
          left={5}
          numTicks={2}
          tickLength={0}
          tickLabelProps={{
            fill: "var(--gray)",
            fontFamily: "var(--text-font)",
          }}
          tickFormat={tickValue => `${tickValue}h`}
        />
        {data.map(data => {
          const barWidth = xScale.bandwidth();
          const barHeight = yMax - (yScale(data.value));
          const barX = xScale(data.date);
          const barY = yMax - barHeight;
          return (
            <Bar
              key={`bar-${data.date}`}
              x={barX}
              y={barY}
              width={barWidth}
              height={barHeight}
              fill="#50AA8D"
              rx={10}
              onClick={() => {
                if (events) alert(
                  `clicked: ${JSON.stringify(Object.values(data))}`);
              }}
            />
          );
        })}
      </Group>
    </ScaleSVG>
  );
};
