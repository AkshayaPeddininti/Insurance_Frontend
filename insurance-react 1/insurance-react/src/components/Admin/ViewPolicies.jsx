import React, { useEffect, useState } from "react";
import "./ViewPolicies.css"; // Optional: Add a CSS file for styling
import { getAllPolicies } from "../../services/UserService";
 
function ViewPolicies() {
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
 
  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        console.log("Fetching policies...");
        const response = await getAllPolicies();
        console.log("Response data:", response); // Debugging
        setPolicies(response || []); // Ensure policies is always an array
        setLoading(false);
      } catch (err) {
        console.error("Error fetching policies:", err);
        setError(err.message);
        setLoading(false);
      }
    };
 
    fetchPolicies();
  }, []);
 
  if (loading) {
    return <div className="loading-message">Loading policies...</div>;
  }
 
  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }
 
  return (
    <div className="view-policies-container">
      <h1>Available Policies</h1>
      {Array.isArray(policies) && policies.length === 0 ? (
        <p>No policies available.</p>
      ) : (
        <table className="policies-table">
          <thead>
            <tr>
              <th>Policy Name</th>
              <th>Premium Amount</th>
              <th>Coverage Details</th>
              <th>Validity Period</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(policies) &&
              policies.map((policy) => (
                <tr key={policy.policyId}>
                  <td>{policy.policyName}</td>
                  <td>{policy.premiumAmount}</td>
                  <td>{policy.coverageDetails}</td>
                  <td>{policy.validityPeriod}</td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
 
export default ViewPolicies;