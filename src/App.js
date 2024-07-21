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
  const [showOverlay, setShowOverlay] = useState(true); // Show overlay by default on launch

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

  useEffect(() => {
    // Show overlay when in home view
    if (activeView === 'home') {
      setShowOverlay(true);
    } else {
      setShowOverlay(false);
    }
  }, [activeView]); // Update overlay based on active view

  const handleShowView = (view) => {
    setActiveView(view);
  };

  const handleHomeClick = () => {
    setActiveView('home');
    setShowOverlay(true); // Show the overlay when 'home' is clicked
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
              <h1 className="rotate-text">Sales Department</h1>
            </div>
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
