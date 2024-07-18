// src/PendingClients.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const backendUrl = 'http://localhost:3000'; // Replace with your backend URL

const PendingClients = () => {
  const [pendingClients, setPendingClients] = useState([]);

  useEffect(() => {
    const fetchPendingClients = async () => {
      try {
        const response = await axios.get(`${backendUrl}/clients/pending`);
        setPendingClients(response.data);
      } catch (error) {
        console.error('Error fetching pending clients:', error);
      }
    };

    fetchPendingClients();
  }, []); // Fetch pending clients only once when the component mounts

  return (
    <div>
      <h2>Pending Clients</h2>
      <ul>
        {pendingClients.map((client) => (
          <li key={client.id}>
            {client.fullname} - {client.project}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PendingClients;
