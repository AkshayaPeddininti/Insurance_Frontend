import React from 'react';
import { useUserContext } from '../../context/UserContext';

const ViewDetails = () => {
    const { userId, userName, userEmail, userRole, authToken } = useUserContext();

    if (!userId || !authToken) {
        return <h2>No user data available. Please log in.</h2>;
    }

    return (
        <div className="details-container">
            <h2>User Details</h2>
            <p><strong>User ID:</strong> {userId}</p>
            <p><strong>Name:</strong> {userName}</p>
            <p><strong>Email:</strong> {userEmail}</p>
            <p><strong>Role:</strong> {userRole}</p>
            <p><strong>Auth Token:</strong> {authToken}</p>
        </div>
    );
};

export default ViewDetails;
