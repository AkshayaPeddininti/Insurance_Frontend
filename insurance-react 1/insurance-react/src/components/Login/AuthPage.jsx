import React, { useState } from 'react';
import axios from 'axios'; // Import axios
import './AuthPage.css'; // Import the CSS file
import { useUserContext } from '../../context/UserContext'; // Corrected import path
 
const LOGIN_API_BASE_URL = 'http://localhost:8099/api/auth'; // Login API base URL
const REGISTER_API_BASE_URL = 'http://localhost:8081'; // Register API base URL
 
// Reusable Input Component
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
 
// Login Form Component
const LoginForm = ({ onLogin }) => {
    const { setUserRole, setUserName, setUserId, setAuthToken } = useUserContext(); // Access the context
    const [user, setUser] = useState({
        email: "",
        password: ""
    });
 
    function handleUpdate(e) {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    }
 
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${LOGIN_API_BASE_URL}/login`, user);
            console.log("Success:", response.data);
            setUserRole(response.data.role);
            setUserName(response.data.name);
            setUserId(response.data.userId);
            setAuthToken(response.data.token); // Store the token in context
 
            onLogin(response.data); // Pass the entire user data, including the role
        } catch (error) {
            console.error("Error:", error);
            alert(error.response?.data?.message || "Login Failed");
        }
    };
 
    return (
        <form className="form-container" onSubmit={handleSubmit}>
            <h2>Login</h2>
            <InputField
                label="Email"
                type="email"
                name="email"
                onChange={handleUpdate}
            />
            <InputField
                label="Password"
                type="password"
                name="password"
                onChange={handleUpdate}
            />
            <button type="submit" className="form-button">Login</button>
        </form>
    );
};
 
// Register Form Component
const RegisterForm = ({ onRegister }) => {
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        role: ""
    });
 
    function handleUpdate(e) {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    }
 
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${REGISTER_API_BASE_URL}/register`, user);
            console.log("Success:", response.data);
            onRegister(); // Notify parent of successful registration
        } catch (error) {
            console.error("Error:", error);
            alert(error.response?.data?.message || "Failed to register");
        }
    };
 
    return (
        <form className="form-container" onSubmit={handleSubmit}>
            <h2>Register</h2>
            <InputField
                label="name"
                type="text"
                name="name"
                onChange={handleUpdate}
            />
            <InputField
                label="Email"
                type="email"
                name="email"
                onChange={handleUpdate}
            />
            <InputField
                label="Password"
                type="password"
                name="password"
                onChange={handleUpdate}
            />
            <div className="input-group">
                <label htmlFor="role">Role</label>
                <select
                    id="role"
                    name="role"
                    value={user.role}
                    onChange={handleUpdate}
                    required
                >
                    <option value="">Select Role</option>
                    <option value="ROLE_CUSTOMER">Customer</option>
                    <option value="ROLE_AGENT">Agent</option>
                </select>
            </div>
            <button type="submit" className="form-button">Register</button>
        </form>
    );
};
 
// Main App Component
const AuthPage = ({ showLogin, showRegister, onLoginSuccess, onRegisterSuccess }) => {
 
    const handleLoginSubmit = (data) => {
        onLoginSuccess(data);
    };
 
    const handleRegisterSubmit = () => {
        onRegisterSuccess();
    };
 
    return (
        <div className="auth-page">
            {!showLogin && !showRegister && (
                <div className="auth-buttons">
                    <button className="auth-button" onClick={() => { onLoginSuccess(false); }}>Login</button>
                    <button className="auth-button" onClick={() => { onRegisterSuccess(false); }}>Register</button>
                </div>
            )}
            {showLogin && (
                <div className="forms-container">
                    <LoginForm onLogin={handleLoginSubmit} />
                    <button className="back-button" onClick={() => { onLoginSuccess(false); }}>Back</button>
                </div>
            )}
            {showRegister && (
                <div className="forms-container">
                    <RegisterForm onRegister={handleRegisterSubmit} />
                    <button className="back-button" onClick={() => { onRegisterSuccess(false); }}>Back</button>
                </div>
            )}
        </div>
    );
};
 
export default AuthPage;