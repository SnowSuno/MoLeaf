import React, { useMemo } from "react";
import { Group } from "@visx/group";
import { scaleBand } from "@visx/scale";
import { ScaleSVG } from "@visx/responsive";
import type { DataPoint } from "../../types";

import styled from "@emotion/styled";
import { graphSizes } from "./sizes";

// accessors

interface Props {
  data: DataPoint[];
  selectedDate: number;
  onClickDate?: (date: number) => void;
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
  selectedDate,
  onClickDate,
}) => {
  const { width, dateHeight } = graphSizes();

  const xScale = useMemo(() =>
    scaleBand<number>({
      range: [0, width],
      round: true,
      domain: data.map(data => data.date),
      padding: 0.3,
    }), [width, data]);

  return (
    <Container>
      <ScaleSVG width={width} height={dateHeight}>
        <Group>
          {data.map(dataPoint => {
            const barWidth = xScale.bandwidth();
            const barX = xScale(dataPoint.date);
            if (!barX) return null;

            const isSelected = dataPoint.date === selectedDate;

            const padding = 2;

            return (
              <g key={dataPoint.date}>
                <rect
                  key={dataPoint.date}
                  x={barX - padding}
                  y={0}
                  width={barWidth + padding * 2}
                  height={barWidth + padding * 2}
                  fill="#50AA8D"
                  opacity={isSelected ? 1 : 0.3}
                  rx={12}
                  onClick={() => onClickDate?.(dataPoint.date)}
                />
                <text
                  x={barX + barWidth / 2}
                  y={26}
                  fontSize={16}
                  textAnchor="middle"
                  fill={"var(--white)"}
                  onClick={() => onClickDate?.(dataPoint.date)}
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
  //position: sticky;
  //top: 40px;
  z-index: 10;
  background-color: var(--white);
  padding: 3px var(--margin-inline) 0;

  & rect, text {
    cursor: pointer;
  }
`;
