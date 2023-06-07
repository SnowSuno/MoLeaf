import React from "react";
import { Text } from "~/components/elements/Text";

import { DailyUsageRequired } from "~/types";
import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";
import { FormatValue } from "~/utils/format";

interface Props {
  data: DailyUsageRequired<"totalTime" | "maxTime" | "avgTime">;
}

export const AppUsage: React.FC<Props> = ({ data }) => {
  const { t } = useTranslation();

  const max = data.usageData.details[0].usage;

  return (
    <div>
      <Text>{t(`common.appUsage`)}</Text>
      <Container>
        {data.usageData.details.map(({ appName, usage }) => (
          <Usage key={appName} width={(usage + 1) * 90 / (max + 1)}>
            {appName || "Unknown"}
            <p>
              <div/>
              <span>{FormatValue(usage, "totalTime")}</span>
            </p>
          </Usage>
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
  }

  & div {
    width: ${props => props.width}%;
    height: 8px;
    background: var(--gray);
    border-radius: 12px;
  }
`;
