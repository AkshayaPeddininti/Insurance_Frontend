import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext'; // Import UserContext
import axios from 'axios';
import './ApplyPolicy.css'; // Import custom CSS
 
const ApplyPolicy = () => {
    const { userId, authToken,policyId,setPolicyId } = useUserContext(); // Access userId and authToken from context
    const navigate = useNavigate();
 
    // const [formData, setFormData] = useState({
    //     policyID: '',
    // });
    const [message, setMessage] = useState('');
 
    const BASE_URL = 'http://localhost:8081/customers';
 
    const handleChange = (e) => {
        setPolicyId(e.target.value); // ✅ Directly set the policyId value
    };
 
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('policy:', policyId);
        if (!userId || !authToken || !policyId) {
            setMessage('❌ Please enter a valid Policy ID before applying.');
            return;
        }
 
        try {
            const response = await axios.patch(
                `${BASE_URL}/${userId}/applyPolicy/${policyId}`, // ✅ Correct backend path
                null, // No request body needed
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                }
            );
 
            if (response.status === 201 || response.status === 200) {
                console.log('Policy applied successfully:', response.data);
                setMessage('✅ Policy applied successfully!');
                // setFormData({ policyId: '' });
               
                setTimeout(() => navigate(`/customer`), 2000);
            } else {
                setMessage('❌ Failed to apply for policy. Please try again.');
            }
        } catch (error) {
            setMessage('❌ An error occurred while applying for the policy.');
        }
    };
 
    return (
        <div className="apply-policy-container">
            <h2 className="title">Apply for a Policy</h2>
            {message && <p className="message">{message}</p>}
            <form onSubmit={handleSubmit} className="policy-form">
                <div className="form-group">
                    <label>Policy ID:</label>
                    <input
                        type="text"
                        name="policyId"
                        value={policyId}
                        onChange={handleChange}
                        required
                        className="form-input"
                    />
                </div>
                <button type="submit" className="submit-button">Apply Policy</button>
            </form>
        </div>
    );
};
 
export default ApplyPolicy;