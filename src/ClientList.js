import React, { useState, useEffect, useCallback, useContext } from 'react';
import axios from 'axios';
import { ClientContext } from './ClientProvider';

const ClientList = ({ onClientRemoved }) => {
  const { clients: contextClients, updateClientStatus, removeClient } = useContext(ClientContext);
  const [filteredClients, setFilteredClients] = useState([]);
  const [isListVisible, setIsListVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [clientToUpdate, setClientToUpdate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [newDocuments, setNewDocuments] = useState([]);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (contextClients) {
      setFilteredClients(contextClients);
    }
  }, [contextClients]);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (hasUnsavedChanges) {
        event.preventDefault();
        event.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [hasUnsavedChanges]);

  const handleRemoveClient = async (clientId) => {
    try {
      setLoading(true);
      await axios.delete(`http://localhost:3000/clients/${clientId}`);
      removeClient(clientId);
      onClientRemoved(clientId);
    } catch (error) {
      setError('Error removing client. Please try again.');
      console.error('Error removing client:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = useCallback((event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    if (contextClients) {
      const filtered = contextClients.filter(client =>
        client.fullname.toLowerCase().includes(query) ||
        client.project.toLowerCase().includes(query)
      );
      setFilteredClients(filtered);
    }
  }, [contextClients]);

  const toggleClientStatus = async (client, updatedStatus) => {
    try {
      setLoading(true);
      await updateClientStatus(client.id, updatedStatus);
    } catch (error) {
      setError('Error updating client status. Please try again.');
      console.error('Error updating client status:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleExpoundClient = async (client) => {
    setSelectedClient(client);
    try {
      const response = await axios.get(`http://localhost:3000/clients/${client.id}/documents`);
      setDocuments(response.data);
    } catch (error) {
      setError('Error fetching client documents. Please try again.');
      console.error('Error fetching client documents:', error);
    }
  };

  const handleFileChange = (event) => {
    setNewDocuments([...newDocuments, ...Array.from(event.target.files)]);
    setHasUnsavedChanges(true);
  };

  const handleRemoveDocument = (index) => {
    setNewDocuments(newDocuments.filter((_, i) => i !== index));
    setHasUnsavedChanges(true);
  };

  const handleSaveDocuments = async () => {
    if (!selectedClient) return;

    const formData = new FormData();
    newDocuments.forEach((file) => {
      formData.append('documents', file);
    });

    try {
      await axios.post(`http://localhost:3000/clients/${selectedClient.id}/documents`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setNewDocuments([]);
      const response = await axios.get(`http://localhost:3000/clients/${selectedClient.id}/documents`);
      setDocuments(response.data);
      setHasUnsavedChanges(false);
    } catch (error) {
      setError('Error uploading documents. Please try again.');
      console.error('Error uploading documents:', error);
    }
  };

  const handleGoBack = () => {
    if (hasUnsavedChanges) {
      const confirmExit = window.confirm('You have unsaved changes. Are you sure you want to go back without saving?');
      if (!confirmExit) return;
    }
    setSelectedClient(null);
    setNewDocuments([]);
    setHasUnsavedChanges(false);
  };

  const handleDocumentClick = async (documentId) => {
    try {
      const response = await axios.get(`http://localhost:3000/documents/${documentId}`, { responseType: 'blob' });
      const contentType = response.headers['content-type'];

      // Handle cases where Content-Disposition might be missing
      let filename = 'download';
      const contentDisposition = response.headers['content-disposition'];
      if (contentDisposition && contentDisposition.includes('filename=')) {
        filename = contentDisposition.split('filename=')[1].replace(/"/g, '');
      }

      const blob = new Blob([response.data], { type: contentType });
      const url = window.URL.createObjectURL(blob);

      if (contentType.startsWith('image/')) {
        // For images, open in a new tab
        window.open(url, '_blank');
      } else {
        // For other file types, trigger download
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
      window.URL.revokeObjectURL(url);
    } catch (error) {
      setError('Error opening document. Please try again.');
      console.error('Error opening document:', error);
    }
  };

  if (!contextClients) {
    return <div>Loading clients...</div>;
  }

  return (
    <div style={{ margin: '0 auto', maxWidth: '800px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <button onClick={() => setIsListVisible(!isListVisible)}>
          {isListVisible ? 'Hide Client List' : 'Open Client List'}
        </button>
        <input
          type="text"
          placeholder="Search clients..."
          value={searchQuery}
          onChange={handleSearch}
          style={{ width: '200px' }}
          disabled={loading}
        />
      </div>
      
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {isListVisible && !selectedClient && (
        <div>
          {filteredClients.map((client) => (
            <div key={client.id} id={`client-${client.id}`} style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>{client.fullname} - {client.project} - {client.conversation_status}</span>
              <div>
                <button onClick={() => handleRemoveClient(client.id)} disabled={loading}>
                  {loading ? 'Removing...' : 'Remove'}
                </button>
                {clientToUpdate === client.id ? (
                  <>
                    <button onClick={() => toggleClientStatus(client, 'Pending')} disabled={loading}>
                      {loading ? 'Updating...' : 'Pending'}
                    </button>
                    <button onClick={() => toggleClientStatus(client, 'Finalized Deal')} disabled={loading}>
                      {loading ? 'Updating...' : 'Finalize Deal'}
                    </button>
                  </>
                ) : (
                  <button onClick={() => setClientToUpdate(client.id)} disabled={loading}>
                    {loading ? 'Updating...' : 'Update'}
                  </button>
                )}
                <button onClick={() => handleExpoundClient(client)} disabled={loading}>
                  Expound
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedClient && (
        <div style={{ marginTop: '20px' }}>
          <h2>Client Details: {selectedClient.fullname}</h2>
          {Object.entries(selectedClient).map(([key, value]) => (
            <p key={key}>{key}: {value}</p>
          ))}
          
          <h3>Uploaded Documents</h3>
          <div style={{ listStyleType: 'none', padding: 0 }}>
            {documents.map((doc) => (
              <div 
                key={doc.id} 
                onClick={() => handleDocumentClick(doc.id)}
                style={{ cursor: 'pointer', marginBottom: '5px', textDecoration: 'underline' }}
              >
                {doc.document_name}
              </div>
            ))}
          </div>

          <h3>New Documents</h3>
          <input type="file" multiple onChange={handleFileChange} />
          <ul>
            {newDocuments.map((doc, index) => (
              <li key={index}>
                {doc.name}
                <button onClick={() => handleRemoveDocument(index)}>Remove</button>
              </li>
            ))}
          </ul>

          <button onClick={handleSaveDocuments} disabled={!hasUnsavedChanges}>
            Save Documents
          </button>
          <button onClick={handleGoBack}>Go Back to Client List</button>
        </div>
      )}
    </div>
  );
};

export default ClientList;
