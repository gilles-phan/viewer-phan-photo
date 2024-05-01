import { useEffect, useState } from "react";
import { getHeader } from "../Shooting/Shooting.utils";
import { ShootingProps } from "./Shootings.interface";

export const Shootings = () => {
  const [shootings, setShootings] = useState<ShootingProps[]>([]);

  useEffect(() => {
    fetch("../data/mockShootings.json", { headers: getHeader() })
      .then((response) => response.json())
      .then((data) => {
        setShootings(data);
        console.log(data);
      });
  }, []);
  return (
    <>
      <h1>Shootings</h1>
      <ul>
        {shootings
          .sort(
            (s1, s2) =>
              new Date(s1.date).getTime() - new Date(s2.date).getTime()
          )
          .map((shooting, id) => (
            <li key={id}>
              <a href={`shooting/${shooting.uuid}`}>{shooting.label}</a>
            </li>
          ))}
      </ul>
    </>
  );
};
