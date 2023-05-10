import React from "react";
import { AnimatedOutlet } from "../../components/AnimatedOutlet";
import { Link } from "react-router-dom";
import { Header } from "../../components/Header";
import {
  DailyTotalTimeUsageWidget,
  SmallWidget,
} from "../../components/widgets";
import { WidgetContainer } from "../../components/WidgetContainer";

export const Home: React.FC = () => {
  return (
    <div>
      <AnimatedOutlet />
      <Header title="Overview" />
      <Link to="/total" style={{ textDecoration: "none" }}>
        <DailyTotalTimeUsageWidget />{" "}
      </Link>
      <div style={{ overflow: "auto" }}>
        <WidgetContainer>
          <SmallWidget title="전체 사용 시간" mainText="2h 27m" goalText="4h" />
          <SmallWidget title="최대 사용 시간" mainText="1h 12m" goalText="3h" />
          <SmallWidget title="평균 사용 시간" mainText="12m" />
        </WidgetContainer>
      </div>
    </div>
  );
};
