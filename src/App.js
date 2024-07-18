// src/App.js
import React, { useState } from 'react';
import ClientForm from './ClientForm';
import RemoveClient from './RemoveClient';
import ClientList from './ClientList';
import HighQualityClients from './HighQualityClients';
import FinalizedDeals from './FinalizedDeals';
import PendingClients from './PendingClients';
import NavBar from './NavBar';
import './App.css'; // Import your CSS file for styling

const App = () => {
  const [showForm, setShowForm] = useState(false);
  const [showRemoveClient, setShowRemoveClient] = useState(false);
  const [showClientList, setShowClientList] = useState(false);
  const [showHighQualityClients, setShowHighQualityClients] = useState(false);
  const [showFinalizedDeals, setShowFinalizedDeals] = useState(false);
  const [showPendingClients, setShowPendingClients] = useState(false);

  const handleShowForm = () => {
    setShowForm(true);
    setShowRemoveClient(false);
    setShowClientList(false);
    setShowHighQualityClients(false);
    setShowFinalizedDeals(false);
    setShowPendingClients(false);
  };

  const handleShowRemoveClient = () => {
    setShowForm(false);
    setShowRemoveClient(true);
    setShowClientList(false);
    setShowHighQualityClients(false);
    setShowFinalizedDeals(false);
    setShowPendingClients(false);
  };

  const handleShowClientList = () => {
    setShowForm(false);
    setShowRemoveClient(false);
    setShowClientList(true);
    setShowHighQualityClients(false);
    setShowFinalizedDeals(false);
    setShowPendingClients(false);
  };

  const handleShowHighQualityClients = () => {
    setShowForm(false);
    setShowRemoveClient(false);
    setShowClientList(false);
    setShowHighQualityClients(true);
    setShowFinalizedDeals(false);
    setShowPendingClients(false);
  };

  const handleShowFinalizedDeals = () => {
    setShowForm(false);
    setShowRemoveClient(false);
    setShowClientList(false);
    setShowHighQualityClients(false);
    setShowFinalizedDeals(true);
    setShowPendingClients(false);
  };

  const handleShowPendingClients = () => {
    setShowForm(false);
    setShowRemoveClient(false);
    setShowClientList(false);
    setShowHighQualityClients(false);
    setShowFinalizedDeals(false);
    setShowPendingClients(true);
  };

  return (
    <div className="app">
      <NavBar
        onShowForm={handleShowForm}
        onShowRemoveClient={handleShowRemoveClient}
        onShowClientList={handleShowClientList}
        onShowHighQualityClients={handleShowHighQualityClients}
        onShowFinalizedDeals={handleShowFinalizedDeals}
        onShowPendingClients={handleShowPendingClients}
      />
      <div className="centered-text">
        <h1 className="rotate-text">In-House Sales Department Client Management</h1>
      </div>
      {showForm && <ClientForm />}
      {showRemoveClient && <RemoveClient />}
      {showClientList && <ClientList />}
      {showHighQualityClients && <HighQualityClients />}
      {showFinalizedDeals && <FinalizedDeals />}
      {showPendingClients && <PendingClients />}
    </div>
  );
};

export default App;
