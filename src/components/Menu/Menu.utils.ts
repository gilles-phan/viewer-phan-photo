import { Home } from "../Home/Home.component";
import { Shooting } from "../Shooting/Shooting.component";
import { Shootings } from "../Shootings/Shootings.component";
import ShootingsV2 from "../ShootingsV2/ShootingsV2.component";

export const navigation = [
  { id: 0, link: "/home", label: "Accueil", component: Home },
  { id: 1, link: "/shootings", label: "Shootings", component: Shootings },
  { id: 2, link: "/shooting", label: "Shooting", component: Shooting, hidden: true },
  { id: 3, link: "/shootings-v2", label: "Shootings (v2)", component: ShootingsV2 },
];
