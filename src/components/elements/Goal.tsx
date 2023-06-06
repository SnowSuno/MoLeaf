import React, { PropsWithChildren } from "react";
import { Card } from "./Card";
import { Text } from "~/components/elements/Text";
import styled from "@emotion/styled";
import { UnstyledLink } from "./UnstyledLink";
import { UsageType } from "~/types";
import { routeMeta } from "~/routeMeta";
import { useTranslation } from "react-i18next";
import { ChevronRight } from "~/assets/icons";

interface Props extends PropsWithChildren {
  type: UsageType;
  onClick?: () => void;
}

export const Goal: React.FC<Props> = ({ type, children, ...props }) => {
  const { t } = useTranslation();

  return (
    <UnstyledLink to={routeMeta[type]}>
      <Card full={true} {...props}>
        <Container>
          <InnerContainer>
            <Text>{t(`usage.${type}.${"long"}`)}</Text>
            {children}
          </InnerContainer>
          <ChevronRight size={36} color="var(--dark-text)" />
        </Container>
      </Card>
    </UnstyledLink>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 4px;
`;

const InnerContainer = styled.div`
  & > p > span {
    opacity: 0.4;
    font-weight: 400;
  }
`;
