// src/ClientProvider.js
import React, { createContext, useState, useEffect } from 'react';
import axiosInstance from './api';

export const ClientContext = createContext();

export const ClientProvider = ({ children }) => {
  const [clients, setClients] = useState([]);
  const [clientStatusUpdated, setClientStatusUpdated] = useState(false);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axiosInstance.get('/clients');
        setClients(response.data);
      } catch (error) {
        console.error('Error fetching clients:', error);
        if (error.response && error.response.status === 403) {
          // Handle forbidden error, maybe redirect to login
          localStorage.removeItem('token');
          window.location.href = '/login';
        }
      }
    };

    fetchClients();
  }, [clientStatusUpdated]);

  const addClient = (newClient) => {
    setClients(prevClients => [...prevClients, newClient]);
  };

  const removeClient = (clientId) => {
    setClients(prevClients => prevClients.filter(client => client.id !== clientId));
  };

  const updateClientStatus = async (clientId, status) => {
    try {
      const response = await axiosInstance.post(`/clients/${clientId}/status`, { status });
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
    <ClientContext.Provider value={{ clients, addClient, removeClient, updateClientStatus, clientStatusUpdated }}>
      {children}
    </ClientContext.Provider>
  );
};
