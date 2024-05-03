import { useEffect, useState } from "react";
import { getHeader } from "../Shooting/Shooting.utils";
import { ShootingProps } from "./Shootings.interface";
import "./Shootings.scss";

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
    <div className="shootings-wrapper">
      <h1>Shootings</h1>
      <div className="cards">
        {shootings
          .sort(
            (s1, s2) =>
              new Date(s1.date).getTime() - new Date(s2.date).getTime()
          )
          .map((shooting, id) => (
            <div key={id} className="card">
              {/* <img src="..." className="card-img-top" alt="..." /> */}
              <div className="card-body">
                <h5 className="card-title">{shooting.label}</h5>
                {/* <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p> */}
                <div className="text-end">
                  <a
                    href={`shooting/${shooting.uuid}`}
                    className="btn btn-primary"
                  >
                    Accès
                  </a>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
