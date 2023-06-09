import React, { useEffect, useMemo, useState } from "react";
import { hasData, isDataType, isDataTypeArray, type UsageType } from "~/types";
import { useUsageOf } from "~/utils/hooks/useUsageOf";
import { Page } from "./Page";
import { MonthSelector } from "~/components/blocks/MonthSelector";
import { Swipeable } from "~/components/elements/Swipeable";
import { Divider } from "~/components/elements";
import { BarGraph } from "~/components/graphs/BarGraph";
import { paginate } from "~/utils/paginate";
import { BarSelector } from "~/components/graphs";
import { AnalysisDetails } from "~/components/blocks/AnalysisDetails";
import { useTranslation } from "react-i18next";
import { DowntimeGraph } from "~/components/graphs/DowntimeGraph";
import { useLimitOf } from "~/utils/hooks/useLimitOf";

interface Props<T extends UsageType> {
  type: T;
}

export const AnalysisPage = React.memo(
  <T extends UsageType>({ type }: Props<T>) => {
    const { t } = useTranslation();

    const data = useUsageOf(type);
    const pagination = useMemo(() => paginate(data), [data]);
    const [selectedDate, setSelectedDate] = useState(0);
    const [page, setPage] = useState<0 | 1>(1);

    useEffect(() => {
      const date = pagination
        .at(page)
        ?.filter(({ usageData }) => !!usageData)
        .at(-1)?.date;

      date && setSelectedDate(date);
    }, [pagination, page]);

    const selectedData = useMemo(
      () => data.find(({ date }) => date === selectedDate),
      [selectedDate, data]
    );

    const { goal, overLimit } = useLimitOf(type);

    return (
      <Page title={t(`usage.${type}.long`)}>
        <MonthSelector {...{ page, setPage }} />
        <Swipeable page={page}>
          {pagination.map(
            (weekData, index) =>
              isDataTypeArray(type, weekData, [
                "totalTime",
                "pickups",
                "maxTime",
                "avgTime",
              ]) && (
                <BarGraph
                  key={index}
                  type={type as Exclude<UsageType, "downTime">}
                  data={weekData}
                  selectedDate={selectedDate}
                  onClickDate={setSelectedDate}
                />
              )
          )}
        </Swipeable>
        <Swipeable page={page} sticky>
          {pagination.map((weekData, index) => (
            <BarSelector
              key={index}
              data={weekData}
              overLimit={overLimit}
              selectedDate={selectedDate}
              onClickDate={setSelectedDate}
            />
          ))}
        </Swipeable>
        {isDataType(type, selectedData, ["downTime"]) &&
          hasData(selectedData) && <DowntimeGraph data={selectedData} />}
        <Divider />
        {selectedData && hasData(selectedData) && (
          <AnalysisDetails
            type={type as UsageType}
            date={selectedDate}
            data={selectedData}
            goal={goal}
          />
        )}
      </Page>
    );
  }
);
