import React, { useState } from "react";
import { Page } from "../../components/Page";
import { BarGraph, BarGauge } from "../../components/graphs";
import { DataPoint } from "../../types";
import { Divider } from "../../components/Divider";

const data: DataPoint[] = [
  { date: 12, value: 2.4 },
  { date: 13, value: 4.2 },
  { date: 14, value: 1.1 },
  { date: 15, value: 0.7 },
  { date: 16, value: 2.8 },
  { date: 17, value: 1.4 },
  { date: 18, value: 2 },
];

export const TotalTime: React.FC = () => {
  const [selected, setSelected] = useState<DataPoint>(
    data.at(-1) || { date: 0, value: 0 }
  );

  return (
    <Page title="사용 시간">
      <BarGraph data={data} selected={selected} onClickData={setSelected} />
      <Divider />
      <BarGauge data={selected} />
    </Page>
  );
};
