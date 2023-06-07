import React, { useCallback, useMemo } from "react";
import { Bar as VisxBar } from "@visx/shape";

import { DailyUsage, DailyUsageRequired } from "~/types";
import { ScaleBand, ScaleLinear } from "d3-scale";
import { graphSizes } from "./sizes";
import { Group } from "@visx/group";

interface Props {
  data: DailyUsageRequired<"totalTime" | "pickups" | "maxTime" | "avgTime">;
  goal?: number;
  overLimit?: (data: DailyUsage) => boolean;
  xScale: ScaleBand<number>;
  yScale: ScaleLinear<number, number>;
  focused?: boolean;
  onClick?: () => void;
  d: (value: number) => number;
}

export const Bar: React.FC<Props> = ({
  data,
  d,
  goal = 0,
  overLimit,
  xScale,
  yScale,
  focused = true,
  onClick,
}) => {
  const { height } = graphSizes();
  const [dValue, dLimit] = useMemo(
    () => [d(data.usageData.usage), d(goal)] as const,
    [d, data.usageData.usage, goal]
  );

  // const isOverLimit = useMemo(() => (
  //   !!limit && (data.usageData.usage > limit)
  // ), [limit, data.usageData.usage]);
  const isOverLimit = useMemo(() => (
    !!overLimit?.(data)
  ), [overLimit, data]);

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

