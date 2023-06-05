import React, { useCallback, useMemo } from "react";
import { Bar as VisxBar } from "@visx/shape";

import { DailyUsageRequired } from "~/types";
import { ScaleBand, ScaleLinear } from "d3-scale";
import { graphSizes } from "./sizes";
import { Group } from "@visx/group";

interface Props {
  data: DailyUsageRequired<"totalTime" | "pickups" | "maxTime" | "avgTime">;
  limit: number;
  xScale: ScaleBand<number>;
  yScale: ScaleLinear<number, number>;
  focused?: boolean;
  onClick?: () => void;
}

export const Bar: React.FC<Props> = ({
  data,
  limit,
  xScale,
  yScale,
  focused = true,
  onClick,
}) => {
  const { height } = graphSizes();

  const isOverLimit = useMemo(() => (
    !!limit && (data.usageData.usage > limit)
  ), [limit, data.usageData.usage]);

  const x = useMemo(() => ({
    x: xScale(data.date),
    width: xScale.bandwidth(),
  }), [xScale, data.date]);

  const value = useCallback((value: number) => ({
    y: yScale(value),
    height: height - yScale(value),
  }), [yScale, height]);

  return (
    <Group opacity={focused ? 1 : 0.3}>
      <VisxBar
        {...x} {...value(data.usageData.usage)}
        fill={isOverLimit ? "var(--red)" : "var(--primary)"}
        rx={12}
        onClick={onClick}
      />
      {isOverLimit && <>
        <VisxBar
          {...x} {...value(limit)}
          fill={`rgba(var(--white_w), ${isOverLimit ? 0.22 : 0})`}
        />
        <VisxBar
          {...x}
          y={yScale(limit)}
          height={4}
          fill="var(--white)"
        />
      </>}
    </Group>
  );
};

