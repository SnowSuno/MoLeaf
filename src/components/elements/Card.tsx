import styled from "@emotion/styled";
import { motion } from "framer-motion";

interface Props {
  width?: number | string | boolean;
  height?: number | string | boolean;
  selected?: boolean;
  onClick?: () => void;
}


export const Card = styled(motion.div)<Props>`
  display: flex;
  width: ${(props) => `${props.width}px` || "100%"};
  border-left: ${(props) => (props.selected ? "solid 8px var(--primary)" : "")};
  
  background-color: var(--white);
  border-radius: 20px;
  padding: 20px;
  flex-direction: column;
`;
