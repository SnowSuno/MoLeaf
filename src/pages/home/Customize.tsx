import React, { useEffect, useState } from "react";
import { Page } from "../../components/layouts/Page";
import { ChevronLeft, ChevronRight } from "../../assets/icons";
import styled from "@emotion/styled";
import { Button, Card } from "../../components/elements";
import { Settings } from "../../assets/icons";
import { Radio } from "../../components/elements";
import { useTranslation } from "react-i18next";

interface Props {
  widgetOrder: string[];
  selected: string;
  setSelected: (selected: string) => void;
}


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

  const save = async () => {
    localStorage.setItem("mainWidget", selectedMain);
    localStorage.setItem("widgetOrder", widgetOrder.toString());
    window.location.href = "/";
  };

  const { t } = useTranslation();

  return (
    <Page title={t(`home.edit`)}>
      {/*<Container>*/}
      {/*  <div*/}
      {/*    onClick={() =>*/}
      {/*      selected == "main" ? setSelected("") : setSelected("main")*/}
      {/*    }*/}
      {/*  >*/}
      {/*    <MainWidget type={selectedMain} icon={Settings} />*/}
      {/*  </div>*/}
      {/*  {selected == "main" ? (*/}
      {/*    <ExpandedWidget>*/}
      {/*      <Radio*/}
      {/*        text="전체 사용 시간"*/}
      {/*        selected={selectedMain == "totalTime"}*/}
      {/*        onClick={() => setSelectedMain("totalTime")}*/}
      {/*      />*/}
      {/*      <Radio*/}
      {/*        text="평균 사용 시간"*/}
      {/*        selected={selectedMain == "averageTime"}*/}
      {/*        onClick={() => setSelectedMain("averageTime")}*/}
      {/*      />*/}
      {/*      <Radio*/}
      {/*        text="최대 사용 시간"*/}
      {/*        selected={selectedMain == "maxTime"}*/}
      {/*        onClick={() => setSelectedMain("maxTime")}*/}
      {/*      />*/}
      {/*      /!* <Radio*/}
      {/*        text="다운 타임"*/}
      {/*        selected={selectedMain == "downtime"}*/}
      {/*        onClick={() => setSelectedMain("downtime")}*/}
      {/*      /> *!/*/}
      {/*      /!* <Radio*/}
      {/*        text="잠금 해제 횟수"*/}
      {/*        selected={selectedMain == "numUnlocks"}*/}
      {/*        onClick={() => setSelectedMain("numUnlocks")}*/}
      {/*      /> *!/*/}
      {/*    </ExpandedWidget>*/}
      {/*  ) : (*/}
      {/*    <></>*/}
      {/*  )}*/}

      {/*  <div style={{ overflow: "auto" }}>*/}
      {/*    <WidgetContainer>*/}
      {/*      <WidgetList*/}
      {/*        widgetOrder={widgetOrder}*/}
      {/*        selected={selected}*/}
      {/*        setSelected={setSelected}*/}
      {/*      />*/}
      {/*    </WidgetContainer>*/}
      {/*  </div>*/}

      {/*  <div style={{ textAlign: "center" }}>*/}
      {/*    <Button text={t(`common.saveButton`)} onClick={save} />*/}
      {/*  </div>*/}
      {/*</Container>*/}
      {/*{selected && selected != "main" ? (*/}
      {/*  <Controller*/}
      {/*    selectedIdx={widgetOrder.findIndex((x) => x == selected)}*/}
      {/*    widgetNum={widgetOrder.length}*/}
      {/*    move={move}*/}
      {/*  />*/}
      {/*) : (*/}
      {/*  <></>*/}
      {/*)}*/}
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
  justify-content: center;

  & * {
    cursor: pointer;
  }
`;
