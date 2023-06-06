import React, { useEffect, useMemo, useState } from "react";
import { hasData, isDataType, isDataTypeArray, type UsageType } from "~/types";
import { useUsageOf } from "~/utils/hooks/useUsageOf";
import { Page } from "./Page";
import { MonthSelector } from "~/components/blocks/MonthSelector";
import { Swipeable } from "~/components/elements/Swipeable";
import { Divider } from "~/components/elements";
import { MarginInline } from "~/components/elements/MarginInline";
import { BarGraph } from "~/components/graphs/BarGraph";
import { paginate } from "~/utils/paginate";
import { BarSelector } from "~/components/graphs";
import { AnalysisDetails } from "~/components/blocks/AnalysisDetails";

interface Props<T extends UsageType> {
  type: T;
}

const pageNames = {
  totalTime: "Total Usage",
  pickups: "Pickups",
  downTime: "Down Time",
  maxTime: "Continuous Usage",
  avgTime: "Average Usage",
} as const;

export const AnalysisPage = React.memo(
  <T extends UsageType, > ({ type }: Props<T>) => {
    const data = useUsageOf(type);
    const pagination = useMemo(
      () => paginate(data),
      [data]
    );
    const [selectedDate, setSelectedDate] = useState(0);
    const [page, setPage] = useState<0 | 1>(1);

    useEffect(() => {
      const date = pagination
        .at(page)?.filter(({ usageData }) => !!usageData)
        .at(-1)?.date;

      date && setSelectedDate(date);
    }, [pagination, page]);

    const selectedData = useMemo(() => (
      data.find(({ date }) => date === selectedDate)
    ), [selectedDate, data]);

    return (
      <Page title={pageNames[type]}>
        <MonthSelector {...{ page, setPage }}/>
        <Swipeable {...{ page, setPage }}>
          {pagination.map((weekData, index) =>
            isDataTypeArray(
              type, weekData,
              ["totalTime", "pickups", "maxTime", "avgTime"]
            ) ? <BarGraph
              key={index}
              type={type}
              data={weekData}
              limit={200}
              selectedDate={selectedDate}
              onClickDate={setSelectedDate}
            /> : isDataTypeArray(
              type, weekData,
              ["downTime"],
            ) && <BarSelector
              key={index}
              type={type}
              data={weekData}
              limit={200}
              selectedDate={selectedDate}
              onClickDate={setSelectedDate}
            />
          )}
        </Swipeable>
        <Divider/>
        {isDataType(type, selectedData,
            ["totalTime", "pickups", "maxTime", "avgTime"])
          && hasData(selectedData)
          && <AnalysisDetails
            type={type}
            date={selectedDate}
            data={selectedData}
            limit={200}
          />}
      </Page>
    );
  });
