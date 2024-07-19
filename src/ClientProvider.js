// ClientProvider.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const backendUrl = 'http://localhost:3000'; // Replace with your backend URL

export const ClientContext = createContext();

export const ClientProvider = ({ children }) => {
  const [clients, setClients] = useState([]);

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
  }, []);

  const updateClientStatus = async (clientId, newStatus) => {
    try {
      await axios.put(`${backendUrl}/clients/${clientId}`, { conversation_status: newStatus });
      // Optimistically update local state
      setClients(clients.map(client => client.id === clientId ? { ...client, conversation_status: newStatus } : client));
    } catch (error) {
      console.error('Error updating client status:', error);
      // Handle error or rollback state if necessary
    }
  };

  return (
    <ClientContext.Provider value={{ clients, updateClientStatus }}>
      {children}
    </ClientContext.Provider>
  );
};
