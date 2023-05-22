import React, { type PropsWithChildren } from "react";
import { motion } from "framer-motion";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "../../assets/icons";

interface Props extends PropsWithChildren {
  title: string;
  background?: boolean;
}

export const Page: React.FC<Props> = ({ title, background, ...props }) => {
  const navigate = useNavigate();

  return (
    <Container
      initial={{ left: "100%" }}
      animate={{ left: 0 }}
      exit={{ left: "100%" }}
      background={background}
    >
      <Header>
        <button onClick={() => navigate("..", { replace: true })}>
          <ChevronLeft size={32} color="var(--dark-text)"/>
        </button>
        <h2>{title}</h2>
      </Header>
      <Main {...props} />
    </Container>
  );
};

const Container = styled(motion.div)<{background?: boolean}>`
  position: absolute;
  z-index: 100;
  width: 100%;
  height: 100%;
  background-color: ${props => props.background ? "var(--background-color)" : "var(--white)"};
  top: 0;
  bottom: 0;
`;

const Header = styled.header`
  position: absolute;
  top: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 60px;
  padding-inline: 10px;
  gap: 10px;

  & > button {
  }

  & > h2 {
    color: var(--dark-text);
    font-weight: 500;
    font-size: 20px;
  }
`;

const Main = styled.main`
  margin-top: 60px;
  //height: 200vh;
  overflow-y: scroll;
  height: calc(100% - 60px);
`;
