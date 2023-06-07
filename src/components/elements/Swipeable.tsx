import React, { type PropsWithChildren } from "react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";

interface Props extends PropsWithChildren {
  page: 0 | 1;
  sticky?: boolean;
}

export const Swipeable: React.FC<Props> = React.memo(({
  page,
  sticky,
  ...props
}) => {


  return (
    <Container sticky={sticky}>
      <Swipe
        initial={{ x: "-50%" }}
        animate={{ x: `-${page * 50}%` }}
        {...props}
      />
    </Container>
  );
});

const Container = styled(motion.div)<{ sticky?: boolean }>`
  width: 100%;

  ${props => props.sticky && `
  position: sticky;
  top: 40px;
  `}

  z-index: 5;
`;

const Swipe = styled(motion.div)`
  display: flex;
  flex-direction: row;
  width: 200%;

  & > div {
    width: 100%;
  }
`;
