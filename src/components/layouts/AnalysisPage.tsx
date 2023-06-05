import React, { useEffect, useMemo, useState } from "react";
import { DailyUsage, UsageType } from "~/types";
import { useUsageOf } from "~/utils/hooks/useUsageOf";
import { Page } from "./Page";
import { MonthSelector } from "~/components/MonthSelector";
import { Swipeable } from "~/components/elements/Swipeable";
import { Divider } from "~/components/elements";
import { MarginInline } from "~/components/elements/MarginInline";
import { BarGraph } from "~/components/graphs/BarGraph";
import { paginate } from "~/utils/paginate";

interface Props {
  type: UsageType;
}

const pageNames = {
  totalTime: "Total Usage",
  pickups: "Pickups",
  downTime: "Down Time",
  maxTime: "Continuous Usage",
  avgTime: "Average Usage",
} as const;

export const AnalysisPage: React.FC<Props> = React.memo(({ type }) => {
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

  return (
    <Page title={pageNames[type]}>
      <MonthSelector {...{page, setPage}}/>
      <Swipeable {...{page, setPage}}>
        {type === "downTime"
          ? null
          : pagination.map((weekData, index) =>
            <BarGraph
              key={index}
              data={weekData as DailyUsage<"totalTime" | "pickups" | "maxTime" | "avgTime">[]}
              limit={200}
              selectedDate={selectedDate}
              onClickDate={setSelectedDate}
            />
          )}
      </Swipeable>
      <Divider/>
      <MarginInline>

      </MarginInline>
    </Page>
  );
});
