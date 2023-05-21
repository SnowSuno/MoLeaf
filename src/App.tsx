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
          { path: "totaltime", element: <TotalTime /> },
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
      <RouterProvider router={router}/>
    </MotionConfig>
  );
}

export default App;
