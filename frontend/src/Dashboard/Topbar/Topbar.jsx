import React, { useContext } from 'react';
import './Topbar.css';
import logo from '../../img/user.png';
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const Topbar = ({ sidebarOpen, openSidebar }) => {
    const { user } = useContext(AuthContext)
    // console.log(openSidebar)

    return (
        <div className="topbar">
            <div className="topbar__container">
                <div className="bar">
                    <i className="fa-solid fa-bars bar__icon" onClick={() => openSidebar()}></i>
                </div>

                <div className="topbar__content">
                    <span className="topbar__name">{user.username}</span>
                    <button className="btn__notification">
                        <i className="fa-solid fa-bell bel_icon" />
                        <span className="position-absolute start-90 translate-middle badge rounded-pill bg-danger">
                            5+
                        </span>
                    </button>
                    <button className="btn__notification">
                        <i className="fa-solid fa-message messages__icon"></i>
                        <span className="position-absolute start-90 translate-middle badge rounded-pill bg-danger">
                            10+
                        </span>
                    </button>
                    <div className="topbar_user">
                        <Link to={`/singleUsers/${user._id}`} className="link">
                            {
                                user ?
                                <img src={user.img} alt="img" className="top__img" />
                                :
                                <img src={logo} alt="img" className="top__img" />
                            }
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Topbar