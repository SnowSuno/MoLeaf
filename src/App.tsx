import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Home, Goals, Settings } from "./pages";
import { Layout } from "./components/layouts/Layout";
import { TotalUsage } from "./pages/home/TotalUsage";
import { MotionConfig } from "framer-motion";
import { TotalTime } from "./pages/goals/TotalTime";
import { DownTime } from "./pages/goals/DownTime";
import { Customize } from "./pages/home/Customize";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
        children: [
          { path: "total", element: <TotalUsage /> },
          { path: "customize", element: <Customize /> },
        ],
      },
      {
        path: "/goals",
        element: <Goals />,
        children: [
          {
            path: "totaltime",
            element: (
              <TotalTime
                text="전체 사용 시간"
                goal={{ hours: 4, minutes: 0 }}
              />
            ),
          },
          {
            path: "maxtime",
            element: (
              <TotalTime
                text="최대 사용 시간"
                goal={{ hours: 3, minutes: 0 }}
              />
            ),
          },
          {
            path: "avgtime",
            element: <TotalTime text="평균 사용 시간" />,
          },
          { path: "downtime", element: <DownTime /> },
        ],
      },
      { path: "/settings", element: <Settings /> },
    ],
  },
]);

function App() {
  return (
    <MotionConfig transition={{ stiffness: 1000, damping: 100 }}>
      <RouterProvider router={router} />
    </MotionConfig>
  );
}

export default App;
