import React, { useState } from "react";
import { Page } from "../../components/layouts/Page";
import { BarGraph, BarGauge, BarSelector } from "../../components/graphs";
import { DataPoint } from "../../types";
import { Divider } from "../../components/elements";
import { UsageText } from "../../components/UsageText";
import { MonthSelector } from "../../components/MonthSelector";

const data: DataPoint[] = [
  { date: 12, value: 2.4 },
  { date: 13, value: 4.2 },
  { date: 14, value: 1.1 },
  { date: 15, value: 0.7 },
  { date: 16, value: 2.8 },
  { date: 17, value: 1.4 },
  { date: 18, value: 2.6 },
];

export const TotalUsage: React.FC = () => {
  const [selected, setSelected] = useState<DataPoint>(
    data.at(-1) || { date: 0, value: 0 }
  );

  return (
    <Page title="사용 시간">
      <MonthSelector />
      <BarGraph data={data} selected={selected} onClickData={setSelected} />
      <BarSelector data={data} selected={selected} onClickData={setSelected} />
      <Divider />
      <UsageText />
      <BarGauge data={selected} limit={4} />
      <div style={{ height: "200vh" }}></div>
    </Page>
  );
};
