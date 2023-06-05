import React from "react";
import { AnimatePresence, AnimatePresenceProps } from "framer-motion";
import { useOutlet } from "react-router-dom";

export const AnimatedOutlet: React.FC<AnimatePresenceProps> = React.memo((props) => {
    const outlet = useOutlet();
    return <AnimatePresence {...props}>{outlet}</AnimatePresence>;
});
