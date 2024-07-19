import React, { useState, useEffect, useRef, useContext } from 'react';
import axios from 'axios';
import { ClientContext } from './ClientProvider';

const ClientList = ({ onClientRemoved }) => {
  const { clients: contextClients, updateClientStatus } = useContext(ClientContext);
  const [filteredClients, setFilteredClients] = useState([]);
  const [isListVisible, setIsListVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [clientToUpdate, setClientToUpdate] = useState(null);
  const [loading, setLoading] = useState(false);
  const searchInputRef = useRef(null);

  useEffect(() => {
    if (contextClients) {
      setFilteredClients(contextClients);
    }
  }, [contextClients]);

  const handleRemoveClient = async (clientId) => {
    try {
      setLoading(true);
      await axios.delete(`http://localhost:3000/clients/${clientId}`);
      setFilteredClients(prevClients => prevClients.filter(client => client.id !== clientId));
      onClientRemoved(clientId);
    } catch (error) {
      console.error('Error removing client:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    if (contextClients) {
      const filtered = contextClients.filter(client =>
        client.fullname.toLowerCase().includes(query) ||
        client.project.toLowerCase().includes(query)
      );
      setFilteredClients(filtered);
    }
  };

  const scrollToClient = (clientRef) => {
    if (clientRef) {
      clientRef.scrollIntoView({ behavior: 'smooth', block: 'start' });
      clientRef.classList.add('highlighted');
      setTimeout(() => {
        clientRef.classList.remove('highlighted');
      }, 2000);
    }
  };

  const handleClientClick = (client) => {
    const clientElement = document.getElementById(`client-${client.id}`);
    scrollToClient(clientElement);
  };

  const toggleClientStatus = async (client, updatedStatus) => {
    try {
      setLoading(true);
      setFilteredClients(prevClients =>
        prevClients.map(c => c.id === client.id ? { ...c, conversation_status: updatedStatus } : c)
      );
      await updateClientStatus(client.id, updatedStatus);
    } catch (error) {
      console.error('Error updating client status:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!contextClients) {
    return <div>Loading clients...</div>;
  }

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
          disabled={loading}
        />
      </div>
      {isListVisible && (
        <div style={{ marginLeft: '500px' }}>
          <div style={{ marginTop: '10px' }}>
            {filteredClients.map((client) => (
              <div key={client.id} id={`client-${client.id}`} style={{ marginBottom: '10px', display: 'flex' }}>
                <button onClick={() => handleRemoveClient(client.id)} style={{ marginRight: '10px' }} disabled={loading}>
                  {loading ? 'Removing...' : 'Remove Client'}
                </button>
                {clientToUpdate === client.id ? (
                  <>
                    <button onClick={() => toggleClientStatus(client, 'Pending')} style={{ marginRight: '10px' }} disabled={loading}>
                      {loading ? 'Updating...' : 'Pending'}
                    </button>
                    <button onClick={() => toggleClientStatus(client, 'Finalized Deal')} style={{ marginRight: '10px' }} disabled={loading}>
                      {loading ? 'Updating...' : 'Finalize Deal'}
                    </button>
                  </>
                ) : (
                  <button onClick={() => setClientToUpdate(client.id)} style={{ marginRight: '10px' }} disabled={loading}>
                    {loading ? 'Updating...' : 'Update'}
                  </button>
                )}
                <span>{client.fullname} - {client.project} - {client.conversation_status}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientList;