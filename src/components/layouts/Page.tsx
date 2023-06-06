import React, { type PropsWithChildren } from "react";
import { motion } from "framer-motion";
import styled from "@emotion/styled";
import { ChevronLeft } from "~/assets/icons";
import { UnstyledLink } from "../elements";

interface Props extends PropsWithChildren {
  title: string;
  background?: boolean;
  // innerRef?: React.Ref<HTMLDivElement>;
}

export const Page: React.FC<Props> = ({
  title,
  background,
  children
  // ...props
}) => (
  <Container
    initial={{ left: "100%" }}
    animate={{ left: 0 }}
    exit={{ left: "100%" }}
    background={background}
  >
    <Header>
      <UnstyledLink to=".." replace>
        <ChevronLeft size={32} color="var(--dark-text)"/>
      </UnstyledLink>
      <h2>{title}</h2>
    </Header>
    <Upper title={title}/>
    <Main>{children}</Main>
  </Container>
);

const Upper: React.FC<{ title: string }> = React.memo(({ title }) => (
  <Header>
    <UnstyledLink to=".." replace>
      <ChevronLeft size={32} color="var(--dark-text)"/>
    </UnstyledLink>
    <h2>{title}</h2>
  </Header>
));

const Container = styled(motion.div)<{ background?: boolean }>`
  position: absolute;
  z-index: 100;
  width: 100%;
  height: 100%;
  background-color: ${props => props.background ?
          "var(--background-color)" :
          "var(--white)"};
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

  & > h2 {
    color: var(--dark-text);
    font-weight: 500;
    font-size: 20px;
  }
`;

const Main = styled.main`
  margin-top: 60px;
  padding-bottom: 100px;
  overflow-y: scroll;
  overflow-x: hidden;
  height: calc(100% - 60px);

  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;
