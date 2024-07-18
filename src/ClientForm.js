// src/ClientForm.js
import React, { useState } from 'react';
import axios from 'axios';

const ClientForm = () => {
  const [client, setClient] = useState({
    project: '',
    bedrooms: '',
    budget: '',
    schedule: '',
    email: '',
    fullname: '',
    phone: '',
  });

  const handleChange = (e) => {
    setClient({
      ...client,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/clients', client);
      console.log('Client added:', response.data);
    } catch (error) {
      console.error('There was an error adding the client:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="project" placeholder="Project" value={client.project} onChange={handleChange} />
      <input type="number" name="bedrooms" placeholder="Bedrooms" value={client.bedrooms} onChange={handleChange} />
      <input type="number" name="budget" placeholder="Budget" value={client.budget} onChange={handleChange} />
      <input type="datetime-local" name="schedule" placeholder="Schedule" value={client.schedule} onChange={handleChange} />
      <input type="email" name="email" placeholder="Email" value={client.email} onChange={handleChange} />
      <input type="text" name="fullname" placeholder="Full Name" value={client.fullname} onChange={handleChange} />
      <input type="text" name="phone" placeholder="Phone" value={client.phone} onChange={handleChange} />
      <button type="submit">Add Client</button>
    </form>
  );
};

export default ClientForm;
