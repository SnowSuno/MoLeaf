import React from "react";
import type { DailyUsage } from "~/types";
import type { ScaleBand } from "d3-scale";
import styled from "@emotion/styled";

interface Props {
  dataPoint: DailyUsage<"totalTime" | "pickups" | "maxTime" | "avgTime">;
  xScale: ScaleBand<number>;
  selectedDate: number;
  limit?: number;
  onClickDate?: (date: number) => void;
}

export const Date: React.FC<Props> = React.memo(({
  dataPoint,
  xScale,
  selectedDate,
  limit,
  onClickDate
}) => {
  const barWidth = xScale.bandwidth();
  const barX = xScale(dataPoint.date);
  if (!barX) return null;

  const isSelected = dataPoint.date === selectedDate;
  const isOverLimit = !!limit
    && dataPoint.usageData?.usage
    && (dataPoint.usageData?.usage > limit);
  const padding = 2;
  const disabled = !dataPoint.usageData?.usage;
  const onClick = () => disabled || onClickDate?.(dataPoint.date);

  return (
    <Container disabled={disabled}>
      <rect
        x={barX - padding}
        y={0}
        width={barWidth + padding * 2}
        height={barWidth + padding * 2}
        fill={disabled
          ? "var(--white)"
          : isOverLimit ? "var(--red)" : "var(--primary)"}
        opacity={isSelected ? 1 : 0.3}
        rx={12}
        onClick={onClick}
      />
      <text
        x={barX + barWidth / 2}
        y={26}
        fontSize={16}
        textAnchor="middle"
        fill={disabled ? "var(--gray)" : "var(--white)"}
        onClick={onClick}
      >{dataPoint.date}</text>
    </Container>
  );
});

const Container = styled.g<{ disabled: boolean }>`
  ${props => props.disabled || `& rect, text {
    cursor: pointer;
  }`}
`;
