import { useEffect, useState } from "react";
import { ShootingProps } from "./Shootings.interface";
import "./Shootings.scss";
import { sortByShootingDate } from "./Shootings.utils";
import { EventCard } from "./EventCard.component";

/**
 * TODO: à supprimer définitivement !!
 * @returns
 */
export const Shootings = () => {
  const [shootings, setShootings] = useState<ShootingProps[]>([]);
  const [filter, setFilter] = useState("");

  const search = (e: React.FormEvent<HTMLInputElement>) => {
    const searchValue = e.currentTarget.value.toLowerCase();
    setFilter(searchValue);
  };

  const clearSearch = () => setFilter("");

  const filterBySearch = (shooting: ShootingProps) =>
    shooting.date.toLowerCase().includes(filter) ||
    shooting.description.toLowerCase().includes(filter) ||
    shooting.label.toLowerCase().includes(filter);

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
      <h1>Shootings (ancienne version)</h1>

      <div className="search-bar">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Rechercher"
            aria-label="Rechercher"
            value={filter}
            onChange={search}
          />
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={clearSearch}
          >
            X
          </button>
        </div>
      </div>

      <div className="cards">
        {shootings
          .filter(filterBySearch)
          .sort(sortByShootingDate)
          .reverse()
          .map((shooting, id) => (
            <EventCard key={id} shooting={shooting} />
          ))}
      </div>
    </div>
  );
};
