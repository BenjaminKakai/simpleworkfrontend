import React, { useState, useEffect } from 'react';
import ErrorBoundary from './ErrorBoundary';
import { ClientProvider } from './ClientProvider';
import ClientForm from './ClientForm';
import RemoveClient from './RemoveClient';
import ClientList from './ClientList';
import HighQualityClients from './HighQualityClients';
import FinalizedDeals from './FinalizedDeals';
import PendingClients from './PendingClients';
import NavBar from './NavBar';
import Footer from './Footer';
import axios from 'axios';
import './App.css';

const backendUrl = 'http://localhost:3000'; // Replace with your backend URL

const App = () => {
  const [activeView, setActiveView] = useState('home');
  const [clients, setClients] = useState([]);
  const [showOverlay, setShowOverlay] = useState(false); // State for overlay visibility

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get(`${backendUrl}/clients`);
        setClients(response.data);
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    };

    fetchClients();
  }, []); // No dependencies needed for initial fetch

  const handleShowView = (view) => {
    setActiveView(view);
  };

  const handleHomeClick = () => {
    setActiveView('home');
    setShowOverlay(true); // Show the overlay when 'home' is clicked
    setTimeout(() => setShowOverlay(false), 2000); // Hide the overlay after 2 seconds
  };

  const handleClientAdded = (newClient) => {
    setClients((prevClients) => [...prevClients, newClient]);
  };

  const handleClientRemoved = (removedClientId) => {
    setClients((prevClients) => prevClients.filter(client => client.id !== removedClientId));
  };

  return (
    <ClientProvider>
      <div className="app">
        {showOverlay && (
          <div className="home-overlay">
            <span className="beating-text">TANGENT</span>
          </div>
        )}
        <ErrorBoundary>
          <NavBar
            onShowForm={() => handleShowView('form')}
            onShowRemoveClient={() => handleShowView('removeClient')}
            onShowClientList={() => handleShowView('clientList')}
            onShowHighQualityClients={() => handleShowView('highQualityClients')}
            onShowFinalizedDeals={() => handleShowView('finalizedDeals')}
            onShowPendingClients={() => handleShowView('pendingClients')}
            onHomeClick={handleHomeClick}
          />
          <div className="main-content">
            <div className="centered-text" style={{ marginTop: '100px', color: 'orange' }}>
              <h1 className="rotate-text" style={{ fontSize: '24px', animation: 'rotate 20s infinite linear' }}>Sales Department</h1>
            </div>
            {activeView === 'home' && <h2>Welcome to the Sales Department</h2>}
            {activeView === 'form' && <ClientForm onClientAdded={handleClientAdded} goToHome={handleHomeClick} />}
            {activeView === 'removeClient' && <RemoveClient onClientRemoved={handleClientRemoved} />}
            {activeView === 'clientList' && <ClientList onClientRemoved={handleClientRemoved} />}
            {activeView === 'highQualityClients' && <HighQualityClients />}
            {activeView === 'finalizedDeals' && <FinalizedDeals />}
            {activeView === 'pendingClients' && <PendingClients />}
          </div>
          <Footer />
        </ErrorBoundary>
      </div>
    </ClientProvider>
  );
};

export default App;
