import React from "react";
import { Text } from "~/components/elements/Text";

import { DailyUsageRequired } from "~/types";
import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";

interface Props {
  data: DailyUsageRequired<"totalTime" | "maxTime" | "avgTime">;
}

export const AppUsage: React.FC<Props> = ({ data }) => {
  const { t } = useTranslation();

  return (
    <div>
      <Text>{t(`common.appUsage`)}</Text>
      <Container>
        {data.usageData.details.map(({ appName, usage }) => (
          <div key={appName}>
            {appName}: {usage}
          </div>
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

  & > div {
    background: var(--background-color);
    padding: 10px;
  }
`;
