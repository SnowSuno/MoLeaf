import React from "react";
import styled from "@emotion/styled";
import { BarGauge } from "~/components/graphs";
import { Text } from "~/components/elements/Text";
import { isDataType, UsageType } from "~/types";
import { FormatValue } from "~/utils/format";
import { useTranslation } from "react-i18next";
import { useLimitOf } from "~/utils/hooks/useLimitOf";

interface Props {
  date: number;
  type: Exclude<UsageType, "downTime">;
  value: number;
  widget?: boolean;
}

export const Usage: React.FC<Props> = ({
  type,
  date,
  value,
  widget = false,
}) => {
  const limit = useLimitOf(type);
  const { t, i18n } = useTranslation();

  return (
    <Container>
      <Text>
        {t(`usage.${type}.${widget ? "short" : "long"}`)}
        {!widget && (
          <span>
            {" "}
            · {i18n.language == "ko" ? `5월` : `May`} {date}
            {i18n.language == "ko" ? `일` : ``}{" "}
          </span>
        )}
      </Text>
      <Value type={type} value={value} limit={limit} widget={widget} />
      {limit ? (
        <BarGauge type={type} value={value} limit={limit} widget={widget} />
      ) : (
        <div>No goal TODO</div>
      )}
    </Container>
  );
};

interface TimeProps {
  type: UsageType;
  widget?: boolean;
  value: number;
  limit?: number;
}

const Value: React.FC<TimeProps> = ({ type, value, limit, widget }) => {
  const { t } = useTranslation();

  return (
    <ValueContainer small={widget}>
      <h3>{FormatValue(value, type)}</h3>
      {limit && (
        <p>
          {widget && t("common.goal")} {FormatValue(limit, type)}
        </p>
      )}
    </ValueContainer>
  );
};

const Container = styled.div`
  padding: 0 4px;

  & > p > span {
    opacity: 0.4;
    font-weight: 400;
  }
`;

const ValueContainer = styled.div<{ small?: boolean }>`
  display: flex;
  flex-direction: ${({ small }) => (small ? "column" : "row")};

  padding: ${({ small }) => (small ? 2 : 8)}px 0;

  align-items: ${({ small }) => (small ? "flex-start" : "flex-end")};
  gap: 4px;

  & > h3 {
    font-size: ${({ small }) => (small ? 32 : 40)}px;
    font-weight: 600;

    & > span {
      font-size: ${({ small }) => (small ? 26 : 32)}px;
    }
  }

  & > p {
    font-size: ${({ small }) => (small ? 16 : 20)}px;
    font-weight: ${({ small }) => (small ? 400 : 500)};
    color: var(--dark-text);

    padding-bottom: 6px;
  }

  ${({ small }) =>
    !small &&
    `& > p:before {
    content: "/";
    padding-inline: 8px;
  }`}
`;
