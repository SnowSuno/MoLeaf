import React from "react";

interface Props {
  size: number;
  color: string;
  weight: number;
}

const defaultProps: Props = {
  size: 32,
  color: "currentColor",
  weight: 1.5,
};

export const icon = (svg: (props: Props) => JSX.Element): React.FC<Partial<Props>> =>
  (props) => svg(
    { ...defaultProps, ...props },
  );
