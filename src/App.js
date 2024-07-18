// src/App.js (main application component)
import React from 'react';
import ClientForm from './ClientForm';
import ClientList from './ClientList';

function App() {
  const handleClientAdded = (newClient) => {
    // Logic to update client list or notify other components
    console.log('New client added:', newClient);
  };

  return (
    <div className="App">
      <h1>Client Management</h1>
      <ClientForm onClientAdded={handleClientAdded} />
      <hr />
      <ClientList />
    </div>
  );
}

export default App;
