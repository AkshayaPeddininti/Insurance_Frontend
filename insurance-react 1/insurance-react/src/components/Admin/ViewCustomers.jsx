import React, { useEffect, useState } from "react";
import axios from "axios"; // Added axios import
import "./ViewCustomers.css"; // Optional: Add a CSS file for styling

function ViewCustomers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        console.log("Fetching customers..."); // ✅ Debugging log
        const response = await axios.get("http://localhost:8081/customers/customer/all");
        
        console.log("API Response:", response.data); // ✅ Debugging log
        setCustomers(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching customers:", err); // ✅ Debugging log
        setError(err.message);
        setLoading(false);
      }
    };
  
    fetchCustomers();
  }, []);

  if (loading) {
    return <div>Loading customers...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="view-customers-container">
      <h1>Customer List</h1>
      {customers.length === 0 ? (
        <p>No customers available.</p>
      ) : (
        <table className="customers-table">
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id}>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>{customer.phone}</td>
                <td>{customer.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ViewCustomers;