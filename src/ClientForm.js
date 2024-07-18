// src/ClientForm.js
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
      onClientAdded(response.data); // Notify parent component about new client
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
    <div>
      <button onClick={() => setIsFormVisible(!isFormVisible)}>
        {isFormVisible ? 'Hide Form' : 'Show Form'}
      </button>
      {isFormVisible && (
        <form onSubmit={handleSubmit}>
          <input type="text" name="project" placeholder="Project" value={client.project} onChange={handleChange} required />
          <input type="number" name="bedrooms" placeholder="Bedrooms" value={client.bedrooms} onChange={handleChange} required />
          <input type="number" name="budget" placeholder="Budget" value={client.budget} onChange={handleChange} required />
          <input type="datetime-local" name="schedule" placeholder="Schedule" value={client.schedule} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" value={client.email} onChange={handleChange} required />
          <input type="text" name="fullname" placeholder="Full Name" value={client.fullname} onChange={handleChange} required />
          <input type="text" name="phone" placeholder="Phone" value={client.phone} onChange={handleChange} required />
          <label>
            <input type="checkbox" name="quality" checked={client.quality === 'high'} onChange={handleChange} />
            High Quality
          </label>
          <label>
            <input type="checkbox" name="conversation_status" checked={client.conversation_status === 'ongoing'} onChange={handleChange} />
            Ongoing Conversation
          </label>
          <button type="submit">Add Client</button>
        </form>
      )}
    </div>
  );
};

export default ClientForm;
