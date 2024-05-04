import { ShootingCardProps } from "./Shootings.interface";
import { formatDate, getPathFromShooting } from "./Shootings.utils";

export const ShootingCard = ({ shooting }: ShootingCardProps) => {
  return (
    !shooting.hidden && (
      <div className="card">
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
            <a href={`shooting/${shooting.uuid}`} className="btn btn-primary">
              Accès
            </a>
          </div>
        </div>
      </div>
    )
  );
};
