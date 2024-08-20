// src/ClientContext.js
import React, { createContext, useState, useEffect } from 'react';
import axiosInstance from './api'; // Updated import

const defaultContextValue = {
  clients: [],
  updateClientStatus: () => {},
  clientStatusUpdated: false
};

const ClientContext = createContext(defaultContextValue);

export const ClientProvider = ({ children }) => {
  const [clients, setClients] = useState([]);
  const [clientStatusUpdated, setClientStatusUpdated] = useState(false);

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
  }, [clientStatusUpdated]); // Re-fetch clients whenever the status is updated

  const updateClientStatus = async (clientId, updatedStatus) => {
    try {
      const response = await axiosInstance.put(`/clients/${clientId}`, { conversation_status: updatedStatus }); // Updated axios usage
      console.log('Client status updated:', response.data);
      setClientStatusUpdated(prev => !prev); // Toggle this value to trigger re-renders
    } catch (error) {
      console.error('Error updating client status:', error);
    }
  };

  return (
    <ClientContext.Provider value={{ clients, updateClientStatus, clientStatusUpdated }}>
      {children}
    </ClientContext.Provider>
  );
};

export default ClientContext;
