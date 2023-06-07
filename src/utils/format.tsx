import { UsageType } from "~/types";
import { useTranslation } from "react-i18next";

export const FormatValue = (value: number, type: UsageType) => {

  if (type === "pickups") return <>{value}</>

  const hour = Math.trunc(value / 60);
  const minute = value % 60;

  return <>
    {!!hour && <>{hour}<span>h</span>&nbsp;</>}
    {!!minute && <>{minute}<span>m</span></>}
  </>;
};
