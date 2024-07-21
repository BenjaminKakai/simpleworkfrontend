import React, { useState, useContext } from 'react';
import axios from 'axios';
import { ClientContext } from './ClientProvider';
import './RemoveClient.css'; // Ensure you have a CSS file for styling

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
    <div className="remove-client-container">
      <button className="toggle-button" onClick={() => setIsComponentVisible(!isComponentVisible)}>
        {isComponentVisible ? 'Hide the List' : 'Select a Client to Drop'}
      </button>
      {isComponentVisible && (
        <div className="remove-client-content">
          
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
