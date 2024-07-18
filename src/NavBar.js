// src/NavBar.js
import React from 'react';

const NavBar = ({ onShowForm, onShowRemoveClient, onShowClientList, onShowHighQualityClients, onShowFinalizedDeals, onShowPendingClients }) => {
  return (
    <div className="navbar">
      <button onClick={onShowForm}>Show Form</button>
      <button onClick={onShowRemoveClient}>Show Remove Client</button>
      <button onClick={onShowClientList}>Show Client List</button>
      <button onClick={onShowHighQualityClients}>Show High Quality Clients</button>
      <button onClick={onShowFinalizedDeals}>Show Finalized Deals</button>
      <button onClick={onShowPendingClients}>Show Pending Clients</button>
    </div>
  );
};

export default NavBar;
