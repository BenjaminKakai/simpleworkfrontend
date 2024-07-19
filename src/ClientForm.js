import React, { useState, useContext } from 'react';
import axios from 'axios';
import { ClientContext } from './ClientProvider';

const backendUrl = 'http://localhost:3000'; // Replace with your backend URL

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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setClient((prevClient) => ({
      ...prevClient,
      [name]: type === 'checkbox' ? (checked ? 'ongoing' : 'none') : value,
      quality: name === 'quality' ? (checked ? 'high' : 'low') : prevClient.quality,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backendUrl}/clients`, client);
      console.log('Client added:', response.data);
      addClient(response.data); // Add the new client to the context
      setIsSubmitted(true);
    } catch (error) {
      console.error('There was an error adding the client:', error);
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
    setIsSubmitted(false);
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      {!isSubmitted ? (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', maxWidth: '400px', margin: '0 auto' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <label style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ marginRight: '10px', width: '100px' }}>Project:</span>
              <input type="text" name="project" value={client.project} onChange={handleChange} required />
            </label>
            <label style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ marginRight: '10px', width: '100px' }}>Bedrooms:</span>
              <input type="number" name="bedrooms" value={client.bedrooms} onChange={handleChange} required />
            </label>
            <label style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ marginRight: '10px', width: '100px' }}>Budget:</span>
              <input type="number" name="budget" value={client.budget} onChange={handleChange} required />
            </label>
            <label style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ marginRight: '10px', width: '100px' }}>Schedule:</span>
              <input type="datetime-local" name="schedule" value={client.schedule} onChange={handleChange} required />
            </label>
            <label style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ marginRight: '10px', width: '100px' }}>Email:</span>
              <input type="email" name="email" value={client.email} onChange={handleChange} required />
            </label>
            <label style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ marginRight: '10px', width: '100px' }}>Full Name:</span>
              <input type="text" name="fullname" value={client.fullname} onChange={handleChange} required />
            </label>
            <label style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ marginRight: '10px', width: '100px' }}>Phone Number:</span>
              <input type="tel" name="phone" value={client.phone} onChange={handleChange} required />
            </label>
            <label style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ marginRight: '10px', width: '100px' }}>High Quality:</span>
              <input type="checkbox" name="quality" checked={client.quality === 'high'} onChange={handleChange} />
            </label>
            <label style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ marginRight: '10px', width: '100px' }}>Conversation Status-Ongoing:</span>
              <input type="checkbox" name="conversation_status" checked={client.conversation_status === 'ongoing'} onChange={handleChange} />
            </label>
          </div>
          <button type="submit">Add Client</button>
        </form>
      ) : (
        <div>
          <p>Client successfully added!</p>
          <button onClick={handleAddAnotherClient}>Add Another Client</button>
          <button onClick={goToHome}>Go Back Home</button>
        </div>
      )}
    </div>
  );
};

export default ClientForm;