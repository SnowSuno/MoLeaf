import React from "react";
import { Text } from "~/components/elements/Text";

import { DailyUsageRequired } from "~/types";
import styled from "@emotion/styled";

interface Props {
  data: DailyUsageRequired<"totalTime" | "maxTime" | "avgTime">;
}

export const AppUsage: React.FC<Props> = ({ data }) => {

  return (
    <div>
      <Text>앱별 사용량</Text>
      <Container>
        {data.usageData.details.map(({ appName, usage }) =>
          <div key={appName}>{appName}: {usage}</div>
        )}
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
