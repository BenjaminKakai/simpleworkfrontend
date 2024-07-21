import React, { useContext, useEffect, useState } from 'react';
import { ClientContext } from './ClientProvider';

const PendingClients = ({ refreshTrigger }) => {
  const { clients, clientStatusUpdated } = useContext(ClientContext);
  const [pendingClients, setPendingClients] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (clients) {
      const pending = clients.filter(client => client.conversation_status === 'Pending');
      setPendingClients(pending);
    }
  }, [clients, clientStatusUpdated, refreshTrigger]);

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
        <ul style={{ listStyleType: 'none', marginLeft: '10px', padding: '0' }}>
          {pendingClients.map((client) => (
            <li key={client.id}>
              {client.fullname} - {client.project}
            </li>
          ))}
        </ul>
      ) : (
        <p>No pending clients available.</p>
      )}
    </div>
  );
};

export default PendingClients;
