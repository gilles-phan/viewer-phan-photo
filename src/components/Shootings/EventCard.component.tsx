import { Link, useSearchParams } from "react-router-dom";
import { ShootingCardProps } from "./Shootings.interface";
import { formatDate, getPathFromShooting } from "./Shootings.utils";
import Icon from "../../icons/Icon.component";
import { Fragment } from "react/jsx-runtime";

export const EventCard = ({ shooting }: ShootingCardProps) => {
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
          <h5 className="card-title text-center display-6">{shooting.label}</h5>
          <h6 className="card-subtitle mb-2 text-body-secondary text-center">
            {formatDate(shooting.date)}
          </h6>

          {shooting.description && (
            <>
              <hr />
              <p className="card-text text-center">
                <em>{shooting.description}</em>
              </p>
            </>
          )}
        </div>
        <div className="card-footer">
          <div className="row">
            <div className="col pt-1">
              {shooting.tags?.map((tag, id) => (
                <Fragment key={id}>
                  <span className="badge text-bg-secondary">{tag}</span>{" "}
                </Fragment>
              ))}
            </div>
            <div className="col text-end ">
              <Link className="btn btn-outline-primary" to={`${shooting.uuid}`}>
                <Icon icon="arrow-right" size={1} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  );
};
