import React, { useContext, useState } from "react";
import "./GlobalNav.css";
import { Link } from "react-router-dom";
import logo from "../../img/cover.png";
import { AuthContext } from "../../context/AuthContext";

const GlobalNav = () => {
  const [color, setColor] = useState(false);

  const changeColor = () => {
    if (window.scrollY >= 70) {
      setColor(true);
    } else {
      setColor(false);
    }
  };
  window.addEventListener("scroll", changeColor);

  const { user } = useContext(AuthContext);

  return (
    <>
      <nav
        className="navbar navbar-expand-lg fixed-top "
        id={color ? "nabvarNotColor" : "navbarBg"}
      >
        <div className="container">
          <Link to="/" className="navbar-brand logo">
            <img src={logo} alt="" className="nav-logo" />
            <small className="nav__text">GET BEST HOTEL</small>
          </Link>
          <button
            className="navbar__toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span>
              <i className="fa-solid fa-bars-staggered" />
            </span>
          </button>
          {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                        <span>
                            <i className="fa-solid fa-bars-staggered bars"></i>
                        </span>
                    </button> */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link to="/" className="nav-link" aria-current="page" id="home">
                  HOME
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/contactus"
                  className="nav-link active"
                  aria-current="page"
                  id="Gnav-items"
                >
                  CONTACT US
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/"
                  className="nav-link active"
                  aria-current="page"
                  id="Gnav-items"
                >
                  BOOK ONLINE
                </Link>
              </li>
              {user ? (
                <li className="nav-item">
                  <Link
                    to="/dashboard/home"
                    className="nav-link active"
                    aria-current="page"
                    id="Gnav-items"
                  >
                    DASHBOARD
                  </Link>
                </li>
              ) : (
                " "
              )}
              <li className="nav-item">
                {user ? (
                  <Link
                    to="/"
                    className="nav-link active"
                    id="Gnav-items"
                    aria-current="page"
                  >
                    {user.username.toUpperCase()}
                  </Link>
                ) : (
                  <Link
                    to="/login"
                    className="nav-link active"
                    aria-current="page"
                    id="Gnav-items"
                  >
                    LOGIN
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default GlobalNav;
