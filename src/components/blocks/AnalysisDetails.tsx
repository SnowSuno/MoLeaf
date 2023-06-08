import React from "react";
import { DailyUsageRequired, isDataType, UsageType } from "~/types";
import { Usage } from "~/components/blocks/Usage";
import { AppUsage } from "~/components/blocks/AppUsage";
import styled from "@emotion/styled";

interface Props {
  type: UsageType;
  date: number;
  data: DailyUsageRequired<UsageType>;
  goal: number | [number, number][] | undefined;
}

export const AnalysisDetails: React.FC<Props> = React.memo(
  ({ type, date, data, goal }) => {
    return (
      <Container>
        <Usage
          type={type}
          date={date}
          value={(data.usageData as { usage: number }).usage}
        />

        {isDataType(type, data, [
          "totalTime",
          "maxTime",
          "avgTime",
          "downTime",
        ]) && (
          <AppUsage
            type={type as Exclude<UsageType, "pickups">}
            data={data}
            goal={goal}
          />
        )}

        <Settings>Goal Settings</Settings>
      </Container>
    );
  }
);

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
