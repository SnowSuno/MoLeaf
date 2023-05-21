import React from "react";
import { AnimatedOutlet } from "../../components/AnimatedOutlet";
import { Link } from "react-router-dom";
import { Header } from "../../components/Header";
import {
  DailyTotalTimeUsageWidget,
  SmallWidget,
} from "../../components/widgets";
import styled from "@emotion/styled";
import { Widget } from "../../components/Widget";
import { Button } from "../../components/Button";
import { Settings } from "../../assets/icons/Settings";

export const Home: React.FC = () => {
  return (
    <div>
      <AnimatedOutlet />
      <Container>
        <Header title="Overview" />
        <Link to="/total" style={{ textDecoration: "none" }}>
          <DailyTotalTimeUsageWidget />{" "}
        </Link>
        <div style={{ overflow: "auto" }}>
          <WidgetContainer>
            <SmallWidget
              title="전체 사용 시간"
              mainText="2h 27m"
              goalText="4h"
            />
            <SmallWidget
              title="최대 사용 시간"
              mainText="1h 12m"
              goalText="3h"
            />
            {/* <SmallWidget title="평균 사용 시간" mainText="12m" /> */}
          </WidgetContainer>
        </div>
        <Widget title="임의의 어떤 위젯을 넣을 예정" />
        <Button icon={Settings} text="홈 화면 수정하기" />
      </Container>
    </div>
  );
};

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 24px;
`;

const WidgetContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  overflow-x: scroll;
`;
