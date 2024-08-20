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
import Login from './Login';  // Import Login component
import axios from 'axios';
import AuthService from './AuthService'; // Import AuthService
import './App.css';

// Initialize Axios instance and setup interceptors
const axiosInstance = axios.create();
AuthService.setupInterceptors(axiosInstance);

const backendUrl = 'https://simple-work-database-24wn6b3nw-benjaminkakais-projects.vercel.app';

const App = () => {
  const [activeView, setActiveView] = useState('home');
  const [clients, setClients] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
  const [showOverlay, setShowOverlay] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      fetchClients(token);
    }
  }, []);

  const fetchClients = async (token) => {
    try {
      const response = await axiosInstance.get(`${backendUrl}/clients`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setClients(response.data);
    } catch (error) {
      console.error('Error fetching clients:', error);
    }
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    fetchClients(localStorage.getItem('token'));
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
