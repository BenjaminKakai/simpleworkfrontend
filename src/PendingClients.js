import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import ClientContext from './ClientContext';

const PendingClients = ({ refetchTrigger }) => {
  const { clientStatusUpdated } = useContext(ClientContext);
  const backendUrl = 'http://localhost:3000';
  const [pendingClients, setPendingClients] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPendingClients = async () => {
      try {
        const response = await axios.get(`${backendUrl}/clients/pending`);
        setPendingClients(response.data);
      } catch (error) {
        console.error('Error fetching pending clients:', error);
        setError(error);
      }
    };

    fetchPendingClients();
  }, [backendUrl, clientStatusUpdated, refetchTrigger]);

  if (error) {
    return (
      <div>
        <h2>Error Fetching Pending Clients</h2>
        <p>{error.message}</p>
      </div>
    );
  }

  return (
    <div>
      {pendingClients.length > 0 ? (
        <div>
          <ul style={{ listStyleType: 'none', marginLeft: '10px', padding: '0' }}>
            {pendingClients.map((client) => (
              <li key={client.id}>
                {client.fullname} - {client.project}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No pending clients available.</p>
      )}
    </div>
  );
};

export default PendingClients;
