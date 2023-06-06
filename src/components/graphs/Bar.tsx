import React, { useCallback, useMemo } from "react";
import { Bar as VisxBar } from "@visx/shape";

import { DailyUsageRequired } from "~/types";
import { ScaleBand, ScaleLinear } from "d3-scale";
import { graphSizes } from "./sizes";
import { Group } from "@visx/group";

interface Props {
  data: DailyUsageRequired<"totalTime" | "pickups" | "maxTime" | "avgTime">;
  limit?: number;
  xScale: ScaleBand<number>;
  yScale: ScaleLinear<number, number>;
  focused?: boolean;
  onClick?: () => void;
  d: (value: number) => number;
}

export const Bar: React.FC<Props> = ({
  data,
  d,
  limit = 0,
  xScale,
  yScale,
  focused = true,
  onClick,
}) => {
  const { height } = graphSizes();
  const [dValue, dLimit] = useMemo(
    () => [d(data.usageData.usage), d(limit)] as const,
    [d, data.usageData.usage, limit]
  );

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
        {...x} {...value(dValue)}
        fill={isOverLimit ? "var(--red)" : "var(--primary)"}
        rx={12}
        onClick={onClick}
      />
      {isOverLimit && <>
        <VisxBar
          {...x} {...value(dLimit)}
          fill={`rgba(var(--white_w), ${isOverLimit ? 0.22 : 0})`}
        />
        <VisxBar
          {...x}
          y={yScale(dLimit)}
          height={4}
          fill="var(--white)"
        />
      </>}
    </Group>
  );
};

