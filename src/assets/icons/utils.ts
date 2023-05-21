import React from "react";

export interface IconProps {
  size: number;
  color: string;
  weight: number;
}

export const defaultProps: IconProps = {
  size: 24,
  color: "currentColor",
  weight: 1.5,
};

export const icon =
  (svg: (props: IconProps) => JSX.Element): React.FC<Partial<IconProps>> =>
  (props) =>
    svg({ ...defaultProps, ...props });

export type IconComponent = React.FC<Partial<IconProps>>;
