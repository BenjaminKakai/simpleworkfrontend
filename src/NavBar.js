// src/NavBar.js
import React, { useState } from 'react';

const NavBar = ({
  onShowForm,
  onShowRemoveClient,
  onShowClientList,
  onShowHighQualityClients,
  onShowFinalizedDeals,
  onShowPendingClients,
}) => {
  const [activeTab, setActiveTab] = useState(null);

  const handleHomeClick = () => {
    setActiveTab(null); // Collapse all tabs
  };

  const handleButtonClick = (tab) => {
    setActiveTab(tab === activeTab ? null : tab); // Toggle tab
  };

  return (
    <div className="navbar">
      <button onClick={handleHomeClick}>Home</button>
      <button className={activeTab === 'form' ? 'active' : ''} onClick={() => handleButtonClick('form')}>
        Show Form
      </button>
      <button className={activeTab === 'removeClient' ? 'active' : ''} onClick={() => handleButtonClick('removeClient')}>
        Show Remove Client
      </button>
      <button className={activeTab === 'clientList' ? 'active' : ''} onClick={() => handleButtonClick('clientList')}>
        Show Client List
      </button>
      <button className={activeTab === 'highQualityClients' ? 'active' : ''} onClick={() => handleButtonClick('highQualityClients')}>
        Show High Quality Clients
      </button>
      <button className={activeTab === 'finalizedDeals' ? 'active' : ''} onClick={() => handleButtonClick('finalizedDeals')}>
        Show Finalized Deals
      </button>
      <button className={activeTab === 'pendingClients' ? 'active' : ''} onClick={() => handleButtonClick('pendingClients')}>
        Show Pending Clients
      </button>
    </div>
  );
};

export default NavBar;
