import React from 'react';
import './Home.css';
import { Link, useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <nav className="navbar">
        <div className="navbar-left">
          <Link to="/" className="logo">Insurance Management</Link>
        </div>
        <div className="navbar-right">
          <Link to="/about"><button>About Us</button></Link>
          <Link to="/contact"><button>Contact Us</button></Link>
          <button className='cta-button' onClick={()=> navigate('/RegisterForm')}>Register</button>
        </div>
      </nav>
      <div className="hero-section">
        <div className="hero-content">
          <h1>Welcome to Insurance Management</h1>
          <p>Your trusted partner for managing insurance policies and claims.</p>
          <button className="cta-button" onClick={() => navigate('/Loginform')}>Get Started</button>
          
        </div>
      </div>
    </div>
  );
}

export default Home;