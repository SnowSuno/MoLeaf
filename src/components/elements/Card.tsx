import React, { type PropsWithChildren } from "react";
import styled from "@emotion/styled";

interface Props extends PropsWithChildren {
  full?: boolean;
  selected?: boolean;
}

export const Card: React.FC<Props> = ({
  full = true,
  selected = false,
  children,
}) => {
  const styles = { display: "block", minWidth: "0", borderLeft: "none" };
  if (!full) {
    styles.display = "inline-block";
    styles.minWidth = "200px";
  }
  if (selected) {
    styles.borderLeft = "solid 8px var(--primary)";
  }

  return <Container style={styles}>{children}</Container>;
};

const Container = styled.div`
  background-color: var(--white);
  border-radius: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;
