import React, { useRef } from "react";
import { AnimatedOutlet } from "~/components/layouts/AnimatedOutlet";
import { Link } from "react-router-dom";
import { Header } from "~/components/layouts/Header";
import styled from "@emotion/styled";
import { Button, Widget } from "~/components/elements";
import { Settings } from "~/assets/icons";
import { motion } from "framer-motion";
import { useWidgets } from "~/utils/hooks/useWidgets";
import { useTranslation } from "react-i18next";

export const Home: React.FC = React.memo(() => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { main, widgets } = useWidgets();
  const { t } = useTranslation();

  return (
    <div>
      <AnimatedOutlet/>
      <Container>
        <Header title="Overview"/>

        <Widget main type={main}/>

        <Scroll>
          {widgets.map((type) => (
            <Widget key={type} type={type}/>
          ))}
        </Scroll>

        <div style={{ margin: "0 auto" }}>
          <Link to="/customize" style={{ textDecoration: "none" }}>
            <Button icon={Settings} text={t(`home.edit`)}/>
          </Link>
        </div>
      </Container>
    </div>
  );
});

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 24px;
`;

const Scroll = styled.div`
  overflow: visible;
  width: calc(100% + 48px);

  display: flex;
  flex-direction: row;
  gap: 16px;
  height: 154px;

  align-items: stretch;
  overflow-x: scroll;

  margin-inline: -24px;
  padding-inline: 24px;
  //overflow: visible;

  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
`;

