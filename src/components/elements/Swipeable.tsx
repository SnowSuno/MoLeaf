import React, {
  type PropsWithChildren,
  useCallback,
  useEffect, useRef,
  useState
} from "react";
import styled from "@emotion/styled";
import { motion, PanInfo, useAnimation } from "framer-motion";

interface Props extends PropsWithChildren {
  onSwipe?: (page: 0 | 1) => void;
  // containerRef: React.RefObject<HTMLDivElement>;
  graphHeight: number;
}

export const Swipeable: React.FC<Props> = ({
  onSwipe,
  graphHeight,
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const animation = useAnimation();
  const [trigger, setTrigger] = React.useState(true);
  const [page, setPage] = useState<0 | 1>(1);

  const navigate = useCallback((page: 0 | 1) => {
    setPage(page);
    onSwipe?.(page);
    setTrigger(t => !t);
  }, [setTrigger, setPage, onSwipe]);

  useEffect(() => {
    animation
      .start({ x: -page * 50 + "%" })
      .catch(console.error);
  }, [animation, page, trigger]);

  const onDragEnd = useCallback((_: unknown, { offset, velocity }: PanInfo) => {
    const swipe = swipePower(offset.x, velocity.x);
    navigate(swipe < -threshold ? 1 : swipe > threshold ? 0 : page);
  }, [navigate, page]);

  return (
    <Container ref={ref} stickyHeight={graphHeight}>
      <Swipe
        drag="x"
        dragConstraints={ref}
        initial={{ x: "-50%" }}
        animate={animation}
        onDragEnd={onDragEnd}
        {...props}
      />
    </Container>
  );
};

const Container = styled(motion.div)<{ stickyHeight: number }>`
  width: 100%;

  //display: contents;
  //position: absolute;
  position: sticky;
  top: ${props => 35 - props.stickyHeight}px;
  //bottom: 100px;
  //top: calc(1200px - 150%);
`;

const Swipe = styled(motion.div)`
  display: flex;
  flex-direction: row;
  width: 200%;

  //position: sticky;
  //top: 0px;

  & > div {
    width: 100%;
  }
`;

const threshold = 3000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

