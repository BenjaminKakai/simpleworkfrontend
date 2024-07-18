// src/App.js
import React, { useState, useEffect } from 'react';
import ClientForm from './ClientForm';
import RemoveClient from './RemoveClient';
import ClientList from './ClientList';
import HighQualityClients from './HighQualityClients';
import FinalizedDeals from './FinalizedDeals';
import PendingClients from './PendingClients';
import axios from 'axios';

const backendUrl = 'http://localhost:3000';

function App() {
  const [clients, setClients] = useState([]);

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

  const handleClientAdded = (newClient) => {
    setClients([...clients, newClient]);
  };

  const handleClientRemoved = (clientId) => {
    setClients(clients.filter((client) => client.id !== clientId));
  };

  return (
    <div className="App">
      <h1>Client Management</h1>
      <ClientForm onClientAdded={handleClientAdded} />
      <hr />
      <RemoveClient onClientRemoved={handleClientRemoved} />
      <hr />
      <ClientList clients={clients} />
      <hr />
      <HighQualityClients clients={clients} />
      <hr />
      <FinalizedDeals clients={clients} />
      <hr />
      <PendingClients clients={clients} />
    </div>
  );
}

export default App;
