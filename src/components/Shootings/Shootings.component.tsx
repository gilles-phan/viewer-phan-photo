import { useEffect, useState } from "react";
import { getHeader } from "../Shooting/Shooting.utils";
import { ShootingProps } from "./Shootings.interface";
import "./Shootings.scss";
import {
  formatDate,
  getPathFromShooting,
  sortByShootingDate,
} from "./Shootings.utils";

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
          <div key={id} className="card">
            {shooting.imagePath && (
              <img
                src={getPathFromShooting(shooting)}
                className="card-img-top"
                alt="..."
              />
            )}
            <div className="card-body">
              <h5 className="card-title">{shooting.label}</h5>
              <h6 className="card-subtitle mb-2 text-body-secondary">
                {formatDate(shooting.date)}
              </h6>

              {shooting.description && (
                <p className="card-text">{shooting.description}</p>
              )}
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
