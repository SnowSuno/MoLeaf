import { useMemo } from "react";
import { Bar } from "@visx/shape";
import { Group } from "@visx/group";
// import letterFrequency, { LetterFrequency } from '@visx/mock-data/lib/mocks/letterFrequency';
import { scaleBand, scaleLinear } from "@visx/scale";

const data = [
  { date: 12, value: 10 },
  { date: 13, value: 5 },
  { date: 14, value: 15 },
  { date: 15, value: 7 },
  { date: 16, value: 2 },
  { date: 17, value: 4 },
  { date: 18, value: 10 },
];
const verticalMargin = 120;

// accessors

export type BarsProps = {
  width: number;
  height: number;
  events?: boolean;
};

export default function Example({ width, height, events = false }: BarsProps) {
  // bounds
  const xMax = width;
  const yMax = height - verticalMargin;

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

  return width < 10 ? null : (
    <svg width={width} height={height}>
      <rect width={width} height={height} fill="url(#teal)" rx={14}/>
      <Group top={verticalMargin / 2}>
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
    </svg>
  );
}
