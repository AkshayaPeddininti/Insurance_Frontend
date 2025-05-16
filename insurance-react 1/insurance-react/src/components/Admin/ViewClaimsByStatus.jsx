import React, { useState } from 'react';
import { useUserContext } from '../../context/UserContext';
import { getClaimsByStatus, updateClaimStatus } from '../../services/UserService';
import './ViewClaimsByStatus.css';

const ViewClaimsByStatus = () => {
  const { authToken } = useUserContext(); // ✅ Use context instead of localStorage
  const [status, setStatus] = useState('');
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    try {
      const response = await getClaimsByStatus(status, authToken); // ✅ Pass token
      setClaims(response);
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || 'An error occurred while fetching claims.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (claimId, newStatus) => {
    try {
      const claim = claims.find((claim) => claim.claimID === claimId);
      if (!claim) {
        setErrorMessage('Claim not found.');
        return;
      }

      const updateClaimStatusDTO = {
        policyID: claim.policy?.policyID || 0,
        status: newStatus,
      };

      await updateClaimStatus(claimId, updateClaimStatusDTO, authToken); // ✅ Pass token
      setClaims((prevClaims) =>
        prevClaims.map((claim) =>
          claim.claimID === claimId ? { ...claim, status: newStatus } : claim
        )
      );
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || 'An error occurred while updating the claim status.'
      );
    }
  };

  return (
    <div className="view-claims-by-status-page">
      <h1>View Claims by Status</h1>
      <form onSubmit={handleSearch} className="search-form">
        <label htmlFor="status">Select Status:</label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
        >
          <option value="" disabled>-- Select Status --</option>
          <option value="Accepted">Accepted</option>
          <option value="Rejected">Rejected</option>
          <option value="Pending">Pending</option>
        </select>
        <button type="submit" className="send-button">Send</button>
      </form>

      {loading && <p>Loading claims...</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {claims.length > 0 ? (
        <table className="claims-table">
          <thead>
            <tr>
              <th>Claim ID</th>
              <th>Claim Amount</th>
              <th>Policy ID</th>
              <th>Customer ID</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {claims.map((claim) => (
              <tr key={claim.claimID}>
                <td>{claim.claimID}</td>
                <td>{claim.claimAmount}</td>
                <td>{claim.policy?.policyID || 'N/A'}</td>
                <td>{claim.customer?.userId || 'N/A'}</td>
                <td>{claim.status}</td>
                <td>
                  {claim.status === 'Pending' && (
                    <>
                      <button onClick={() => handleUpdateStatus(claim.claimID, 'Accepted')}>✅</button>
                      <button onClick={() => handleUpdateStatus(claim.claimID, 'Rejected')}>❌</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !loading && !errorMessage && <p>No claims found for the given status.</p>
      )}
    </div>
  );
};

export default ViewClaimsByStatus;
