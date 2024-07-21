import React, { useContext, useEffect, useState } from 'react';
import { ClientContext } from './ClientProvider';

const FinalizedDeals = ({ refreshTrigger }) => {
  const { clients, clientStatusUpdated } = useContext(ClientContext);
  const [finalizedDeals, setFinalizedDeals] = useState([]);

  useEffect(() => {
    if (clients) {
      const deals = clients.filter(client => client.conversation_status === 'Finalized Deal');
      setFinalizedDeals(deals);
    }
  }, [clients, clientStatusUpdated, refreshTrigger]);

  return (
    <div>
      {finalizedDeals.length > 0 ? (
        <ul style={{ listStyleType: 'none', marginLeft: '10px', padding: '0' }}>
          {finalizedDeals.map((client) => (
            <li key={client.id}>
              {client.fullname} - {client.project}
            </li>
          ))}
        </ul>
      ) : (
        <p>No finalized deals available.</p>
      )}
    </div>
  );
};

export default FinalizedDeals;
