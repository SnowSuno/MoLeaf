import React from "react";
import { AnimatedOutlet } from "../../components/AnimatedOutlet";
import { Link } from "react-router-dom";
import { Header } from "../../components/Header";
import { DailyTotalTimeUsageWidget } from "../../components/widgets";

export const Home: React.FC = () => {
  return (
    <div>
      <AnimatedOutlet />
      <Header title="Overview" />
      <Link to="/total" style={{ textDecoration: "none" }}>
        <DailyTotalTimeUsageWidget />
      </Link>
    </div>
  );
};
