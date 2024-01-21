import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import logo from "../../img/cover.png";
import "./Navabr.css";

const Navbar = () => {
  const { user, dispatch } = useContext(AuthContext);
  console.log(user, "user here");
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };
  return (
    <div className="container navcolor">
      <nav className="navbar navbar-expand-lg navbar-light sticky-top">
        <div className="container-fluid bg-none">
          <Link to="/" className="navbar-brand">
            <img src={logo} alt="" className="nav-logo" />
            <small className="nav__text">GET BEST HOTEL</small>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span>
              <i className="fa-solid fa-bars-staggered bars"></i>
            </span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex justify-content-center align-items-center">
              {user ? (
                <>
                  <li>
                    <Link
                      to="/dashboard/home"
                      className="nav-link active"
                      aria-current="page"
                    >
                      <button className="btn__nav">Dashboard</button>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <button to="/" className="btn__nav" onClick={handleLogout}>
                      Logout from{" "}
                      {user.username.charAt(0).toUpperCase() +
                        user.username.slice(1)}
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item" id="nav_item">
                    <Link
                      to="/login"
                      className="nav-link active"
                      aria-current="page"
                    >
                      <button className="btn__nav">Login</button>
                    </Link>
                  </li>
                  <li className="nav-item" id="nav_item">
                    <Link
                      to="/signup"
                      className="nav-link active"
                      aria-current="page"
                    >
                      <button className="btn__nav">Register</button>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
