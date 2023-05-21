import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Home, Goals, Settings } from "./pages";
import { Layout } from "./components/Layout";
import { TotalUsage } from "./pages/home/TotalUsage";
import { MotionConfig } from "framer-motion";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
      {
        path: "/",
        element: <Home/>,
        children: [
          { path: "/total", element: <TotalUsage/> },
        ],
      },
      { path: "/goals", element: <Goals/> },
      { path: "/settings", element: <Settings/> },
    ],
  }]);

function App() {

  return (
    <MotionConfig transition={{ stiffness: 1000, damping: 100 }}>
      <RouterProvider router={router}/>
    </MotionConfig>
  );
}

export default App;
