// src/HighQualityClients.js
import React, { useState, useEffect } from 'react';
import axiosInstance from './api'; // Updated import
import './HighQualityClients.css';

const HighQualityClients = ({ onClientQualityChange }) => {
  const [highQualityClients, setHighQualityClients] = useState([]);
  const [isListVisible, setIsListVisible] = useState(false);

  useEffect(() => {
    const fetchHighQualityClients = async () => {
      try {
        const response = await axiosInstance.get('/clients/high-quality'); // Updated axios usage
        setHighQualityClients(response.data);
      } catch (error) {
        console.error('Error fetching high-quality clients:', error);
      }
    };

    fetchHighQualityClients();
  }, [onClientQualityChange]); // Update high-quality clients when quality changes

  return (
    <div className="high-quality-clients-container">
      <button 
        className="toggle-button" 
        onClick={() => setIsListVisible(!isListVisible)}
      >
        {isListVisible ? 'Hide the List' : 'Open the List'}
      </button>
      {isListVisible && (
        <ul className="high-quality-clients-list">
          {highQualityClients.map((client) => (
            <li key={client.id}>
              {client.fullname} - {client.project}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HighQualityClients;
