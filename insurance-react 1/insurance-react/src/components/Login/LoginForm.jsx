import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext'; // Import UserContext
import './AuthPage.css'; // Import CSS for styling

const InputField = ({ label, type, name, value, onChange }) => {
    return (
        <div className="input-group">
            <label htmlFor={name}>{label}</label>
            <input
                type={type}
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={`Enter your ${label.toLowerCase()}`}
            />
        </div>
    );
};

const LoginForm = () => {
    const [user, setUser] = useState({ email: "", password: "" });
    const { setUserId, setUserName, setUserEmail, setUserRole, setAuthToken } = useUserContext(); // Use context setters
    const navigate = useNavigate(); // Initialize useNavigate for navigation

    const handleUpdate = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8099/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user),
            });

            console.log("Raw Response:", response); // ✅ Debugging response

            if (!response.ok) {
                const errorText = await response.text(); // Get raw response text
                console.error("Error Response from Server:", errorText);
                throw new Error("Login Failed: " + errorText);
            }

            const data = await response.json();
            console.log("Backend Response:", data); // ✅ Debugging backend response

            if (!data.userId || !data.token) {
                throw new Error("Invalid response from server");
            }

            // ✅ Store user details in context
            setUserId(data.userId);
            setUserName(data.name);
            setUserEmail(data.email);
            setUserRole(data.role);
            setAuthToken(data.token);

            // ✅ Navigate based on user role
            console.log("Navigating to:", data.role === "ROLE_AGENT" ? "/admin" : "/customer");
            if (data.role === "ROLE_AGENT") {
                navigate('/admin');
            } else if (data.role === "ROLE_CUSTOMER") {
                navigate('/customer');
            } else {
                alert("Unauthorized role");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Login failed. Please try again.");
        }
    };

    return (
        <form className="form-container" onSubmit={handleSubmit}>
            <h2>Login</h2>
            <InputField label="Email" type="email" name="email" value={user.email} onChange={handleUpdate} />
            <InputField label="Password" type="password" name="password" value={user.password} onChange={handleUpdate} />
            <button type="submit" className="form-button">Login</button>
        </form>
    );
};

export default LoginForm;
