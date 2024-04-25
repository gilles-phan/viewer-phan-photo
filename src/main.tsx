import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Home } from "./components/Home/Home.component.tsx";
import { Menu } from "./components/Menu/Menu.component.tsx";
import { Viewer } from "./components/Viewer/Viewer.component.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/viewer/:key",
    element: <Viewer />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Menu />
    <RouterProvider router={router} />
  </React.StrictMode>
);
