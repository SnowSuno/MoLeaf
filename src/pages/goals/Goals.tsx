import React from "react";
import { Header } from "../../components/layouts/Header";
import { TimeUsageWidget } from "../../components/widgets";
import styled from "@emotion/styled";
import {
  PatternUsageWidget,
} from "../../components/widgets/PatternUsageWidget";
import { AnimatedOutlet } from "../../components/layouts/AnimatedOutlet";

export const Goals: React.FC = () => {
  return (
    <div>
      <AnimatedOutlet/>
      <Container>
        <Header title="Goals"/>
        <section>
          <h2>현재 설정된 목표</h2>
          <TimeUsageWidget
            title="전체 사용 시간"
            href="totaltime"
            totalTime={{ hours: 4, minutes: 0 }}
          />
          <TimeUsageWidget
            title="최대 사용 시간"
            href="maxtime"
            totalTime={{ hours: 3, minutes: 0 }}
          />
          <PatternUsageWidget title="다운 타임" href="downtime"/>
        </section>
        <section>
          <h2>미설정 목표</h2>
          <TimeUsageWidget title="평균 사용 시간" href="avgtime"/>
          <TimeUsageWidget title="잠금 해제 횟수" href="unlock"/>
        </section>
      </Container>
    </div>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 24px;

  & > section {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 16px;

    & > h2 {
      font-size: 24px;
      font-weight: var(--medium-text);
    }
  }
`;

