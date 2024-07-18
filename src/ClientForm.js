// src/ClientForm.js (for adding clients)
import React, { useState } from 'react';
import axios from 'axios';

const backendUrl = 'http://localhost:3000';

const ClientForm = ({ onClientAdded }) => {
  const [client, setClient] = useState({
    project: '',
    bedrooms: '',
    budget: '',
    schedule: '',
    email: '',
    fullname: '',
    phone: '',
    quality: 'low',
  });

  const handleChange = (e) => {
    if (e.target.type === 'checkbox') {
      setClient({
        ...client,
        quality: e.target.checked ? 'high' : 'low',
      });
    } else {
      setClient({
        ...client,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backendUrl}/clients`, client);
      console.log('Client added:', response.data);
      onClientAdded(response.data); // Notify parent component about new client
    } catch (error) {
      console.error('There was an error adding the client:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form inputs */}
      <button type="submit">Add Client</button>
    </form>
  );
};

export default ClientForm;
