import React from "react";
import { Page } from "../../components/Page";
import { BarGraph } from "../../components/BarGraph";

export const TotalUsage: React.FC = () => {
  return (
    <Page title="사용 시간">
      <BarGraph />
    </Page>
  );
};
