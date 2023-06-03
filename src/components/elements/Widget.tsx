import React, { type PropsWithChildren } from "react";
import { Card } from "./Card";
import styled from "@emotion/styled";
import { UnstyledLink } from "./UnstyledLink";
import { IconComponent } from "../../assets/icons/utils";

interface Props extends PropsWithChildren {
  full?: boolean;
  title?: string;
  success?: boolean;
  icon?: IconComponent;
  selected?: boolean;
  href?: string;
  onClick?: () => void;
}

export const Widget: React.FC<Props> = ({
  title,
  success,
  icon: Icon,
  children,
  href,
  ...props
}) => {
  const inner = (
    <Card {...props}>
      <Header>
        <Title>{title}</Title>
        {success == false ? <FailTag>실패</FailTag> : <></>}
        {Icon ? (
          <div style={{ cursor: "pointer" }}>
            <Icon size={24} color="var(--dark-text)" />
          </div>
        ) : (
          <></>
        )}
      </Header>
      {children}
    </Card>
  );

  return href ? <UnstyledLink to={href}>{inner}</UnstyledLink> : inner;
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
