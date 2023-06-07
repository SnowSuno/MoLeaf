import React from "react";

import { MarginInline } from "../elements/MarginInline";
import { BarGroup } from "./BarGroup";
import { BarSelector } from "./BarSelector";
import { DailyUsage, UsageType } from "~/types";
import { useLimitOf } from "~/utils/hooks/useLimitOf";


interface Props {
  type: Exclude<UsageType, "downTime">;
  data: DailyUsage<Exclude<UsageType, "downTime">>[];
  selectedDate: number;
  onClickDate?: (date: number) => void;
}

export const BarGraph: React.FC<Props> = ({type, ...props}) => {
  const limit = useLimitOf(type);

  return <div>
    <MarginInline>
      <BarGroup type={type} limit={limit} {...props}/>
    </MarginInline>
    {/*<BarSelector type={type} limit={limit} {...props}/>*/}
  </div>
};
