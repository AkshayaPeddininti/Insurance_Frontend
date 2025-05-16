import React, { useEffect, useState } from "react";
import axios from "axios"; // Import axios
import "./ViewClaims.css"; // Optional: Add a CSS file for styling

function ViewClaims() {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchClaims = async () => {
      try {
        const response = await axios.get("http://localhost:8081/agents/claims/status/{status}");
        setClaims(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchClaims();
  }, []);

  if (loading) {
    return <div>Loading claims...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="view-claims-container">
      <h1>Claims List</h1>
      {claims.length === 0 ? (
        <p>No claims available.</p>
      ) : (
        <table className="claims-table">
          <thead>
            <tr>
              <th>Claim ID</th>
              <th>Policy Name</th>
              <th>Claim Status</th>
              <th>Claim Amount</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {claims.map((claim) => (
              <tr key={claim.id}>
                <td>{claim.id}</td>
                <td>{claim.policyName}</td>
                <td>{claim.status}</td>
                <td>{claim.amount}</td>
                <td>{claim.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ViewClaims;