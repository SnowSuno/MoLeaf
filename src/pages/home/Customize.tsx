import React, { useEffect, useState } from "react";
import { Page } from "../../components/Page";
import { ChevronLeft, ChevronRight } from "../../assets/icons";
import styled from "@emotion/styled";
import { MainWidget, SmallTimeWidget } from "../../components/widgets";
import { Button } from "../../components/Button";
import { Settings } from "../../assets/icons/Settings";
import { Card } from "../../components/Card";
import { Radio } from "../../components/Radio";
import { SmallPatternWidget } from "../../components/widgets/SmallPatternWidget";

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
  return widgetOrder.map((x) => {
    if (x == "total") {
      return (
        <div onClick={() => (selected == x ? setSelected("") : setSelected(x))}>
          <SmallTimeWidget
            title="전체 사용 시간"
            actual={{ hours: 2, minutes: 27 }}
            goal={{ hours: 4, minutes: 0 }}
            selected={selected == "total"}
          />
        </div>
      );
    } else if (x == "max") {
      return (
        <div onClick={() => (selected == x ? setSelected("") : setSelected(x))}>
          <SmallTimeWidget
            title="최대 사용 시간"
            actual={{ hours: 3, minutes: 12 }}
            goal={{ hours: 3, minutes: 0 }}
            selected={selected == "max"}
          />
        </div>
      );
    } else if (x == "average") {
      return (
        <div onClick={() => (selected == x ? setSelected("") : setSelected(x))}>
          <SmallTimeWidget
            title="평균 사용 시간"
            actual={{ hours: 0, minutes: 12 }}
            selected={selected == "average"}
          />
        </div>
      );
    } else if (x == "downtime") {
      return (
        <div onClick={() => (selected == x ? setSelected("") : setSelected(x))}>
          <SmallPatternWidget
            title="다운 타임"
            on={true}
            range={{
              startTime: { hours: 20, minutes: 0 },
              endTime: { hours: 23, minutes: 0 },
            }}
            selected={selected == "downtime"}
          />
        </div>
      );
    } else {
      return (
        <></>
        /* TODO: 잠금 해제 횟수 & 다운타임 위젯 만들기 */
      );
    }
  });
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

  const save = () => {
    localStorage.setItem("mainWidget", selectedMain);
    localStorage.setItem("widgetOrder", widgetOrder.toString());
    window.location.href = "/";
  };

  return (
    <Page title="홈 화면 수정하기">
      <Container>
        <div
          onClick={() =>
            selected == "main" ? setSelected("") : setSelected("main")
          }
        >
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
            icon={Settings}
          />
        </div>
        {selected == "main" ? (
          <ExpandedWidget>
            <Radio
              text="전체 사용 시간"
              selected={selectedMain == "total"}
              onClick={() => setSelectedMain("total")}
            />
            <Radio
              text="평균 사용 시간"
              selected={selectedMain == "average"}
              onClick={() => setSelectedMain("average")}
            />
            <Radio
              text="최대 사용 시간"
              selected={selectedMain == "max"}
              onClick={() => setSelectedMain("max")}
            />
            <Radio
              text="다운 타임"
              selected={selectedMain == "downtime"}
              onClick={() => setSelectedMain("downtime")}
            />
          </ExpandedWidget>
        ) : (
          <></>
        )}

        <div style={{ overflow: "auto" }}>
          <WidgetContainer>
            <WidgetList
              widgetOrder={widgetOrder}
              selected={selected}
              setSelected={setSelected}
            />
          </WidgetContainer>
        </div>

        <Button text="저장하기" onClick={save} />
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
  padding: 24px;
  margin: 0 auto;
`;

const ExpandedWidget = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const WidgetContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  overflow-x: scroll;
`;

const ControllerContainer = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  align-items: center;
  padding: 24px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  & * {
    cursor: pointer;
  }
`;

const ControllerInnerContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
