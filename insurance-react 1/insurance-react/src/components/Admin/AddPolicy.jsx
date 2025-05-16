import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext';
import axios from 'axios';
import './AddPolicy.css'; // Import custom CSS
 
const AddPolicy = () => {
    const { userId, authToken,setPolicyId,policyId} = useUserContext(); // Access userId and authToken from context
    const navigate = useNavigate();
 
    // Move useState hooks to the top of the component
    const [formData, setFormData] = useState({
        policyName: '',
        premiumAmount: '',
        coverageDetails: '',
        validityPeriod: '',
    });
    const [message, setMessage] = useState('');
 
    const BASE_URL = 'http://localhost:8081/agents';
 
    useEffect(() => {
        console.log('User ID:', userId);
        console.log('Auth Token:', authToken);
        console.log('Policy ID:', policyId);
    }, [userId, authToken,policyId]);
 
    // Handle the case where userId is undefined
    if (!userId) {
        return <p className="error-message">❌ Error: User ID is not available. Please log in again.</p>;
    }
 
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
 
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!userId || !authToken) {
            setMessage('❌ User ID or authentication token is missing. Please log in again.');
            return;
        }
        try {
            const response = await axios.post(
                `${BASE_URL}/${userId}/addpolicy`,
                formData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${authToken}`,
                    },
                }
            );
 
            if (response.status === 201 || response.status === 200) {
              console.log('Policy added successfully:', response.data);
                setMessage('✅ Policy added successfully!');
                setFormData({ policyName: '', premiumAmount: '', coverageDetails: '', validityPeriod: '' });
                setTimeout(() => navigate(`/admin`), 2000);
                setPolicyId(response.data.policyID); // Assuming the response contains the policy ID
            } else {
                setMessage('❌ Failed to add policy. Please try again.');
            }
        } catch (error) {
            setMessage('❌ An error occurred. Please try again.');
        }
    };
 
    return (
        <div className="add-policy-container">
            <h2 className="title">Add Policy</h2>
            <form onSubmit={handleSubmit} className="policy-form">
                <div className="form-group">
                    <label>Policy Name:</label>
                    <input
                        type="text"
                        name="policyName"
                        value={formData.policyName}
                        onChange={handleChange}
                        required
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label>Premium Amount:</label>
                    <input
                        type="number"
                        name="premiumAmount"
                        value={formData.premiumAmount}
                        onChange={handleChange}
                        required
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label>Coverage Details:</label>
                    <textarea
                        name="coverageDetails"
                        value={formData.coverageDetails}
                        onChange={handleChange}
                        required
                        className="form-input"
                    ></textarea>
                </div>
                <div className="form-group">
                    <label>Validity Period:</label>
                    <input
                        type="text"
                        name="validityPeriod"
                        value={formData.validityPeriod}
                        onChange={handleChange}
                        required
                        className="form-input"
                    />
                </div>
                <button type="submit" className="submit-button">Add Policy</button>
            </form>
            {message && <p className="message">{message}</p>}
        </div>
    );
};
 
export default AddPolicy;
 