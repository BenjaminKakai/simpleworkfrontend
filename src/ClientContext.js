// src/ClientContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const backendUrl = 'http://localhost:3000';

const ClientContext = createContext();

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

  const updateClientStatus = async (clientId, updatedStatus) => {
    try {
      const response = await axios.put(`${backendUrl}/clients/${clientId}`, { conversation_status: updatedStatus });
      console.log('Client status updated:', response.data);
      // Update the client status locally
      setClients(clients.map(client => (client.id === clientId ? { ...client, conversation_status: updatedStatus } : client)));
    } catch (error) {
      console.error('Error updating client status:', error);
    }
  };

  return (
    <ClientContext.Provider value={{ clients, updateClientStatus }}>
      {children}
    </ClientContext.Provider>
  );
};

export default ClientContext;
