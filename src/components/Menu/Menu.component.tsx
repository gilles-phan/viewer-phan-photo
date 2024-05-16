import { Fragment } from "react/jsx-runtime";
import { navigation } from "./Menu.utils";
import { useState } from "react";

export const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Viewer
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded={isOpen ? "true" : "false"}
          aria-label="Toggle navigation"
          onClick={() => setIsOpen((isOpen) => !isOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`navbar-collapse${isOpen ? "" : " collapse"}`}
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {navigation.map(({ hidden, link, label }, id) => (
              <Fragment key={id}>
                {!hidden && (
                  <li key={id} className="nav-item">
                    <a className="nav-link" href={link}>
                      {label}
                    </a>
                  </li>
                )}
              </Fragment>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};
