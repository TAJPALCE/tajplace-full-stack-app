import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Sidebar from '../Sidebar/Sidebar';
import Topbar from '../Topbar/Topbar';
import './DashHome.css';

const DashHome = () => {
  const { user } = useContext(AuthContext)
  const [sidebarOpen, setsidebarOpen] = useState(false);
  const openSidebar = () => {
    setsidebarOpen(true);
  };
  const closeSidebar = () => {
    setsidebarOpen(false);
  };
  return (
    <div className="dash__home">
      <Topbar sidebarOpen={sidebarOpen} openSidebar={openSidebar} />
      <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
      <div className="welcome__text">
        <h3 className="welcome__title">
          <b>{user.username} </b> Welcome to the Dashboard
        </h3>
      </div>
    </div>
  )
}

export default DashHome