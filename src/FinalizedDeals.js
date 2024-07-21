import React, { useContext, useEffect, useState } from 'react';
import { ClientContext } from './ClientProvider';
import './FinalizedDeals.css'; // Import the CSS file

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
    <div className="finalized-deals-container">
      {finalizedDeals.length > 0 ? (
        <ul className="finalized-deals-list">
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
