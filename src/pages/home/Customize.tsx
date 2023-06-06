import React, { useEffect, useRef, useState } from "react";
import { Page } from "../../components/layouts/Page";
import { ChevronLeft, ChevronRight } from "../../assets/icons";
import styled from "@emotion/styled";
import { MainWidget, SmallTimeWidget } from "../../components/widgets";
import { Button, Card } from "../../components/elements";
import { Settings } from "../../assets/icons";
import { SmallPatternWidget } from "../../components/widgets/SmallPatternWidget";
import { Radio } from "../../components/elements";
import { SmallNumberWidget } from "../../components/widgets/SmallNumberWidget";
import { motion } from "framer-motion";

interface Props {
  widgetOrder: string[];
  selected: string;
  setSelected: (selected: string) => void;
}

const WidgetList: React.FC<Props> = ({
  widgetOrder,
  selected,
  setSelected,
}) => {
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
              selected={selected == "totalTime"}
              onClick={() => (selected == x ? setSelected("") : setSelected(x))}
            />
          );
        } else if (x == "maxTime") {
          return (
            <SmallTimeWidget
              key={x}
              title="최대 사용"
              actual={{ hours: 3, minutes: 12 }}
              goal={{ hours: 3, minutes: 0 }}
              selected={selected == "maxTime"}
              onClick={() => (selected == x ? setSelected("") : setSelected(x))}
            />
          );
        } else if (x == "averageTime") {
          return (
            <SmallTimeWidget
              key={x}
              title="평균 사용"
              actual={{ hours: 0, minutes: 12 }}
              selected={selected == "averageTime"}
              onClick={() => (selected == x ? setSelected("") : setSelected(x))}
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
              selected={selected == "downtime"}
              onClick={() => (selected == x ? setSelected("") : setSelected(x))}
            />
          );
        } else if (x == "numUnlocks") {
          return (
            <SmallNumberWidget
              key={x}
              title="잠금 해제"
              actual={36}
              selected={selected == "numUnlocks"}
              onClick={() => (selected == x ? setSelected("") : setSelected(x))}
            />
          );
        } else {
          return null;
        }
      })}
    </>
  );
};

interface ControllerProps {
  selectedIdx: number;
  widgetNum: number;
  move: (dir: number) => void;
}

const Controller: React.FC<ControllerProps> = ({
  selectedIdx,
  widgetNum,
  move,
}) => {
  return (
    <ControllerContainer>
      {/* <ChevronUp size={36} weight={3} color="var(--dark-text)" /> */}
      {/* <ControllerInnerContainer> */}
      <div
        onClick={() => move(-1)}
        style={selectedIdx == 0 ? { cursor: "not-allowed" } : {}}
      >
        <ChevronLeft
          size={36}
          weight={3}
          color={selectedIdx == 0 ? "var(--gray)" : "var(--dark-text)"}
        />
      </div>
      <div style={{ width: "36px", height: "36px", cursor: "auto" }}></div>
      <div
        onClick={() => move(1)}
        style={selectedIdx >= widgetNum - 1 ? { cursor: "not-allowed" } : {}}
      >
        <ChevronRight
          size={36}
          weight={3}
          color={
            selectedIdx >= widgetNum - 1 ? "var(--gray)" : "var(--dark-text)"
          }
        />
      </div>
      {/* </ControllerInnerContainer> */}
      {/* <ChevronDown size={36} weight={3} color="var(--dark-text)" /> */}
    </ControllerContainer>
  );
};

export const Customize: React.FC = () => {
  const [widgetOrder, setWidgetOrder] = useState<string[]>([]);
  const [selected, setSelected] = useState<string>("");
  const [selectedMain, setSelectedMain] = useState<string>("");

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tmpWidgetOrder = localStorage.getItem("widgetOrder")?.split(",");
    if (tmpWidgetOrder) setWidgetOrder(tmpWidgetOrder);

    const tmpMainWidget = localStorage.getItem("mainWidget");
    setSelectedMain(tmpMainWidget ? tmpMainWidget : "");
  }, []);

  const move = (dir: number) => {
    const tmp = widgetOrder.findIndex((x) => x == selected);
    if (tmp + dir >= 0 && tmp + dir <= widgetOrder.length - 1) {
      const newWidgetOrder = widgetOrder;
      if (newWidgetOrder) {
        newWidgetOrder[tmp] = widgetOrder[tmp + dir];
        newWidgetOrder[tmp + dir] = selected;
        setWidgetOrder(newWidgetOrder);
      }
    }
  };

  const save = async () => {
    localStorage.setItem("mainWidget", selectedMain);
    localStorage.setItem("widgetOrder", widgetOrder.toString());
    window.location.href = "/";
  };

  return (
    <Page title="홈 화면 수정하기" background>
      <Container>
        <div
          onClick={() =>
            selected == "main" ? setSelected("") : setSelected("main")
          }
        >
          <MainWidget type={selectedMain} icon={Settings} />
        </div>
        {selected == "main" ? (
          <ExpandedWidget>
            <Radio
              text="전체 사용 시간"
              selected={selectedMain == "totalTime"}
              onClick={() => setSelectedMain("totalTime")}
            />
            <Radio
              text="평균 사용 시간"
              selected={selectedMain == "averageTime"}
              onClick={() => setSelectedMain("averageTime")}
            />
            <Radio
              text="최대 사용 시간"
              selected={selectedMain == "maxTime"}
              onClick={() => setSelectedMain("maxTime")}
            />
            {/* <Radio
              text="다운 타임"
              selected={selectedMain == "downtime"}
              onClick={() => setSelectedMain("downtime")}
            /> */}
            {/* <Radio
              text="잠금 해제 횟수"
              selected={selectedMain == "numUnlocks"}
              onClick={() => setSelectedMain("numUnlocks")}
            /> */}
          </ExpandedWidget>
        ) : (
          <></>
        )}

        <div style={{ overflow: "auto" }}>
          <WidgetContainer ref={containerRef}>
            <WidgetScroller drag="x" dragConstraints={containerRef}>
              <WidgetList
                widgetOrder={widgetOrder ? widgetOrder : []}
                selected={selected}
                setSelected={setSelected}
              />
            </WidgetScroller>
          </WidgetContainer>
        </div>

        <div style={{ textAlign: "center" }}>
          <Button text="저장하기" onClick={save} />
        </div>
      </Container>
      {selected && selected != "main" ? (
        <Controller
          selectedIdx={widgetOrder.findIndex((x) => x == selected)}
          widgetNum={widgetOrder.length}
          move={move}
        />
      ) : (
        <></>
      )}
    </Page>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 24px;
`;

const ExpandedWidget = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const WidgetContainer = styled.div`
  overflow: visible;
  width: 100%;
`;

const WidgetScroller = styled(motion.div)`
  display: flex;
  flex-direction: row;
  gap: 16px;
  width: min-content;
  // border: solid 1px black;

  & > div {
    flex-shrink: 0;
  }
`;

const ControllerContainer = styled.div`
  position: absolute;
  bottom: 0;
  width: calc(100% - 48px);
  align-items: center;
  padding: 24px;
  display: flex;
  flex-direction: row;
  justify-content: center;

  & * {
    cursor: pointer;
  }
`;
