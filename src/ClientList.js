// src/ClientList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const backendUrl = 'http://localhost:3000'; // Replace with your backend URL

const ClientList = ({ onClientRemoved }) => {
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
  }, [onClientRemoved]); // Update client list when a client is removed

  const handleRemoveClient = async (clientId) => {
    try {
      const response = await axios.delete(`${backendUrl}/clients/${clientId}`);
      console.log('Client removed:', response.data);
      onClientRemoved(clientId); // Notify parent component about removed client
    } catch (error) {
      console.error('Error removing client:', error);
    }
  };

  return (
    <div>
      <h2>Client List</h2>
      <ul>
        {clients.map((client) => (
          <li key={client.id}>
            {client.fullname} - {client.project}{' '}
            <button onClick={() => handleRemoveClient(client.id)}>Remove Client</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClientList;
