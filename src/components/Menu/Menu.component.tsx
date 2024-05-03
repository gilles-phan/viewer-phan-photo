import { Fragment } from "react/jsx-runtime";
import { navigation } from "./Menu.utils";

export const Menu = () => {
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
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {navigation.map((item, id) => (
              <Fragment key={id}>
                {!item.hidden && (
                  <li key={id} className="nav-item">
                    <a className="nav-link" href={item.link}>
                      {item.label}
                    </a>
                  </li>
                )}
              </Fragment>
            ))}
          </ul>
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>

    //  <div className="menu">
    //   <div className="logo">logo</div>
    //   {navigation.map((item, id) => {
    //     if (item.hidden) {
    //       return <Fragment key={id}></Fragment>;
    //     } else {
    //       return (
    //         <div key={id} className="menu-item">
    //           <a href={item.link}>{item.label}</a>
    //         </div>
    //       );
    //     }
    //   })}
    // </div>
  );
};
