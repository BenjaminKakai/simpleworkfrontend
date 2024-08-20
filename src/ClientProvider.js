// src/ClientProvider.js
import React, { createContext, useState, useEffect } from 'react';
import axiosInstance from './api'; // Updated import

export const ClientContext = createContext();

export const ClientProvider = ({ children }) => {
  const [clients, setClients] = useState([]);
  const [clientStatusUpdated, setClientStatusUpdated] = useState(false);

  // Function to get the JWT token from localStorage
  const getToken = () => localStorage.getItem('token');

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axiosInstance.get('/clients'); // Updated axios usage
        setClients(response.data);
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    };

    fetchClients();
  }, [clientStatusUpdated]); // Dependency array now includes clientStatusUpdated

  const addClient = (newClient) => {
    setClients(prevClients => [...prevClients, newClient]);
  };

  const removeClient = (clientId) => {
    setClients(prevClients => prevClients.filter(client => client.id !== clientId));
  };

  const updateClientStatus = async (clientId, status) => {
    try {
      const response = await axiosInstance.post(`/clients/${clientId}/status`, { status }); // Updated axios usage
      setClients(prevClients => 
        prevClients.map(client => 
          client.id === clientId ? { ...client, conversation_status: status } : client
        )
      );
      setClientStatusUpdated(prev => !prev); // Toggle this value to trigger re-renders
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
