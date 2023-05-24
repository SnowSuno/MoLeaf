import React from "react";
import { Bar as VisxBar } from "@visx/shape";

import { DataPoint } from "../../types";
import { ScaleBand, ScaleLinear } from "d3-scale";
import { graphSizes } from "./sizes";

interface Props {
  data: DataPoint;
  xScale: ScaleBand<number>;
  yScale: ScaleLinear<number, number>;
  focused?: boolean;
  onClick?: () => void;
}

export const Bar: React.FC<Props> = ({
  data,
  xScale,
  yScale,
  focused = true,
  onClick,
}) => {
  const { height } = graphSizes();

  const barWidth = xScale.bandwidth();
  const barHeight = height - (yScale(data.value));
  const barX = xScale(data.date);
  const barY = height - barHeight;

  return <VisxBar
    x={barX}
    y={barY}
    width={barWidth}
    height={barHeight}
    fill="#50AA8D"
    opacity={focused ? 1 : 0.3}
    rx={12}
    onClick={onClick}
  />;
};
