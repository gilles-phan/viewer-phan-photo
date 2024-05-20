import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Home } from "./components/Home/Home.component.tsx";
import { Menu } from "./components/Menu/Menu.component.tsx";
import { Shooting } from "./components/Shooting/Shooting.component.tsx";
import { Shootings } from "./components/Shootings/Shootings.component.tsx";
import { Login } from "./components/Login/Login.component.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/shootings",
    element: <Shootings />,
  },
  {
    path: "/shooting/:uuid",
    element: <Shooting />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Menu />
    <RouterProvider router={router} />
  </React.StrictMode>
);
