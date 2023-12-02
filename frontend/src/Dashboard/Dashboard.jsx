import React, { useState } from 'react';
import './Dashboard.css';
import Sidebar from './Sidebar/Sidebar';
import Topbar from './Topbar/Topbar';

const Dashboard = () => {
  const [sidebarOpen, setsidebarOpen] = useState(false);
  const openSidebar = () => {
    setsidebarOpen(true);
  };
  const closeSidebar = () => {
    setsidebarOpen(false);
  };
  return (
    <>
      <Topbar sidebarOpen={sidebarOpen} openSidebar={openSidebar} />
      <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar}/>
    </>
  )
}

export default Dashboard