import React from "react";
import instance from "../api/axiosInstance";
import { useHistory, Link } from "react-router-dom";

function Header(params) {
  const history = useHistory();
  const logout = () => {
    instance
      .get("/logout")
      .then(() => history.push("/login"))
      .catch((err) => console.log(err));
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark static-top">
      <div className="container">
        <a className="navbar-brand" href="#">
          Administration
        </a>
        <button
          className="navbar-toggler alert-danger"
          type="button"
          data-toggle="collapse"
          data-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item ">
              <Link className="nav-link" to="/speakers">
                Speakers
                <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/speakers/add">
                add speakers
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/events">
                Events
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/events/add">
                Add Events
              </Link>
            </li>
            <li>
              <a
                type="button"
                className="btn btn-warning  ml-5"
                onClick={logout}
              >
                LOGOUT
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
