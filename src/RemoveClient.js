import React, { useState, useContext } from 'react';
import axios from 'axios';
import { ClientContext } from './ClientProvider';

const backendUrl = 'http://localhost:3000'; // Replace with your backend URL

const RemoveClient = () => {
  const { clients, removeClient } = useContext(ClientContext);
  const [selectedClient, setSelectedClient] = useState('');
  const [isComponentVisible, setIsComponentVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRemove = async () => {
    if (!selectedClient) return;

    try {
      setLoading(true);
      await axios.delete(`${backendUrl}/clients/${selectedClient}`);
      removeClient(selectedClient); // Update the global state
      setSelectedClient('');
      console.log('Client removed successfully');
    } catch (error) {
      console.error('Error removing client:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={() => setIsComponentVisible(!isComponentVisible)}>
        {isComponentVisible ? 'Hide Remove Client' : 'Remove Client'}
      </button>
      {isComponentVisible && (
        <div>
          <h2>Remove Client</h2>
          <select 
            value={selectedClient} 
            onChange={(e) => setSelectedClient(e.target.value)}
            disabled={loading}
          >
            <option value="">Select Client</option>
            {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.fullname}
              </option>
            ))}
          </select>
          <button 
            onClick={handleRemove} 
            disabled={!selectedClient || loading}
          >
            {loading ? 'Removing...' : 'Remove Client'}
          </button>
        </div>
      )}
    </div>
  );
};

export default RemoveClient;