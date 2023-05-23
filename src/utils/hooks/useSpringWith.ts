import { useSpring } from "framer-motion";
import { useEffect } from "react";

export const useSpringWith = (x: number) => {
  const springX = useSpring(x, { stiffness: 1000, damping: 100 });

  useEffect(() => {
    springX.set(x);
  }, [x, springX]);

  return springX;
};
