import React, { useMemo } from "react";
import { Card } from "./Card";
import { Text } from "~/components/elements/Text";
import styled from "@emotion/styled";
import { UnstyledLink } from "./UnstyledLink";
import { hasData, isDataType, UsageType } from "~/types";
import { useUsageOf } from "~/utils/hooks/useUsageOf";
import { routeMeta } from "~/routeMeta";
import { useTranslation } from "react-i18next";
import { Usage } from "~/components/blocks/Usage";

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
  const { t } = useTranslation();
  const data = useUsageOf(type);

  const usage = useMemo(() => data.at(-1), [data]);

  return (
    <UnstyledLink to={routeMeta[type]}>
      <Card full={main}>
        {isDataType(type, usage, ["totalTime", "pickups", "maxTime", "avgTime"])
          && hasData(usage)
          && <Usage
            date={14} // Last date in dataset
            type={type}
            value={usage.usageData.usage}
            limit={120}
            widget={!main}
          />
        }
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
