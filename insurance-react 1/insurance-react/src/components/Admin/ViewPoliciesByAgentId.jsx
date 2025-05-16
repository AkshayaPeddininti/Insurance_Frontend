import React, { useState, useEffect } from 'react';
import { useUserContext } from '../../context/UserContext';
import { getPoliciesByAgentId } from '../../services/UserService';
import './ViewPoliciesByAgentId.css';

const ViewPoliciesByAgentId = () => {
  const { userId, authToken } = useUserContext(); // ✅ Use context
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchPolicies = async () => {
    if (!userId || !authToken) {
      setErrorMessage('Agent is not logged in. Please log in to view policies.');
      return;
    }

    setLoading(true);
    setErrorMessage('');
    try {
      const response = await getPoliciesByAgentId(userId, authToken); // ✅ Pass token
      setPolicies(response);
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || 'An error occurred while fetching policies.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPolicies();
  }, [userId]);

  return (
    <div className="view-policies-by-agent-page">
      <h1>My Policies</h1>
      {loading && <p>Loading policies...</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {policies.length > 0 ? (
        <table className="policies-table">
          <thead>
            <tr>
              <th>Policy ID</th>
              <th>Policy Name</th>
              <th>Premium</th>
              <th>Coverage</th>
            </tr>
          </thead>
          <tbody>
            {policies.map((policy) => (
              <tr key={policy.policyID}>
                <td>{policy.policyID}</td>
                <td>{policy.policyName}</td>
                <td>{policy.premiumAmount}</td>
                <td>{policy.coverageDetails}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !loading && !errorMessage && <p>No policies found for your account.</p>
      )}
    </div>
  );
};

export default ViewPoliciesByAgentId;
