// src/ClientList.js
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const backendUrl = 'http://localhost:3000'; // Replace with your backend URL

const ClientList = ({ onClientRemoved }) => {
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [isListVisible, setIsListVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get(`${backendUrl}/clients`);
        setClients(response.data);
        setFilteredClients(response.data); // Initialize filtered clients with all clients
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    };

    fetchClients();
  }, [onClientRemoved]); // Update client list when a client is removed

  const handleRemoveClient = async (clientId) => {
    try {
      const response = await axios.delete(`${backendUrl}/clients/${clientId}`);
      console.log('Client removed:', response.data);
      // Remove the client from the local state array immediately
      setClients(clients.filter(client => client.id !== clientId));
      setFilteredClients(filteredClients.filter(client => client.id !== clientId));
      onClientRemoved(clientId); // Notify parent component about removed client
    } catch (error) {
      console.error('Error removing client:', error);
    }
  };

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter clients based on search query
    const filtered = clients.filter(client =>
      client.fullname.toLowerCase().includes(query) ||
      client.project.toLowerCase().includes(query)
    );
    setFilteredClients(filtered);
  };

  const scrollToClient = (clientRef) => {
    if (clientRef.current) {
      clientRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Highlight the client by adding a temporary highlight class
      clientRef.current.classList.add('highlighted');
      setTimeout(() => {
        clientRef.current.classList.remove('highlighted');
      }, 2000); // Remove highlight after 2 seconds
    }
  };

  const handleClientClick = (client) => {
    // Find the client element by ID
    const clientElement = document.getElementById(`client-${client.id}`);
    scrollToClient(clientElement);
  };

  return (
    <div>
      <button onClick={() => setIsListVisible(!isListVisible)}>
        {isListVisible ? 'Hide Client List' : 'Open Client List'}
      </button>
      {isListVisible && (
        <>
          <h2>Client List</h2>
          <div style={{ marginLeft: '20px' }}>
            <input
              type="text"
              placeholder="Search clients..."
              value={searchQuery}
              onChange={handleSearch}
              ref={searchInputRef}
            />
            <div style={{ marginTop: '10px' }}>
              {filteredClients.map((client) => (
                <div key={client.id} id={`client-${client.id}`} style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                  <button onClick={() => handleRemoveClient(client.id)} style={{ marginRight: '10px' }}>Remove Client</button>
                  <span>{client.fullname} - {client.project}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ClientList;
