import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext'; // Import UserContext
import axios from 'axios';
import './FileClaimPage.css'; // Import CSS for styling
 
const FileClaimPage = () => {
    const { userId, authToken } = useUserContext(); // Removed policyId from destructuring
    const navigate = useNavigate();
 
    const [formData, setFormData] = useState({
        policyID: '',
        claimAmount: '',
    });
    const [message, setMessage] = useState('');
 
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
 
    const handleSubmit = async (e) => {
        e.preventDefault();
 
        if (!userId || !authToken || !formData.policyID) {
            setMessage('❌ Please enter a valid Policy ID before applying.');
            return;
        }
 
        try {
            console.log('Form Data:', formData); // Log the form data for debugging
            const response = await axios.patch(
                `http://localhost:8081/customers/${userId}/fileClaim`,
                formData, // ✅ Send formPayload as request body
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                    withCredentials: true,
                }
            );
 
            if (response.status === 201 || response.status === 200) {
                setMessage('✅ Claim filed successfully!');
                setTimeout(() => navigate(`/customer`), 2000);
            } else {
                setMessage('❌ Failed to file the claim. Please try again.');
            }
        } catch (error) {
            setMessage('❌ An error occurred while filing the claim.');
        }
    };
 
    return (
        <div className="file-claim-container">
            <h2 className="title">File a Claim</h2>
            {message && <p className="message">{message}</p>}
            <form onSubmit={handleSubmit} className="claim-form">
                <div className="form-group">
                    <label>Policy ID:</label>
                    <input
                        type="text"
                        name="policyID"
                        value={formData.policyID}
                        onChange={handleChange}
                        required
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label>Claim Amount:</label>
                    <input
                        type="number"
                        name="claimAmount"
                        value={formData.claimAmount}
                        onChange={handleChange}
                        required
                        className="form-input"
                    />
                </div>
                {/* <div className="form-group">
                    <label>Reason for Claim:</label>
                    <textarea
                        value={claimReason}
                        onChange={(e) => setClaimReason(e.target.value)}
                        required
                        className="form-input"
                    ></textarea>
                </div> */}
                <button type="submit" className="submit-button">Submit Claim</button>
            </form>
        </div>
    );
};
 
export default FileClaimPage;
 