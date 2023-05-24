import React, {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";

interface Props extends PropsWithChildren {
  index: number;
  setIndex: Dispatch<SetStateAction<number>>;
  min: number;
  max: number;
}

export const Swipeable: React.FC<Props> = ({
  index,
  setIndex,
  min,
  max,
  ...props
}) => {
  const [direction, setDirection] = useState(0);

  const paginate = (newDirection: number) => {
    if (index + newDirection < min || index + newDirection > max) return;
    console.log("paginate", index, newDirection);
    setIndex(index + newDirection);
    setDirection(newDirection);
  };

  return (
    <AnimatePresence initial={false} custom={direction}>
      <motion.div
        key={index}
        custom={direction}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={1}
        onDragEnd={(_, { offset, velocity }) => {
          const swipe = swipePower(offset.x, velocity.x);

          if (swipe < -swipeConfidenceThreshold) return paginate(1);
          if (swipe > swipeConfidenceThreshold) return paginate(-1);
        }}
        {...props}
      />
    </AnimatePresence>
  );
};

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

