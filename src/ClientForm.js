import React, { useState, useContext, useRef } from 'react';
import axios from 'axios';
import { ClientContext } from './ClientProvider';

const backendUrl = 'http://localhost:3000';

const ClientForm = ({ goToHome }) => {
  const { addClient } = useContext(ClientContext);
  const [client, setClient] = useState({
    project: '',
    bedrooms: '',
    budget: '',
    schedule: '',
    email: '',
    fullname: '',
    phone: '',
    quality: 'low',
    conversation_status: 'none',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const scheduleInputRef = useRef(null);

  const listStyle = {
    listStyleType: 'none',
    padding: 0,
    margin: 0
  };

  const listItemStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '5px'
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setClient((prevClient) => ({
      ...prevClient,
      [name]: type === 'checkbox' ? (checked ? 'ongoing' : 'none') : value,
      quality: name === 'quality' ? (checked ? 'high' : 'low') : prevClient.quality,
    }));

    if (name === 'schedule' && scheduleInputRef.current) {
      scheduleInputRef.current.blur();
    }
  };

  const handleFileChange = (e) => {
    const newDocuments = Array.from(e.target.files).map(file => ({
      name: file.name,
      file: file
    }));
    setDocuments([...documents, ...newDocuments]);
  };

  const handleRemoveDocument = (index) => {
    setDocuments(documents.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${backendUrl}/clients`, client);
      addClient(response.data);

      if (documents.length > 0) {
        const formData = new FormData();
        documents.forEach((doc) => {
          formData.append('documents', doc.file);
        });

        await axios.post(`${backendUrl}/clients/${response.data.id}/documents`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error('Error adding client or uploading documents:', error);
      setError('An error occurred while submitting the form. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddAnotherClient = () => {
    setClient({
      project: '',
      bedrooms: '',
      budget: '',
      schedule: '',
      email: '',
      fullname: '',
      phone: '',
      quality: 'low',
      conversation_status: 'none',
    });
    setDocuments([]);
    setIsSubmitted(false);
    setError(null);
  };

  if (isSubmitted) {
    return (
      <div>
        <p>Client successfully added!</p>
        <button onClick={handleAddAnotherClient}>Add Another Client</button>
        <button onClick={goToHome}>Go Back Home</button>
      </div>
    );
  }

  return (
    <div style={{ marginBottom: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <form onSubmit={handleSubmit}>
        {Object.entries(client).map(([key, value]) => (
          <div key={key} style={{ marginBottom: '10px' }}>
            <label style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ marginRight: '10px', width: '150px' }}>{key.charAt(0).toUpperCase() + key.slice(1)}:</span>
              {key === 'quality' || key === 'conversation_status' ? (
                <input
                  type="checkbox"
                  name={key}
                  checked={value === 'high' || value === 'ongoing'}
                  onChange={handleChange}
                />
              ) : key === 'schedule' ? (
                <input
                  ref={scheduleInputRef}
                  type="datetime-local"
                  name={key}
                  value={value}
                  onChange={handleChange}
                  required
                  style={{ width: '100%', boxSizing: 'border-box' }}
                />
              ) : (
                <input
                  type={key === 'email' ? 'email' : 'text'}
                  name={key}
                  value={value}
                  onChange={handleChange}
                  required
                />
              )}
            </label>
          </div>
        ))}
        
        <div style={{ marginTop: '20px' }}>
          <h3>Upload Documents</h3>
          <input type="file" multiple onChange={handleFileChange} />
          <ul style={listStyle}>
            {documents.map((doc, index) => (
              <li key={index} style={listItemStyle}>
                <span>{doc.name.split('.').slice(0, -1).join('.')}</span>
                <button type="button" onClick={() => handleRemoveDocument(index)}>Remove</button>
              </li>
            ))}
          </ul>
        </div>
        
        {error && <p style={{ color: 'red' }}>{error}</p>}
        
        <button type="submit" style={{ marginTop: '20px' }} disabled={isLoading}>
          {isLoading ? 'Adding Client...' : 'Add Client'}
        </button>
      </form>
    </div>
  );
};

export default ClientForm;