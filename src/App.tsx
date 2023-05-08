import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Home, Goal, Settings } from "./pages";
import { Layout } from "./components/Layout";
import { TotalUsage } from "./pages/home/TotalUsage";

// import Example from "./Example.tsx";

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
      { path: "/goal", element: <Goal/> },
      { path: "/settings", element: <Settings/> },
    ],
  }]);

function App() {

  return (
    <>
      <RouterProvider router={router}/>
    </>
  );
}

export default App;
