import React, { useEffect, useState } from "react";
import { AnimatedOutlet } from "../../components/layouts/AnimatedOutlet";
import { Link, useNavigate } from "react-router-dom";
import { Header } from "../../components/layouts/Header";
import { MainWidget, SmallTimeWidget } from "../../components/widgets";
import styled from "@emotion/styled";
import { Button } from "../../components/elements";
import { Settings } from "../../assets/icons";
import { SmallPatternWidget } from "../../components/widgets/SmallPatternWidget";
import { SmallNumberWidget } from "../../components/widgets/SmallNumberWidget";
import { motion } from "framer-motion";

// import { dummyData } from "../../data";

interface Props {
  widgetOrder: string[];
}

const WidgetList: React.FC<Props> = ({ widgetOrder }) => {
  return (
    <>
      {widgetOrder.map((x) => {
        if (x == "totalTime") {
          return (
            <SmallTimeWidget
              key={x}
              title="전체 사용"
              actual={{ hours: 2, minutes: 27 }}
              goal={{ hours: 4, minutes: 0 }}
            />
          );
        } else if (x == "maxTime") {
          return (
            <SmallTimeWidget
              key={x}
              title="최대 사용"
              actual={{ hours: 3, minutes: 12 }}
              goal={{ hours: 3, minutes: 0 }}
            />
          );
        } else if (x == "averageTime") {
          return (
            <SmallTimeWidget
              key={x}
              title="평균 사용"
              actual={{ hours: 0, minutes: 12 }}
            />
          );
        } else if (x == "downtime") {
          return (
            <SmallPatternWidget
              key={x}
              title="다운 타임"
              on={true}
              range={{
                startTime: { hours: 20, minutes: 0 },
                endTime: { hours: 23, minutes: 0 },
              }}
            />
          );
        } else if (x == "numUnlocks") {
          return <SmallNumberWidget
            key={x}
            title="평균 사용 시간"
            actual={36}
          />;
        } else {
          return null; /* TODO: 잠금 해제 횟수 & 다운타임 위젯 만들기 */
        }
      })}
    </>
  );
};

export const Home: React.FC = () => {
  const navigate = useNavigate();

  const [widgetOrder, setWidgetOrder] = useState<string[]>([]);
  const [selectedMain, setSelectedMain] = useState<string>("");

  useEffect(() => {
    async function initLocalStorage() {
      if (!localStorage.getItem("widgetOrder")) {
        await localStorage.setItem(
          "widgetOrder",
          [
            "totalTime",
            "maxTime",
            "averageTime",
            "downtime",
            "numUnlocks",
          ].toString()
        );
      }
      if (!localStorage.getItem("mainWidget")) {
        await localStorage.setItem("mainWidget", "totalTime");
      }

      const tmpWidgetOrder = localStorage.getItem("widgetOrder");
      if (tmpWidgetOrder) await setWidgetOrder(tmpWidgetOrder.split(","));
      const tmpSelectedMain = localStorage.getItem("mainWidget");
      if (tmpSelectedMain) await setSelectedMain(tmpSelectedMain);

      // if (!localStorage.getItem("rawData")) {
      //   await localStorage.setItem("rawData", JSON.stringify(dummyData));
      // }
      // localStorage.setItem("rawData", JSON.stringify(dummyData));
    }

    initLocalStorage();
  }, []);

  return (
    <div>
      <AnimatedOutlet/>
      <Container>
        <Header title="Overview"/>

        <MainWidget
          type={selectedMain}
          onClick={() => navigate("/total")}
        />

        <WidgetContainer
          drag="x"
          dragConstraints={{ left: -515, right: 0 }}
        >
          <WidgetList widgetOrder={widgetOrder ? widgetOrder : []}/>
        </WidgetContainer>

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
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 24px;
`;

const WidgetContainer = styled(motion.div)`
  display: flex;
  flex-direction: row;
  gap: 16px;
  margin-inline: -20px;
  padding-inline: 20px;
  padding-bottom: 14px;

  & div::-webkit-scrollbar {
    display: none;
  }

  & > div {
    flex-shrink: 0;
  }
`;
