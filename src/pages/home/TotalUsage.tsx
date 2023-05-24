import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { motion, useAnimation } from "framer-motion";

import { Page } from "../../components/layouts/Page";
import { BarGauge } from "../../components/graphs";
import { DataPoint } from "../../types";
import { Divider } from "../../components/elements";
import { UsageText } from "../../components/UsageText";
import { MonthSelector } from "../../components/MonthSelector";
import { MarginInline } from "../../components/elements/MarginInline";
import { BarGraph } from "../../components/graphs/BarGraph";
import styled from "@emotion/styled";

const data: DataPoint[][] = [
  [
    { date: 5, value: 2.4 },
    { date: 6, value: 4.2 },
    { date: 7, value: 1.1 },
    { date: 8, value: 0.7 },
    { date: 9, value: 2.8 },
    { date: 10, value: 1.4 },
    { date: 11, value: 2.6 },
  ],
  [
    { date: 12, value: 2.4 },
    { date: 13, value: 4.2 },
    { date: 14, value: 1.1 },
    { date: 15, value: 0.7 },
    { date: 16, value: 2.8 },
    { date: 17, value: 1.4 },
    { date: 18, value: 2.6 },
  ],
];

const timeLimit = 2;

export const TotalUsage: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  const [graphHeight, setGraphHeight] = useState<number>(0);
  // const [week, setWeek] = useState<number>(0);

  const [selectedDate, setSelectedDate] = useState<number>(
    data.flat().at(-1)?.date || 0,
  );

  // const weekData = useMemo(() => data.at(week) || [], [week]);

  const selectedValue = useMemo(
    () => data
      .flat()
      .filter(d => d.date === selectedDate)
      .at(0)
      ?.value || 0,
    [selectedDate],
  );

  const [drag, setDrag] = useState<{ x: 0 | "-50%" }>({ x: 0 });
  const animation = useAnimation();

  useEffect(() => {
    animation.start(drag).catch(console.error);
  }, [animation, drag]);

  return (
    <Page title="사용 시간">
      <MonthSelector/>
      <ScrollContainer ref={ref} stickyHeight={graphHeight}>
        <Scroller
          drag="x"
          dragConstraints={ref}
          animate={animation}
          onDragEnd={(_, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);
            console.log("swipe", swipe, drag);

            if (swipe < -threshold) return setDrag({ x: "-50%" });
            if (swipe > threshold) return setDrag({ x: 0 });
            setDrag({ x: drag.x });
          }}
        >
          {data.map((weekData, index) => <BarGraph
            key={index}
            data={weekData}
            selectedDate={selectedDate}
            onClickDate={setSelectedDate}
            updateHeight={setGraphHeight}
          />)}
        </Scroller>
      </ScrollContainer>
      {/*<MarginInline>*/}
      {/*  <BarGroup data={weekData} selectedDate={selectedDate}*/}
      {/*            onClickDate={setSelectedDate}/>*/}
      {/*</MarginInline>*/}
      {/*<BarSelector data={weekData} selectedDate={selectedDate}*/}
      {/*             onClickDate={setSelectedDate}/>*/}
      <Divider/>
      <MarginInline>
        <UsageText date={selectedDate} value={selectedValue}/>
        <BarGauge value={selectedValue} limit={timeLimit}/>
      </MarginInline>
      <div style={{ height: "200vh" }}></div>
    </Page>
  );
};

const ScrollContainer = styled(motion.div)<{stickyHeight: number}>`
  width: 100%;

  //display: contents;
  //position: absolute;
  position: sticky;
  top: ${props => 35 - props.stickyHeight}px;
  //bottom: 100px;
  //top: calc(1200px - 150%);
`;

const Scroller = styled(motion.div)`
  display: flex;
  flex-direction: row;
  width: 200%;

  //position: sticky;
  //top: 0px;

  & > div {
    width: 100%;
  }
`;

const threshold = 3000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

