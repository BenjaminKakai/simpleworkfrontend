// src/RemoveClient.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const backendUrl = 'http://localhost:3000'; // Replace with your backend URL

const RemoveClient = () => {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState('');

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

  const handleRemove = async () => {
    try {
      const response = await axios.delete(`${backendUrl}/clients/${selectedClient}`);
      console.log('Client removed:', response.data); // Log success message
      // Optionally update client list or handle success
    } catch (error) {
      console.error('Error removing client:', error);
    }
  };

  return (
    <div>
      <h2>Remove Client</h2>
      <select value={selectedClient} onChange={(e) => setSelectedClient(e.target.value)}>
        <option value="">Select Client</option>
        {clients.map((client) => (
          <option key={client.id} value={client.id}>
            {client.fullname}
          </option>
        ))}
      </select>
      <button onClick={handleRemove} disabled={!selectedClient}>Remove Client</button>
    </div>
  );
};

export default RemoveClient;
