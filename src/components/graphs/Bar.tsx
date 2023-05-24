import React from "react";
import { Bar as VisxBar } from "@visx/shape";

import { DataPoint } from "../../types";
import { ScaleBand, ScaleLinear } from "d3-scale";
import { graphSizes } from "./sizes";
import { Group } from "@visx/group";

interface Props {
  data: DataPoint;
  limit?: number;
  xScale: ScaleBand<number>;
  yScale: ScaleLinear<number, number>;
  focused?: boolean;
  onClick?: () => void;
}

export const Bar: React.FC<Props> = ({
  data,
  limit = 2,
  xScale,
  yScale,
  focused = true,
  onClick,
}) => {
  const { height } = graphSizes();

  const isOverLimit = !!limit && (data.value > limit);

  const barWidth = xScale.bandwidth();
  const barHeight = height - (yScale(data.value));
  const barX = xScale(data.date);
  const barY = height - barHeight;

  return (
    <Group opacity={focused ? 1 : 0.3}>
      <VisxBar
        x={barX}
        y={barY}
        width={barWidth}
        height={barHeight}
        fill={isOverLimit ? "var(--red)" : "var(--primary)"}
        rx={12}
        onClick={onClick}
      />
      <VisxBar
        x={barX}
        y={height - yScale(limit)}
        fill={`rgba(var(--white_w), ${isOverLimit ? 0.22 : 0})`}
        height={yScale(limit)}
        width={barWidth}
      />
      <VisxBar
        x={barX}
        y={height - yScale(limit)}
        fill="#fff"
        height={4}
        width={barWidth}
      />
    </Group>
  );
};
