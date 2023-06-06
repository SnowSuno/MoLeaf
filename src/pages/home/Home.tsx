import React, { useRef } from "react";
import { AnimatedOutlet } from "~/components/layouts/AnimatedOutlet";
import { Link } from "react-router-dom";
import { Header } from "~/components/layouts/Header";
import styled from "@emotion/styled";
import { Button, Widget } from "~/components/elements";
import { Settings } from "~/assets/icons";
import { motion } from "framer-motion";
import { useWidgets } from "~/utils/hooks/useWidgets";


export const Home: React.FC = React.memo(() => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { main, widgets } = useWidgets();

  return (
    <div>
      <AnimatedOutlet />
      <Container>
        <Header title="Overview" />

        <Widget main type={main}/>

        <WidgetContainer ref={containerRef}>
          <WidgetScroller
            drag="x"
            dragConstraints={containerRef}
          >
            {widgets.map(type => <Widget key={type} type={type}/>)}
          </WidgetScroller>
        </WidgetContainer>

        <div style={{ margin: "0 auto" }}>
          <Link to="/customize" style={{ textDecoration: "none" }}>
            <Button icon={Settings} text="홈 화면 수정하기" />
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

const WidgetContainer = styled.div`
  padding-bottom: 14px;
  overflow: visible;
  width: 100%;
`;

const WidgetScroller = styled(motion.div)`
  display: flex;
  flex-direction: row;
  gap: 16px;
  width: min-content;
  height: 154px;
  align-items: stretch;
`;
