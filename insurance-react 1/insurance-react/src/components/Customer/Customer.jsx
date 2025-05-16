import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext'; // Use useUserContext
import '../Customer/Customer.css'; // Import CSS for styling

function Customer() {
    const navigate = useNavigate();
    const { userRole, userName, setUserRole, setUserName, setUserId, setAuthToken } = useUserContext(); // Use context setters

    // Redirect unauthorized users to the login page
    useEffect(() => {
        console.log("User Role:", userRole); // Debugging
        if (!userRole || userRole !== "ROLE_CUSTOMER") {
            navigate("/loginform"); // Redirect to login if not authenticated or not a customer
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
        <div className="customer-dashboard">
            {/* Sidebar Section */}
            <div className="customer-sidebar">
                <h2>Customer Profile</h2>
                <p><strong>Name:</strong> {userName || "Customer"}</p>
                <button className="logout-button" onClick={handleLogout}>Logout</button> {/* Logout button */}
            </div>

            {/* Main Content Section */}
            <div className="customer-main-content">
                <h1>Customer Dashboard</h1>
                <div className="card-container">
                <div className="card">
                        <h3>Customer Profile</h3>
                        <p>Details for Claiming</p>
                        <button onClick={() => navigate('/Customer/CustomerProfile')}>CustomerProfile</button>
                    </div>
                    <div className="card">
                        <h3>View Policies</h3>
                        <p>See all available policies.</p>
                        <button onClick={() => navigate('/Customer/ViewPolicies')}>View Policies</button>
                    </div>
                    <div className="card">
                        <h3>View Claims</h3>
                        <p>Track your claims.</p>
                        <button onClick={() => navigate('/customer/view-claims')}>View Claims</button>
                    </div>
                    <div className="card">
                        <h3>Apply for Policy</h3>
                        <p>Apply for a new insurance policy.</p>
                        <button onClick={() => navigate('/Customer/apply-policy')}>Apply Policy</button>
                    </div>
                    <div className="card">
                        <h3>View Applied Policies</h3>
                        <p>Check the policies you have applied for.</p>
                        <button onClick={() => navigate('/customer/view-applied-policies')}>View Applied Policies</button>
                    </div>
                    <div className="card">
                        <h3>Update Details</h3>
                        <p>Update customer details.</p>
                        <button onClick={() => navigate('/customer/update-details')}>Update Details</button>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Customer;
