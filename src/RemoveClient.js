// RemoveClient.js
import React, { useState } from 'react';
import axios from 'axios';

const backendUrl = 'http://localhost:3000';

const RemoveClient = () => {
  const [clientId, setClientId] = useState('');

  const handleChange = (e) => {
    setClientId(e.target.value);
  };

  const handleRemove = async () => {
    try {
      const response = await axios.delete(`${backendUrl}/clients/${clientId}`);
      console.log(response.data); // Log success message
      // Optionally update client list or handle success
    } catch (error) {
      console.error('Error removing client:', error);
    }
  };

  return (
    <div>
      <h2>Remove Client</h2>
      <input type="text" placeholder="Client ID" value={clientId} onChange={handleChange} />
      <button onClick={handleRemove}>Remove Client</button>
    </div>
  );
};

export default RemoveClient;
