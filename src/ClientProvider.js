import React, { createContext, useState, useEffect } from 'react';
import axios from './utils/axiosConfig'; // Updated to use custom axios configuration

const backendUrl = 'http://localhost:3000';

export const ClientContext = createContext();

export const ClientProvider = ({ children }) => {
  const [clients, setClients] = useState([]);
  const [clientStatusUpdated, setClientStatusUpdated] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication status
  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('Current token:', token); // Debug log
    setIsAuthenticated(!!token);
  }, []);

  // Single useEffect for fetching clients
  useEffect(() => {
    const fetchClients = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        console.log('No token found, skipping fetch');
        return;
      }

      try {
        console.log('Fetching with token:', token); // Debug log
        const response = await axios.get(`${backendUrl}/clients`);
        console.log('Fetch response:', response.data); // Debug log
        setClients(response.data);
      } catch (error) {
        console.error('Error fetching clients:', error.response?.data || error);
        if (error.response?.status === 403) {
          // Token might be invalid
          localStorage.removeItem('token');
          setIsAuthenticated(false);
        }
      }
    };

    if (isAuthenticated) {
      fetchClients();
    }
  }, [clientStatusUpdated, isAuthenticated]);

  const addClient = (newClient) => {
    setClients(prevClients => [...prevClients, newClient]);
  };

  const removeClient = (clientId) => {
    setClients(prevClients => prevClients.filter(client => client.id !== clientId));
  };

  const updateClientStatus = async (clientId, status) => {
    try {
      const response = await axios.post(
        `${backendUrl}/clients/${clientId}/status`, 
        { status }
      );
      
      setClients(prevClients =>
        prevClients.map(client =>
          client.id === clientId ? { ...client, conversation_status: status } : client
        )
      );
      setClientStatusUpdated(prev => !prev);
      return response.data;
    } catch (error) {
      console.error('Error updating client status:', error);
      throw error;
    }
  };

  return (
    <ClientContext.Provider value={{ 
      clients, 
      addClient, 
      removeClient, 
      updateClientStatus, 
      clientStatusUpdated,
      isAuthenticated 
    }}>
      {children}
    </ClientContext.Provider>
  );
};
