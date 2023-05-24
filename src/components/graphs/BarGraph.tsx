import React from "react";
import { motion } from "framer-motion";

import { MarginInline } from "../elements/MarginInline";
import { BarGroup } from "./BarGroup";
import { BarSelector } from "./BarSelector";

import type { DataPoint } from "../../types";

interface Props {
  data: DataPoint[];
  selectedDate: number;
  onClickDate?: (date: number) => void;
  updateHeight?: (height: number) => void;
}

export const BarGraph: React.FC<Props> = (props) => (
  <motion.div>
    <MarginInline>
      <BarGroup {...props}/>
    </MarginInline>
    <BarSelector {...props}/>
  </motion.div>
);
