import React, { type PropsWithChildren } from "react";
import { Card } from "./Card";
import styled from "@emotion/styled";

interface Props extends PropsWithChildren {
    title: string;
    others: any[];
}

export const Widget: React.FC<Props> = ({ title, others }) => {
    const children = (
        <>
            <Title>{title}</Title>
            {others}
        </>
    );
    return <Card children={children} />;
};

const Title = styled.div`
    color: var(--dark-text);
    font-size: 16px;
    font-weight: 500;
`;
