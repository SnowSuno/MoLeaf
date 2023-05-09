import React from "react";
import { Page } from "../../components/Page";
import { Link } from "react-router-dom";

export const TotalUsage: React.FC = () => {
  return (
    <Page title="사용 시간">
      <Link to="/">back</Link>
      Total usage
    </Page>
  );
};
