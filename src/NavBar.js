import React, { useState } from 'react';
import './NavBar.css'; // Import the NavBar-specific CSS

const NavBar = ({
  onShowForm,
  onShowRemoveClient,
  onShowClientList,
  onShowHighQualityClients,
  onShowFinalizedDeals,
  onShowPendingClients,
  onHomeClick,
}) => {
  const [activeTab, setActiveTab] = useState(null);

  const handleButtonClick = (tab) => {
    setActiveTab(tab === activeTab ? null : tab); // Toggle tab
    switch (tab) {
      case 'form':
        onShowForm();
        break;
      case 'removeClient':
        onShowRemoveClient();
        break;
      case 'clientList':
        onShowClientList();
        break;
      case 'highQualityClients':
        onShowHighQualityClients();
        break;
      case 'finalizedDeals':
        onShowFinalizedDeals();
        break;
      case 'pendingClients':
        onShowPendingClients();
        break;
      default:
        break;
    }
  };

  const handleHomeClick = () => {
    setActiveTab(null); // Collapse all tabs
    onHomeClick(); // Notify parent to collapse tabs and reset view
  };

  // Ensure form is shown immediately when 'form' tab is clicked
  const handleFormClick = () => {
    setActiveTab('form'); // Set 'form' as active tab
    onShowForm(); // Show the form immediately
  };

  return (
    <div className="navbar">
      <button onClick={handleHomeClick}>Home</button>
      <button className={activeTab === 'form' ? 'active' : ''} onClick={handleFormClick}>
        New Client
      </button>
      <button className={activeTab === 'removeClient' ? 'active' : ''} onClick={() => handleButtonClick('removeClient')}>
        Remove Client
      </button>
      <button className={activeTab === 'clientList' ? 'active' : ''} onClick={() => handleButtonClick('clientList')}>
        Client List
      </button>
      <button className={activeTab === 'highQualityClients' ? 'active' : ''} onClick={() => handleButtonClick('highQualityClients')}>
        High Quality Clients
      </button>
      <button className={activeTab === 'finalizedDeals' ? 'active' : ''} onClick={() => handleButtonClick('finalizedDeals')}>
        Finalized Deals
      </button>
      <button className={activeTab === 'pendingClients' ? 'active' : ''} onClick={() => handleButtonClick('pendingClients')}>
        Pending Clients
      </button>
    </div>
  );
};

export default NavBar;
