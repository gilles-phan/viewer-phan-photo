import { useEffect, useState } from "react";
import { ShootingProps } from "./Shootings.interface";
import "./Shootings.scss";
import { sortByShootingDate } from "./Shootings.utils";
import { ShootingCard } from "./ShootingCard.component";

export const Shootings = () => {
  const [shootings, setShootings] = useState<ShootingProps[]>([]);

  useEffect(() => {
    fetch(
      "https://viewer.gils.xyz/backend/shooting/get-all.php" /*, { headers: getHeader() }*/
    )
      .then((response) => response.json())
      .then((data) => {
        setShootings(data.data);
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
