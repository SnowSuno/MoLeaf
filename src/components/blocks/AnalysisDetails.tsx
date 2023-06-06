import React from "react";
import { MarginInline } from "~/components/elements/MarginInline";
import { DailyUsageRequired, isDataType, UsageType } from "~/types";
import { Usage } from "~/components/blocks/Usage";
import { BarGauge } from "~/components/graphs";
import { AppUsage } from "~/components/blocks/AppUsage";
import styled from "@emotion/styled";

interface Props {
  type: UsageType;
  date: number;
  data: DailyUsageRequired<"totalTime" | "pickups" | "maxTime" | "avgTime">;
  limit?: number;
}

export const AnalysisDetails: React.FC<Props> = React.memo(({
  type,
  date,
  data,
  limit,
}) => {

  return (
    <Container>
      <Usage
        type={type}
        date={date}
        value={data.usageData.usage}
        limit={limit}
      />

      {isDataType(type, data, ["totalTime", "maxTime", "avgTime"]) &&
        <AppUsage data={data}/>
      }
    </Container>
  );
});

const Container = styled.div`
  padding-inline: var(--margin-inline);
  
  display: flex;
  flex-direction: column;
  
  gap: 10px;
`;
