import React from "react";

export interface IconProps {
  size: number;
  color: string;
  weight: number;
  onClick?: () => void;
}

export const defaultProps: IconProps = {
  size: 32,
  color: "currentColor",
  weight: 1.5,
};

export const icon =
  (svg: (props: IconProps) => JSX.Element): React.FC<Partial<IconProps>> =>
  (props) =>
    svg({ ...defaultProps, ...props });

export type IconComponent = React.FC<Partial<IconProps>>;
