import { Link, useSearchParams } from "react-router-dom";
import { ShootingCardProps } from "./Shootings.interface";
import { formatDate, getPathFromShooting } from "./Shootings.utils";
import Icon from "../../icons/Icon.component";

export const ShootingCard = ({ shooting }: ShootingCardProps) => {
  const [searchParams] = useSearchParams();
  const showHidden = searchParams.get("showHidden") === "true";

  return (
    (showHidden || !shooting.hidden) && (
      <div className="card">
        {shooting.image_path && (
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
            <Link className="btn btn-outline-primary" to={`${shooting.uuid}`}>
              <Icon icon="arrow-right" size={1} />
            </Link>
          </div>
        </div>
      </div>
    )
  );
};
