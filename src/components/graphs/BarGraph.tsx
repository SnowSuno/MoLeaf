import React from "react";
import { motion } from "framer-motion";

import { MarginInline } from "../elements/MarginInline";
import { BarGroup } from "./BarGroup";
import { BarSelector } from "./BarSelector";
import { DailyUsage, UsageType } from "~/types";


interface Props {
  type: UsageType;
  data: DailyUsage<"totalTime" | "pickups" | "maxTime" | "avgTime">[];
  limit?: number;
  selectedDate: number;
  onClickDate?: (date: number) => void;
}

export const BarGraph: React.FC<Props> = (props) => (
  <div>
    <MarginInline>
      <BarGroup {...props}/>
    </MarginInline>
    <BarSelector {...props}/>
  </div>
);
