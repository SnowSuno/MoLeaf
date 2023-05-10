import React, { useMemo } from "react";
import { ScaleSVG } from "@visx/responsive";
import { scaleLinear } from "@visx/scale";
import { Group } from "@visx/group";
import { Bar } from "@visx/shape";
import { AxisBottom } from "@visx/axis";
import { DataPoint } from "../types";

const width = 400;
const height = 50;
const margin = { top: 0, bottom: 15, inline: 20 };

interface Props {
  data: DataPoint;
}

export const BarGauge: React.FC<Props> = ({ data }) => {
  const xMax = width - margin.inline * 2;
  const yMax = height - margin.top - margin.bottom;

  const xScale = useMemo(() =>
    scaleLinear<number>({
      range: [0, xMax],
      round: true,
      domain: [0, 4],
    }), [xMax]);

  return (
    <ScaleSVG width={width} height={height}>
      <Group top={margin.top} left={margin.inline}>
        <AxisBottom
          top={yMax}
          scale={xScale}
          hideAxisLine={true}
          hideTicks={true}
          numTicks={2}
          tickLength={0}
          tickLabelProps={{
            fill: "var(--gray)",
            fontFamily: "var(--text-font)",
          }}
          tickFormat={tickValue => `${tickValue}h`}
        />
        <Bar
          fill="var(--light-gray)"
          height={yMax}
          width={xMax}
          rx={10}
        />
        <Bar
          fill="#50AA8D"
          height={yMax}
          width={xScale(data.value)}
          rx={10}
        />
      </Group>
    </ScaleSVG>
  );
};
