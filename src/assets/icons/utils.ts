import React from "react";

interface Props {
  size?: number;
  color?: string;
}

export const icon = (svg: JSX.Element): React.FC<Props> => ({
  size,
  color = "currentColor",
}) => React.cloneElement(svg, {
  width: size,
  height: size,
  color,
});
