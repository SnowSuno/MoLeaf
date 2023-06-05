import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AnimatePresence, MotionConfig } from "framer-motion";

import { Home, Goals, Settings } from "./pages";
import { Layout } from "./components/layouts/Layout";
import { TotalTime } from "./pages/goals/TotalTime";
import { DownTime } from "./pages/goals/DownTime";
import { Customize } from "./pages/home/Customize";
import { Unlocks } from "./pages/goals/Unlocks";
import { useUsage } from "~/state/usage";
import { AnalysisPage } from "~/components/layouts/AnalysisPage";

import testData from "~/data/P0701.json";
import { migrate } from "~/data/migrate";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
      {
        path: "",
        element: <Home/>,
        children: [
          { path: "total", element: <AnalysisPage type="totalTime"/> },
          { path: "customize", element: <Customize/> },
        ],
      },
      {
        path: "goals",
        element: <Goals/>,
        children: [
          {
            path: "totaltime",
            element: <TotalTime
              text="전체 사용 시간"
              goal={{ hours: 4, minutes: 0 }}
            />,
          },
          {
            path: "maxtime",
            element: <TotalTime
              text="최대 사용 시간"
              goal={{ hours: 3, minutes: 0 }}
            />,
          },
          {
            path: "avgtime",
            element: <TotalTime text="평균 사용 시간"/>,
          },
          { path: "downtime", element: <DownTime/> },
          { path: "unlock", element: <Unlocks/> },
        ],
      },
      { path: "settings", element: <Settings/> },
    ],
  },
]);

function App () {
  const loadData = useUsage(state => state.loadData);

  useEffect(() => {
    loadData(migrate(testData));
  }, [loadData]);

  return (
    <MotionConfig transition={{ stiffness: 1000, damping: 100 }}>
      <RouterProvider router={router}/>
    </MotionConfig>
  );
}

export default App;
