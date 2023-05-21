import React, { useEffect, useState } from "react";
import { AnimatedOutlet } from "../../components/AnimatedOutlet";
import { Link } from "react-router-dom";
import { Header } from "../../components/Header";
import { MainWidget, SmallWidget } from "../../components/widgets";
import styled from "@emotion/styled";
import { Widget } from "../../components/Widget";
import { Button } from "../../components/Button";
import { Settings } from "../../assets/icons/Settings";

interface Props {
  widgetOrder: string[];
}

const WidgetList: React.FC<Props> = ({ widgetOrder }) => {
  return widgetOrder.map((x) => {
    if (x == "total") {
      return (
        <SmallWidget
          title="전체 사용 시간"
          actual={{ hours: 2, minutes: 27 }}
          goal={{ hours: 4, minutes: 0 }}
        />
      );
    } else if (x == "max") {
      return (
        <SmallWidget
          title="최대 사용 시간"
          actual={{ hours: 3, minutes: 12 }}
          goal={{ hours: 3, minutes: 0 }}
        />
      );
    } else if (x == "average") {
      return (
        <SmallWidget
          title="평균 사용 시간"
          actual={{ hours: 0, minutes: 12 }}
        />
      );
    } else {
      return {
        /* TODO: 잠금 해제 횟수 & 다운타임 위젯 만들기 */
      };
    }
  });
};

export const Home: React.FC = () => {
  const widgetOrder = localStorage.getItem("widgetOrder")?.split(",");
  const selectedMain = localStorage.getItem("mainWidget");

  useEffect(() => {
    if (!localStorage.getItem("mainWidget")) {
      localStorage.setItem("mainWidget", "total");
    }
  }, []);
  useEffect(() => {
    if (!localStorage.getItem("widgetOrder")) {
      localStorage.setItem(
        "widgetOrder",
        ["total", "max", "average"].toString()
      );
    }
  }, [widgetOrder]);

  return (
    <div>
      <AnimatedOutlet />
      <Container>
        <Header title="Overview" />

        <Link to="/total" style={{ textDecoration: "none" }}>
          <MainWidget
            text={
              selectedMain == "total"
                ? "전체 사용 시간"
                : selectedMain == "average"
                ? "평균 사용 시간"
                : selectedMain == "max"
                ? "최대 사용 시간"
                : ""
            }
          />
        </Link>

        <div style={{ overflow: "auto" }}>
          <WidgetContainer>
            <WidgetList widgetOrder={widgetOrder} />
          </WidgetContainer>
        </div>

        <Widget title="임의의 어떤 위젯을 넣을 예정" />

        <div style={{ margin: "0 auto" }}>
          <Link to="/customize" style={{ textDecoration: "none" }}>
            <Button icon={Settings} text="홈 화면 수정하기" />
          </Link>
        </div>
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
