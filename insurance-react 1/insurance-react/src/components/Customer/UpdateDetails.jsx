import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext';
import axios from 'axios';
import './UpdateDetails.css'; // Import custom CSS
 
const UpdateDetailsPage = () => {
    const { userId, authToken } = useUserContext(); // Access userId and authToken from context
    const navigate = useNavigate();
 
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
    });
    const [message, setMessage] = useState('');
 
    const BASE_URL = 'http://localhost:8081/customers';
 
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
            const response = await axios.put(
                `${BASE_URL}/update/${userId}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${authToken}`,
                    },
                }
            );
 
            if (response.status === 201) {
                setMessage('✅ Details updated successfully!');
                setTimeout(() => navigate(`/admin`), 2000);
            } else {
                setMessage('❌ Failed to update details. Please try again.');
            }
        } catch (error) {
            setMessage('❌ An error occurred. Please try again.');
        }
    };
 
    return (
        <div className="update-details-container">
            <h2 className="title">Update Details</h2>
            {message && <p className="message">{message}</p>}
            <form onSubmit={handleSubmit} className="details-form">
                <div className="form-group">
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label>Phone:</label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="form-input"
                    />
                </div>
                <button type="submit" className="submit-button">Update Details</button>
            </form>
        </div>
    );
};
 
export default UpdateDetailsPage;
 