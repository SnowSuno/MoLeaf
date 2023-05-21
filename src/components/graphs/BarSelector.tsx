import React, { useMemo } from "react";
import { Group } from "@visx/group";
import { scaleBand } from "@visx/scale";
import { ScaleSVG } from "@visx/responsive";
import type { DataPoint } from "../../types";

import { spacing } from "./constants";
import styled from "@emotion/styled";

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

export const BarSelector: React.FC<Props> = ({
  data,
  selected,
  onClickData,
}) => {
  // bounds
  const xMax = spacing.width - 2 * spacing.marginInline;

  // scales, memoize for performance
  const xScale = useMemo(() =>
    scaleBand<number>({
      range: [0, xMax],
      round: true,
      domain: data.map(data => data.date),
      padding: 0.3,
    }), [xMax, data]);

  return (
    <Container>
      <ScaleSVG width={spacing.width} height={spacing.scaleHeight}>
        <Group left={spacing.marginInline}>
          {data.map(dataPoint => {
            const barWidth = xScale.bandwidth();
            const barX = xScale(dataPoint.date);
            if (!barX) return null;

            const isSelected = dataPoint.date === selected.date;

            const padding = 2;

            return (
              <g>
                <rect
                  key={dataPoint.date}
                  x={barX - padding}
                  y={0}
                  width={barWidth + padding * 2}
                  height={barWidth + padding * 2}
                  fill="#50AA8D"
                  opacity={isSelected ? 1 : 0.3}
                  rx={12}
                  onClick={() => onClickData?.(dataPoint)}
                />
                <text
                  x={barX + barWidth / 2}
                  y={23}
                  fontSize={14}
                  textAnchor="middle"
                  fill={"var(--white)"}
                >{dataPoint.date}</text>
              </g>
            );
          })}
        </Group>
      </ScaleSVG>
    </Container>
  );
};

const Container = styled.div`
  position: sticky;
  top: 40px;
  z-index: 10;
  background-color: var(--white);
`;
