// HighQualityClients.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const backendUrl = 'http://localhost:3000';

const HighQualityClients = () => {
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
  }, []);

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
