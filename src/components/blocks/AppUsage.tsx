import React from "react";
import { Text } from "~/components/elements/Text";

import { DailyUsageRequired, UsageType, isDataType } from "~/types";
import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";
import { FormatValue } from "~/utils/format";
import { DowntimeGraph } from "../graphs/DowntimeGraph";
import { useLimitOf } from "~/utils/hooks/useLimitOf";

interface Props {
  type: Exclude<UsageType, "pickups">;
  data: DailyUsageRequired<Exclude<UsageType, "pickups">>;
}

export const AppUsage: React.FC<Props> = ({ type, data }) => {
  const { t } = useTranslation();
  const { goal, overLimit } = useLimitOf(type);

  // const max = data.usageData.details[0].usage;
  console.log(data, goal, overLimit);

  const timeInRange = (time: number, goals: [number, number][]) => {
    return goals.filter((x) => x[0] <= time && time <= x[1]).length !== 0;
  };

  return (
    <div>
      <Text>{t(`common.appUsage`)}</Text>
      <Container>
        {isDataType(type, data, ["totalTime", "maxTime", "avgTime"]) &&
          data.usageData.details.map(({ appName, usage }) => (
            <Usage
              key={appName}
              width={((usage + 1) * 90) / (data.usageData.details[0].usage + 1)}
            >
              {appName || "Unknown"}
              <p>
                <div />
                <span>{FormatValue(usage, "totalTime")}</span>
              </p>
            </Usage>
          ))}
        {isDataType(type, data, ["downTime"]) &&
          data.usageData.details.map(({ appName, usage }) => (
            <>
              <Usage key={appName} width={100}>
                {appName || "Unknown"}
                <DotContainer>
                  {Array(24)
                    .fill(null)
                    .map((_, index) => {
                      const color = usage.includes(index)
                        ? timeInRange(index, goal as [number, number][])
                          ? "var(--red)"
                          : "var(--primary)"
                        : "var(--light-gray)";
                      return <Dot color={color} />;
                    })}
                </DotContainer>
              </Usage>
            </>
          ))}
      </Container>
    </div>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1px;

  border-radius: 12px;
  background: var(--light-gray);

  overflow: hidden;
`;

const Usage = styled.div<{ width: number }>`
  background: var(--background-color);
  padding: 16px 20px;

  & > p {
    display: flex;
    flex-direction: row;
    align-items: center;

    color: var(--gray);
    font-size: 14px;
    gap: 6px;
    height: 20px;
  }

  & div {
    width: ${(props) => props.width}%;
    height: 8px;
    background: var(--gray);
    border-radius: 12px;
  }
`;

const DotContainer = styled.span`
  display: flex;
  flex-direction: row;
  gap: 1px;
  align-items: center;
  justify-content: space-between;
  height: 20px;
`;

const Dot = styled.span<{ color?: string }>`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background: ${(props) => props.color};
`;
