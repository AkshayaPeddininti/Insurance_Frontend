import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext'; // Import UserContext
import './CustomerProfile.css'; // Import CSS for styling
 
const CustomerProfile = () => {
    const [customerProfile, setCustomerProfile] = useState(null);
    const [error, setError] = useState(null);
    const { userId, authToken } = useUserContext(); // Get userId and authToken from context
    const navigate = useNavigate();
    const API_BASE_URL = 'http://localhost:8081/customers'; // Define base URL
 
    useEffect(() => {
        const fetchCustomerProfile = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/${userId}`, { // Use base URL
                    headers: { Authorization: `Bearer ${authToken}` },
                });
                setCustomerProfile(response.data);
            } catch (err) {
                console.error('Error fetching customer profile:', err);
                setError('Failed to fetch customer profile. Please try again later.');
            }
        };
 
        fetchCustomerProfile();
    }, [userId, authToken]);
 
    if (error) {
        return <p className="alert alert-danger text-center">{error}</p>; // Added Bootstrap alert and text-center classes
    }
 
    if (!customerProfile) {
        return <p className="text-center mt-4">Loading...</p>; // Added Bootstrap text-center and margin-top classes
    }
 
    return (
        <div className="customer-profile-container">
           <Link to="/customer-profile">
    <h1 className="profile-title">Customer Profile</h1>
</Link>
            <div className="profile-card">
                <h3>{customerProfile.name}</h3>
                <p><strong>Email:</strong> {customerProfile.email}</p>
                <p><strong>Role:</strong> {customerProfile.role}</p>
                <button className="file-claim-button" onClick={() => navigate('/file-claimpage')}>
                    File Claim
                </button>
            </div>
        </div>
    );
};
 
export default CustomerProfile;