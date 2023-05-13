import React, { type PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import { Header } from "../components/Header";
import { TimeUsageWidget } from "../components/widgets";
import styled from "@emotion/styled";

//interface Props extends PropsWithChildren { }

export const Goals: React.FC = () => {
  return (
    <div style={{ overflow: "auto", height: "100vh" }}>
      <Header title="Goals"/>
      <>
        <Category>현재 설정된 목표</Category>
        <Link to="/goals/totaltime" style={{ textDecoration: "none" }}>
          <TimeUsageWidget title="전체 사용 시간" totalTime={{hours: 4, minutes: 0}} />{" "}
        </Link>
        <Link to="/goals/downtime" style={{ textDecoration: "none" }}>
          <TimeUsageWidget title="다운 타임" />{" "}
        </Link>
        <Link to="/goals/maxtime" style={{ textDecoration: "none" }}>
          <TimeUsageWidget title="최대 사용 시간" totalTime={{hours: 3, minutes: 0}} />{" "}
        </Link>
      </>
      <>
        <Category>미설정 목표</Category>
        <Link to="/goals/avgtime" style={{ textDecoration: "none" }}>
          <TimeUsageWidget title="평균 사용 시간" />{" "}
        </Link>
        <Link to="/goals/unlock" style={{ textDecoration: "none" }}>
          <TimeUsageWidget title="잠금 해제 횟수" />{" "}
        </Link>
      </>
    </div>
  );
}

const Category = styled.div`
  font-size: 24px;
  font-weight: var(--medium-text);
`

const Title = styled.div`
  color: var(--dark-text);
  font-size: 16px;
  font-weight: var(--medium-text);
`;