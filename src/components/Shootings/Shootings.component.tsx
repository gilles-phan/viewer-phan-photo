import { useEffect, useState } from "react";
import { getHeader } from "../Shooting/Shooting.utils";
import { ShootingProps } from "./Shootings.interface";
import "./Shootings.scss";
import { sortByShootingDate } from "./Shootings.utils";
import { ShootingCard } from "./ShootingCard.component";

export const Shootings = () => {
  const [shootings, setShootings] = useState<ShootingProps[]>([]);

  useEffect(() => {
    fetch("../data/mockShootings.json", { headers: getHeader() })
      .then((response) => response.json())
      .then((data) => {
        setShootings(data);
      });
  }, []);
  return (
    <div className="shootings-wrapper">
      <h1>Shootings</h1>
      <div className="cards">
        {shootings.sort(sortByShootingDate).map((shooting, id) => (
          <ShootingCard key={id} shooting={shooting} />
        ))}
      </div>
    </div>
  );
};
