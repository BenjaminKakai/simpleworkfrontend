import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const backendUrl = 'http://localhost:3000'; // Replace with your backend URL

const ClientList = ({ onClientRemoved }) => {
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [isListVisible, setIsListVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [clientToUpdate, setClientToUpdate] = useState(null);
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
      await axios.delete(`${backendUrl}/clients/${clientId}`);
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

  const toggleClientStatus = async (client, updatedStatus) => {
    try {
      const response = await axios.put(`${backendUrl}/clients/${client.id}`, { ...client, conversation_status: updatedStatus });
      console.log('Client status updated:', response.data);
      // Update the client status in the local state
      setClients(clients.map(c => (c.id === client.id ? { ...c, conversation_status: updatedStatus } : c)));
      setFilteredClients(filteredClients.map(c => (c.id === client.id ? { ...c, conversation_status: updatedStatus } : c)));
      setClientToUpdate(null); // Reset the clientToUpdate state
    } catch (error) {
      console.error('Error updating client status:', error);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', marginLeft: '500px' }}>
        <button onClick={() => setIsListVisible(!isListVisible)}>
          {isListVisible ? 'Hide Client List' : 'Open Client List'}
        </button>
        <input
          type="text"
          placeholder="Search clients..."
          value={searchQuery}
          onChange={handleSearch}
          ref={searchInputRef}
          style={{ marginLeft: '10px' }}
        />
      </div>
      {isListVisible && (
        <>
          <div style={{ marginLeft: '500px' }}>
            <div style={{ marginTop: '10px' }}>
              {filteredClients.map((client) => (
                <div key={client.id} id={`client-${client.id}`} style={{ marginBottom: '10px', display: 'flex' }}>
                  <button onClick={() => handleRemoveClient(client.id)} style={{ marginRight: '10px' }}>Remove Client</button>
                  {clientToUpdate === client.id ? (
                    <>
                      <button onClick={() => toggleClientStatus(client, 'Pending')} style={{ marginRight: '10px' }}>Pending</button>
                      <button onClick={() => toggleClientStatus(client, 'Finalized Deal')} style={{ marginRight: '10px' }}>Finalize Deal</button>
                    </>
                  ) : (
                    <button onClick={() => setClientToUpdate(client.id)} style={{ marginRight: '10px' }}>Update</button>
                  )}
                  <span>{client.fullname} - {client.project} - {client.conversation_status}</span>
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
