import React, { useEffect } from "react";
import { AnimatedOutlet } from "../../components/AnimatedOutlet";
import { Link } from "react-router-dom";
import { Header } from "../../components/Header";
import { MainWidget, SmallTimeWidget } from "../../components/widgets";
import styled from "@emotion/styled";
import { Button } from "../../components/elements";
import { Settings } from "../../assets/icons";
import {
  SmallPatternWidget,
} from "../../components/widgets/SmallPatternWidget";

interface Props {
  widgetOrder: string[];
}

const WidgetList: React.FC<Props> = ({ widgetOrder }) => {
  return <>{
    widgetOrder?.map((x) => {
      if (x == "total") {
        return (
          <SmallTimeWidget
            title="전체 사용 시간"
            actual={{ hours: 2, minutes: 27 }}
            goal={{ hours: 4, minutes: 0 }}
          />
        );
      } else if (x == "max") {
        return (
          <SmallTimeWidget
            title="최대 사용 시간"
            actual={{ hours: 3, minutes: 12 }}
            goal={{ hours: 3, minutes: 0 }}
          />
        );
      } else if (x == "average") {
        return (
          <SmallTimeWidget
            title="평균 사용 시간"
            actual={{ hours: 0, minutes: 12 }}
          />
        );
      } else if (x == "downtime") {
        return (
          <SmallPatternWidget
            title="다운 타임"
            on={true}
            range={{
              startTime: { hours: 20, minutes: 0 },
              endTime: { hours: 23, minutes: 0 },
            }}
          />
        );
      } else {
        return null;  /* TODO: 잠금 해제 횟수 & 다운타임 위젯 만들기 */
      }
    })}
  </>;
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
        ["total", "max", "average", "downtime"].toString(),
      );
    }
  }, [widgetOrder]);

  return (
    <div>
      <AnimatedOutlet/>
      <Container>
        <Header title="Overview"/>

        <Link to="/total" style={{ textDecoration: "none" }}>
          <MainWidget
            text={
              selectedMain == "total"
                ? "전체 사용 시간"
                : selectedMain == "average"
                  ? "평균 사용 시간"
                  : selectedMain == "max"
                    ? "최대 사용 시간"
                    : selectedMain == "downtime"
                      ? "다운 타임"
                      : ""
            }
          />
        </Link>

        <div style={{ overflow: "auto" }}>
          <WidgetContainer>
            <WidgetList widgetOrder={widgetOrder ? widgetOrder : []}/>
          </WidgetContainer>
        </div>

        <div style={{ margin: "0 auto" }}>
          <Link to="/customize" style={{ textDecoration: "none" }}>
            <Button icon={Settings} text="홈 화면 수정하기"/>
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
