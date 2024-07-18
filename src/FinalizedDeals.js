// src/FinalizedDeals.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const backendUrl = 'http://localhost:3000'; // Replace with your backend URL

const FinalizedDeals = ({ onDealFinalized }) => {
  const [finalizedDeals, setFinalizedDeals] = useState([]);

  useEffect(() => {
    const fetchFinalizedDeals = async () => {
      try {
        const response = await axios.get(`${backendUrl}/clients/finalized`);
        setFinalizedDeals(response.data);
      } catch (error) {
        console.error('Error fetching finalized deals:', error);
      }
    };

    fetchFinalizedDeals();
  }, [onDealFinalized]); // Update finalized deals when a deal is finalized

  return (
    <div>
      <h2>Finalized Deals</h2>
      <ul>
        {finalizedDeals.map((client) => (
          <li key={client.id}>
            {client.fullname} - {client.project}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FinalizedDeals;
