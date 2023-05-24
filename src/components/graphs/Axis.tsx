import React from "react";
import { Axis as VisxAxis } from "@visx/axis";
import { ScaleLinear } from "d3-scale";

interface Props {
  scale: ScaleLinear<number, number>;
  orientation: "left" | "right" | "top" | "bottom";
  top?: number;
  left?: number;
}

export const Axis: React.FC<Props> = (props) => (
  <VisxAxis
    hideAxisLine={true}
    hideTicks={true}
    left={0}
    numTicks={2}
    tickLength={0}
    tickLabelProps={{
      fill: "var(--gray)",
      fontFamily: "var(--text-font)",
      fontSize: 14,
    }}
    tickFormat={tickValue => `${tickValue}h`}
    {...props}
  />
);
