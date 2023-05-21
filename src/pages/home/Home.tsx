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
              actual={{ hours: 2, minutes: 27 }}
              goal={{ hours: 4, minutes: 0 }}
            />
            <SmallWidget
              title="최대 사용 시간"
              actual={{ hours: 3, minutes: 12 }}
              goal={{ hours: 3, minutes: 0 }}
            />
            <SmallWidget
              title="평균 사용 시간"
              actual={{ hours: 0, minutes: 12 }}
            />
            {/* TODO: 잠금 해제 횟수 & 다운타임 위젯 만들기 */}
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
