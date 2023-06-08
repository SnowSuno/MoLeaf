import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AnimatePresence, MotionConfig } from "framer-motion";

import { Home, Goals, Settings } from "./pages";
import { Layout } from "./components/layouts/Layout";
import { TotalTime } from "./pages/goals/TotalTime";
import { DownTime } from "./pages/goals/DownTime";
import { Customize } from "./pages/home/Customize";
import { Pickups } from "./pages/goals/Pickups";
import { useUsage } from "~/state/usage";
import { AnalysisPage } from "~/components/layouts/AnalysisPage";

import testData from "~/data/P0701.json";
import { routeMeta } from "~/routeMeta";
import { UsageType } from "~/types";
import { useGoalState } from "./state/goals";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
        children: [
          ...Object.entries(routeMeta).map(([type, path]) => ({
            path,
            element: <AnalysisPage type={type as UsageType} />,
          })),
          { path: "customize", element: <Customize /> },
        ],
      },
      {
        path: "goals",
        element: <Goals />,
        children: [
          {
            path: "total",
            element: <TotalTime type="totalTime" />,
          },
          {
            path: "max",
            element: <TotalTime type="maxTime" />,
          },
          {
            path: "avg",
            element: <TotalTime type="avgTime" />,
          },
          {
            path: "downtime",
            element: <DownTime />,
          },
          {
            path: "pickups",
            element: <Pickups />,
          },
        ],
      },
      { path: "settings", element: <Settings /> },
    ],
  },
]);

function App() {
  const loadData = useUsage((state) => state.loadData);

  useEffect(() => {
    loadData(testData);
  }, [loadData]);

  return (
    <MotionConfig transition={{ stiffness: 1000, damping: 100 }}>
      <RouterProvider router={router} />
    </MotionConfig>
  );
}

export default App;
