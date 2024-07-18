import React, { useState } from 'react';
import axios from 'axios';

const backendUrl = 'http://localhost:3000'; // Replace with your backend URL

const ClientForm = ({ onClientAdded }) => {
  const [client, setClient] = useState({
    project: '',
    bedrooms: '',
    budget: '',
    schedule: '',
    email: '',
    fullname: '',
    phone: '',
    quality: 'low', // Default to 'low' quality
    conversation_status: 'none', // Default to 'none'
  });

  const [isFormVisible, setIsFormVisible] = useState(false);

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
      if (onClientAdded) {
        onClientAdded(response.data); // Notify parent component about new client if onClientAdded is defined
      }
      // Clear form after submission
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
      setIsFormVisible(false); // Hide form after submission
    } catch (error) {
      console.error('There was an error adding the client:', error);
    }
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <button
        style={{ marginBottom: '10px' }}
        onClick={() => setIsFormVisible(!isFormVisible)}
      >
        {isFormVisible ? 'Hide Client Form' : 'New Client'}
      </button>
      {isFormVisible && (
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
              <span style={{ marginRight: '10px', width: '100px' }}>Phone:</span>
              <input type="text" name="phone" value={client.phone} onChange={handleChange} required />
            </label>
            <label style={{ display: 'flex', alignItems: 'center' }}>
              <input type="checkbox" name="quality" checked={client.quality === 'high'} onChange={handleChange} />
              <span style={{ marginLeft: '10px' }}>High Quality</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center' }}>
              <input type="checkbox" name="conversation_status" checked={client.conversation_status === 'ongoing'} onChange={handleChange} />
              <span style={{ marginLeft: '10px' }}>Ongoing Conversation</span>
            </label>
          </div>
          <button type="submit" style={{ marginTop: '10px', width: '100%' }}>Add Client</button>
        </form>
      )}
    </div>
  );
};

export default ClientForm;
