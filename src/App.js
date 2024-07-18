// src/App.js
import React from 'react';
import ClientForm from './ClientForm';
import RemoveClient from './RemoveClient';
import ClientList from './ClientList';
import HighQualityClients from './HighQualityClients';
import FinalizedDeals from './FinalizedDeals';

function App() {
  return (
    <div className="App">
      <h1>Client Management</h1>
      <ClientForm />

      <div>
        <hr />
        <RemoveClient />
      </div>

      <div>
        <hr />
        <ClientList />
      </div>

      <div>
        <hr />
        <HighQualityClients />
      </div>

      <div>
        <hr />
        <FinalizedDeals />
      </div>
    </div>
  );
}

export default App;
