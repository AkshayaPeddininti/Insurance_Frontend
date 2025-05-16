import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext'; // Use useUserContext
import '../Admin/Admin.css'; // Import CSS for styling

function Admin() {
    const navigate = useNavigate();
    const { userRole, userName, setUserRole, setUserName, setUserId, setAuthToken } = useUserContext(); // Use context setters

    // Redirect unauthorized users to the login page
    useEffect(() => {
        console.log("User Role:", userRole); // Debugging
        if (!userRole || (userRole !== "ROLE_ADMIN" && userRole !== "ROLE_AGENT")) {
            navigate("/loginform"); // Redirect to login if not authenticated or not an admin/agent
        }
    }, [userRole, navigate]);

    // Logout function
    const handleLogout = () => {
        // Clear user context and redirect to login
        setUserRole(null);
        setUserName(null);
        setUserId(null);
        setAuthToken(null);
        navigate("/");
    };

    return (
        <div className="admin-dashboard">
            {/* Sidebar Section */}
            <div className="admin-sidebar">
                <h2>Admin Profile</h2>
                <p><strong>Name:</strong> {userName || "Admin"}</p>
                <button className="logout-button" onClick={handleLogout}>Logout</button> {/* Logout button */}
            </div>

            {/* Main Content Section */}
            <div className="admin-main-content">
                <h1>Admin Dashboard</h1>
                <div className="card-container">
                    <div className="card">
                        <h3>Update Details</h3>
                        <p>Update customer or policy details.</p>
                        <button onClick={() => navigate('/admin/update-details')}>Update Details</button>
                    </div>
                    
                    <div className="card">
                        <h3>View Customers</h3>
                        <p>See all registered customers.</p>
                        <button onClick={() => navigate('/admin/view-customers')}>View Customers</button>
                    </div>
                    <div className="card">
                        <h3>View Policies</h3>
                        <p>See all available policies.</p>
                        <button onClick={() => navigate('/admin/view-policies')}>View Policies</button>
                    </div>
                    <div className="card">
                        <h3>Add Policy</h3>
                        <p>Create a new insurance policy.</p>
                        <button onClick={() => navigate('/admin/add-policy')}>Add Policy</button>
                    </div>
                    <div className="card">
                        <h3>View Status of Claims</h3>
                        <p>See status of claims</p>
                        <button onClick={() => navigate('/admin/view-claims-by-status')}>View By Status</button>
                    </div>
 
                    <div className="card">
                        <h3>View Policies by Agent ID</h3>
                        <p>See policies associated with a specific agent.</p>
                        <button onClick={() => navigate('/admin/view-policies-by-agent')}>My Policies</button>
                </div>
                </div>
            </div>
        </div>
    );
}

export default Admin;
