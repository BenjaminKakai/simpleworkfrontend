// src/RemoveClient.js
import React, { useContext, useState } from 'react';
import axiosInstance from './api'; // Updated import
import { ClientContext } from './ClientProvider';
import './PendingClients.css'; // Import the CSS file

const RemoveClient = ({ refreshTrigger }) => {
  const { clients, removeClient } = useContext(ClientContext);
  const [selectedClient, setSelectedClient] = useState('');
  const [error, setError] = useState(null);

  const handleRemoveClient = async () => {
    try {
      await axiosInstance.delete(`/clients/${selectedClient}`); // Updated axios usage
      removeClient(selectedClient); // Remove client from context
      setSelectedClient('');
    } catch (error) {
      console.error('Error removing client:', error);
      setError('Failed to remove client. Please try again.');
    }
  };

  return (
    <div className="remove-client-container">
      <h2>Remove Client</h2>
      <select
        value={selectedClient}
        onChange={(e) => setSelectedClient(e.target.value)}
      >
        <option value="">Select a client to remove</option>
        {clients.map((client) => (
          <option key={client.id} value={client.id}>
            {client.fullname} - {client.project}
          </option>
        ))}
      </select>
      <button onClick={handleRemoveClient}>Remove Client</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default RemoveClient;
