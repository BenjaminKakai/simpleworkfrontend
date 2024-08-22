// src/App.js
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
import Login from './Login';
import axiosInstance from './api';  // Import axiosInstance from api.js
import './App.css';

const App = () => {
  const [activeView, setActiveView] = useState('home');
  const [clients, setClients] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      fetchClients();
    }
  }, []);

  const fetchClients = async () => {
    try {
      const response = await axiosInstance.get('/clients');
      setClients(response.data);
    } catch (error) {
      console.error('Error fetching clients:', error.response?.data || error.message);
      if (error.response?.status === 401) {
        // Handle unauthorized error, maybe redirect to login or refresh token
        setIsLoggedIn(false);
      }
    }
  };

  const handleLoginSuccess = (token) => {
    localStorage.setItem('token', token);
    setIsLoggedIn(true);
    fetchClients();
  };

  const handleShowView = (view) => {
    setActiveView(view);
  };

  const handleHomeClick = () => {
    setActiveView('home');
    setShowOverlay(true);
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
          {isLoggedIn ? (
            <>
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
            </>
          ) : (
            <Login onLoginSuccess={handleLoginSuccess} />
          )}
        </ErrorBoundary>
      </div>
    </ClientProvider>
  );
};

export default App;
