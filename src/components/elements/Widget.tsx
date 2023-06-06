import React from "react";
import { Card } from "./Card";
import styled from "@emotion/styled";
import { UnstyledLink } from "./UnstyledLink";
import { UsageType } from "~/types";
import { useUsageOf } from "~/utils/hooks/useUsageOf";
import { routeMeta } from "~/routeMeta";

interface Props {
  type: UsageType;
  main?: boolean;
  // full?: boolean;
  // title?: string;
  // success?: boolean;
  // selected?: boolean;
  // href?: string;
  // onClick?: () => void;
}

export const Widget: React.FC<Props> = ({
  type,
  main
  // title,
  // success,
  // children,
  // href,
  // ...props
}) => {
  const data = useUsageOf(type);

  return (
    <UnstyledLink to={routeMeta[type]}>
      <Card full={main}>
        <Header>
          <Title>{type}</Title>
          {/*{success == false ? <FailTag>실패</FailTag> : <></>}*/}
        </Header>
        {/*{children}*/}
      </Card>
    </UnstyledLink>
  );
};

const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;

const Title = styled.div`
  color: var(--dark-text);
  font-size: 16px;
  font-weight: var(--medium-text);
`;

const FailTag = styled.div`
  color: var(--red);
  background-color: rgba(var(--light-red_w), 0.3);
  font-size: 12px;
  font-weight: var(--medium-text);
  padding: 4px 8px;
  border-radius: 4px;
`;
