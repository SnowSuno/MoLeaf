import React from "react";
import { DailyUsageRequired, isDataType, UsageType } from "~/types";
import { Usage } from "~/components/blocks/Usage";
import { AppUsage } from "~/components/blocks/AppUsage";
import styled from "@emotion/styled";

interface Props {
  type: Exclude<UsageType, "downTime">;
  date: number;
  data: DailyUsageRequired<UsageType>;
}

export const AnalysisDetails: React.FC<Props> = React.memo(({
  type,
  date,
  data,
}) => {
  return (
    <Container>
      <Usage
        type={type}
        date={date}
        value={(data.usageData as { usage: number }).usage}
      />

      {isDataType(type, data, ["totalTime", "maxTime", "avgTime"]) &&
        <AppUsage data={data}/>
      }

      <Settings>Goal Settings</Settings>
    </Container>
  );
});

const Container = styled.div`
  padding-inline: var(--margin-inline);

  display: flex;
  flex-direction: column;

  gap: 10px;
`;

const Settings = styled.div`
  border-radius: 12px;
  background: var(--background-color);
  padding: 16px 20px;
`;
