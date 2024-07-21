import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const backendUrl = 'http://localhost:3000'; // Replace with your backend URL

export const ClientContext = createContext();

export const ClientProvider = ({ children }) => {
  const [clients, setClients] = useState([]);
  const [clientStatusUpdated, setClientStatusUpdated] = useState(false);

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
  }, [clientStatusUpdated]); // Dependency array now includes clientStatusUpdated

  const addClient = (newClient) => {
    setClients(prevClients => [...prevClients, newClient]);
  };

  const removeClient = (clientId) => {
    setClients(prevClients => prevClients.filter(client => client.id !== clientId));
  };

  const updateClientStatus = async (clientId, status) => {
    try {
      const response = await axios.post(`${backendUrl}/clients/${clientId}/status`, { status });
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
