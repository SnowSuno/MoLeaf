import styled from "@emotion/styled";
import { motion } from "framer-motion";

interface Props {
  full?: boolean;
  selected?: boolean;
}


export const Card = styled(motion.div)<Props>`
  display: flex;
  width: ${(props) => props.full ? "100%" : "160px"};
  border-left: ${(props) => (props.selected ? "solid 8px var(--primary)" : "")};
  
  background-color: var(--white);
  border-radius: 20px;
  padding: 20px;
  flex-direction: column;
`;
