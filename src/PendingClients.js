import React, { useContext, useEffect, useState } from 'react';
import { ClientContext } from './ClientProvider';
import './PendingClients.css'; // Import the CSS file

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
      <div className="pending-clients-container">
        <h2>Error Fetching Pending Clients</h2>
        <p>{error.message}</p>
      </div>
    );
  }

  return (
    <div className="pending-clients-container">
      {pendingClients.length > 0 ? (
        <ul className="pending-clients-list">
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
