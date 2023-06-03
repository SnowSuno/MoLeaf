import React, {
  useMemo,
  useState,
} from "react";

import { Page } from "../../components/layouts/Page";
import { BarGauge } from "../../components/graphs";
import { DataPoint } from "../../types";
import { Divider } from "../../components/elements";
import { UsageText } from "../../components/UsageText";
import { MonthSelector } from "../../components/MonthSelector";
import { MarginInline } from "../../components/elements/MarginInline";
import { BarGraph } from "../../components/graphs/BarGraph";
import { Swipeable } from "../../components/elements/Swipeable";

const data: DataPoint[][] = [
  [
    { date: 5, value: 2.4 },
    { date: 6, value: 4.2 },
    { date: 7, value: 1.1 },
    { date: 8, value: 0.7 },
    { date: 9, value: 2.8 },
    { date: 10, value: 1.4 },
    { date: 11, value: 2.6 },
  ],
  [
    { date: 12, value: 2.4 },
    { date: 13, value: 4.2 },
    { date: 14, value: 1.1 },
    { date: 15, value: 0.7 },
    { date: 16, value: 2.8 },
    { date: 17, value: 1.4 },
    { date: 18, value: 2.6 },
  ],
];

const timeLimit = 2;

export const TotalUsage: React.FC = () => {
  const [graphHeight, setGraphHeight] = useState<number>(0);

  const [selectedDate, setSelectedDate] = useState<number>(
    data.flat().at(-1)?.date || 0,
  );

  const selectedValue = useMemo(
    () => data
      .flat()
      .filter(d => d.date === selectedDate)
      .at(0)
      ?.value || 0,
    [selectedDate],
  );

  return (
    <Page title="사용 시간">
      <MonthSelector/>
      <Swipeable graphHeight={graphHeight}>
        {data.map((weekData, index) => <BarGraph
          key={index}
          data={weekData}
          selectedDate={selectedDate}
          onClickDate={setSelectedDate}
          updateHeight={setGraphHeight}
        />)}
      </Swipeable>
      <Divider/>
      <MarginInline>
        <UsageText date={selectedDate} value={selectedValue}/>
        <BarGauge value={selectedValue} limit={timeLimit}/>
      </MarginInline>
      <div style={{ height: "200vh" }}></div>
    </Page>
  );
};

