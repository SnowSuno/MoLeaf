import React, {
  type Dispatch,
  type SetStateAction,
  type PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";
import styled from "@emotion/styled";
import { motion, PanInfo, useAnimate, useIsPresent } from "framer-motion";
import { useElementHeight } from "~/state/utils/size";

interface Props extends PropsWithChildren {
  page: 0 | 1;
  setPage: Dispatch<SetStateAction<0 | 1>>;
}

export const Swipeable: React.FC<Props> = React.memo(({
  page,
  setPage,
  ...props
}) => {
  const graphHeight = useElementHeight();
  const isPresent = useIsPresent();

  const [scope, animate] = useAnimate();
  const [variant, setVariant] = useState<
    { x: `-${0 | 50}%` }
  >({ x: "-50%" });

  const navigate = useCallback((page: 0 | 1) => {
    setPage(page);
    setVariant({ x: `-${page * 50 as 0 | 50}%` });
  }, [setPage, setVariant]);

  const onDragEnd = useCallback((_: unknown, { offset, velocity }: PanInfo) => {
    const swipe = swipePower(offset.x, velocity.x);
    navigate(swipe < -threshold ? 1 : swipe > threshold ? 0 : page);
  }, [page, navigate]);

  useEffect(() => { animate("& > div", variant, { damping: 1000 }); },
    [animate, variant]);
  useEffect(() => { navigate(page); }, [page, navigate]);

  return (
    <Container ref={scope} stickyHeight={graphHeight}>
      <Swipe
        drag={isPresent ? "x" : false}
        dragConstraints={scope}
        initial={{ x: "-50%" }}
        onDragEnd={onDragEnd}
        {...props}
      />
    </Container>
  );
});

const Container = styled(motion.div)<{ stickyHeight?: number }>`
  width: 100%;
  position: sticky;
  top: ${({ stickyHeight = 0 }) => 35 - stickyHeight}px;

  z-index: 5;
`;

const Swipe = styled(motion.div)`
  display: flex;
  flex-direction: row;
  width: 200%;

  & > div {
    width: 100%;
  }

  &:before, &:after {
    content: "";
    background: var(--white);
    width: 100%;
    height: 100%;
    position: absolute;
  }

  &:before {
    right: 100%;
  }

  &:after {
    left: 100%;
  }
`;

const threshold = 3000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

