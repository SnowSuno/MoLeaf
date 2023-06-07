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
  const data = useUsageOf(type);

  const usage = useMemo(() => data.at(-1), [data]);

  return (
    <UnstyledLink to={routeMeta[type]}>
      <Card full={main}>
        {usage
          && hasData(usage)
          && <Usage
            date={14} // Last date in dataset
            type={type}
            value={(usage.usageData as { usage: number }).usage}
            widget={!main}
          />
        }
      </Card>
    </UnstyledLink>
  );
};
