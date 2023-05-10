import React, { type PropsWithChildren } from "react";
import styled from "@emotion/styled";
import { Widget } from "../Widget";
import { BarGraph } from "../BarGraph";

const totalTime = { hours: 2, minutes: 47 };
const goal = { hours: 4, minutes: 0 };

const formatTimeString = (hours: number, minutes: number) => {
    return `${hours}h ${minutes}m`;
};

interface Props extends PropsWithChildren {}

export const DailyTotalTimeUsageWidget: React.FC<Props> = () => {
    const children = (
        <>
            <Time>
                <TotalTime>
                    {totalTime.hours}h {totalTime.minutes}m
                    {/* {formatTimeString(totalTime.hours, totalTime.minutes)} */}
                </TotalTime>
                {goal ? (
                    <GoalTime>
                        / {goal.hours}h {goal.minutes}m
                    </GoalTime>
                ) : (
                    <></>
                )}
            </Time>
            (Horizontal Bar)
        </>
    );
    return <Widget title="전체 사용 시간" others={children} />;
};

const Time = styled.div`
    margin: 16px 0;
`;

const TotalTime = styled.div`
    color: var(--black);
    font-size: 36px;
    font-weight: bold;
`;

const GoalTime = styled.div`
    color: var(--dark-text);
    font-size: 18px;
    font-weight: 500;
`;
