import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import ClientContext from './ClientContext';

const FinalizedDeals = ({ refetchTrigger }) => {
  const { clientStatusUpdated } = useContext(ClientContext);
  const backendUrl = 'http://localhost:3000';
  const [finalizedDeals, setFinalizedDeals] = useState([]);

  useEffect(() => {
    const fetchFinalizedDeals = async () => {
      try {
        const response = await axios.get(`${backendUrl}/clients/finalized`);
        setFinalizedDeals(response.data);
      } catch (error) {
        console.error('Error fetching finalized deals:', error);
      }
    };

    fetchFinalizedDeals();
  }, [backendUrl, clientStatusUpdated, refetchTrigger]);

  return (
    <div>
      {finalizedDeals.length > 0 ? (
        <div>
          <ul style={{ listStyleType: 'none', marginLeft: '10px', padding: '0' }}>
            {finalizedDeals.map((client) => (
              <li key={client.id}>
                {client.fullname} - {client.project}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No finalized deals available.</p>
      )}
    </div>
  );
};

export default FinalizedDeals;
