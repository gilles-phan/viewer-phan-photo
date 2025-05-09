import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Home } from "./components/Home/Home.component.tsx";
import { Menu } from "./components/Menu/Menu.component.tsx";
import { Shooting } from "./components/Shooting/Shooting.component.tsx";
import { Shootings } from "./components/Shootings/Shootings.component.tsx";
import { Login } from "./components/Login/Login.component.tsx";
import ShootingsV2 from "./components/ShootingsV2/ShootingsV2.component.tsx";
import ShootingV2 from "./components/ShootingsV2/ShootingV2.component.tsx";
import ShootingsV3 from "./components/ShootingsV3/ShootingsV3.component.tsx";

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
    path: "/shootings-old",
    element: <Shootings />,
  },
  {
    path: "/shootings-old/:uuid",
    element: <Shooting />,
  },
  {
    path: "/shootings",
    element: <ShootingsV2 />,
  },
  {
    path: "/shootings/:uuid",
    element: <ShootingV2 />,
  },
  {
    path: "/shootings-next",
    element: <ShootingsV3 />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Menu />
    <RouterProvider router={router} />
  </React.StrictMode>
);
