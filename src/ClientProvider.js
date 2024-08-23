// src/ClientProvider.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import axiosInstance from './api';

export const ClientContext = createContext();

export const ClientProvider = ({ children }) => {
  const [clients, setClients] = useState([]);
  const [clientStatusUpdated, setClientStatusUpdated] = useState(false);

  // Create Axios instance with interceptors
  const axiosInstance = axios.create({
    baseURL: 'https://simple-work-database.vercel.app',
  });

  axiosInstance.interceptors.request.use(
    config => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    response => response,
    error => {
      console.error('API request failed:', error);
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axiosInstance.get('/clients');
        setClients(response.data);
      } catch (error) {
        console.error('Error fetching clients:', error);
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
