import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Home, Goal, Settings } from "./pages";
import { Layout } from "./components/Layout.tsx";

// import Example from "./Example.tsx";

const router = createBrowserRouter([{
  path: "/",
  element: <Layout/>,
  children: [
    { path: "/", element: <Home/> },
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
