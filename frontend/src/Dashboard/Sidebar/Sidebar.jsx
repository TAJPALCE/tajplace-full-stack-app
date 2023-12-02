import React, { useContext } from "react";
import "./Sidebar.css";
import logo from "../../img/cover.png";
import { Link, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

import { AuthContext } from "../../context/AuthContext";

const Sidebar = ({ sidebarOpen, closeSidebar }) => {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  const token = JSON.parse(localStorage.getItem("token"));
  const decodedToken = jwt_decode(token);
  //    console.log(decodedToken.isAdmin)

  return (
    <>
      <div className="Sidebar" id={sidebarOpen ? "open" : ""}>
        <div className="sidebar__img">
          <img src={logo} alt="" className="sidebar__logo" />
          <i
            className="fa-solid fa-xmark close__icon"
            onClick={() => closeSidebar()}
          ></i>
        </div>
        <ul className="sidebar">
          <Link to="/" className="link">
            <li>
              <i className="fa-solid fa-house"></i> Home
            </li>
          </Link>
          <Link to="/dashboard/home" className="link">
            <li>
              <i className="fa-solid fa-house-chimney-user"></i> Dashboard
            </li>
          </Link>

          {decodedToken.isAdmin === true ? (
            <>
              <Link to="/addhotel" className="link">
                <li>
                  <i className="fa-solid fa-hotel"></i> Hotels
                </li>
              </Link>
              <Link to="/addRoom" className="link">
                <li>
                  <i className="fa-solid fa-bed"></i> Rooms
                </li>
              </Link>
              <Link to="/extraservices" className="link">
                <li>
                  <i className="fa-solid fa-shield"></i> Extra services
                </li>
              </Link>
              <Link to="/allbokings" className="link">
                <li>
                  <i className="fa-solid fa-shield"></i> All bookings
                </li>
              </Link>
              <Link to="/reviewmanage" className="link">
                <li>
                  <i className="fa-solid fa-comment"></i> Reviews
                </li>
              </Link>
              <Link to="/artlists" className="link">
                <li>
                  <i className="fa-solid fa-newspaper"></i> Articles
                </li>
              </Link>

              {/* <Link to="/admin" className="link">
                                    <li>
                                        <i className="fa-solid fa-shield"></i> Admin
                                    </li>
                                </Link> */}
            </>
          ) : (
            <>
              <Link to="/booked" className="link">
                <li>
                  <i className="fa-solid fa-bookmark"></i> Booked
                </li>
              </Link>
              <Link to="/reviews" className="link">
                <li>
                  <i className="fa-solid fa-bookmark"></i> Review
                </li>
              </Link>
            </>
          )}

          <li onClick={handleLogout}>
            <i className="fa-solid fa-arrow-right-from-bracket"></i> Logout
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
