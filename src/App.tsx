import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Home, Goals, Settings } from "./pages";
import { Layout } from "./components/Layout";
import { TotalUsage } from "./pages/home/TotalUsage";
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
          { path: "/total", element: <TotalUsage /> },
          { path: "/customize", element: <Customize /> },
        ],
      },
      {
        path: "/goals",
        element: <Goals />,
        children: [
          { path: "/goals/totaltime", element: <TotalTime /> },
          { path: "/goals/downtime", element: <DownTime /> },
        ],
      },
      { path: "/settings", element: <Settings /> },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
