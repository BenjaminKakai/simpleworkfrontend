// src/HighQualityClients.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const backendUrl = 'http://localhost:3000'; // Replace with your backend URL

const HighQualityClients = ({ onClientQualityChange }) => {
  const [highQualityClients, setHighQualityClients] = useState([]);

  useEffect(() => {
    const fetchHighQualityClients = async () => {
      try {
        const response = await axios.get(`${backendUrl}/clients/high-quality`);
        setHighQualityClients(response.data);
      } catch (error) {
        console.error('Error fetching high-quality clients:', error);
      }
    };

    fetchHighQualityClients();
  }, [onClientQualityChange]); // Update high-quality clients when quality changes

  return (
    <div>
      <h2>High Quality Clients</h2>
      <ul>
        {highQualityClients.map((client) => (
          <li key={client.id}>
            {client.fullname} - {client.project}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HighQualityClients;
