import React, { useMemo } from "react";
import { Group } from "@visx/group";
import { scaleBand } from "@visx/scale";
import { ScaleSVG } from "@visx/responsive";

import styled from "@emotion/styled";
import { graphSizes } from "./sizes";
import { DailyUsage, UsageType } from "~/types";
import { Date } from "~/components/graphs/Date";
import { isOverLimit } from "~/utils/limit";

interface Props {
  type: UsageType;
  data: DailyUsage[];
  limit?: number;
  selectedDate: number;
  onClickDate?: (date: number) => void;
}

export const BarSelector: React.FC<Props> = ({
  type,
  data,
  limit,
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
          {data.map(dataPoint =>
            <Date
              key={dataPoint.date}
              dataPoint={dataPoint}
              xScale={xScale}
              selectedDate={selectedDate}
              isOverLimit={isOverLimit(type, dataPoint, limit)}
              disabled={!dataPoint.usageData}
              onClickDate={onClickDate}
            />
          )}
        </Group>
      </ScaleSVG>
    </Container>
  );
};

const Container = styled.div`
  z-index: 10;
  background-color: var(--white);
  padding: 3px var(--margin-inline) 0;
`;
