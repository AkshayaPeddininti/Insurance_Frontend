import React from "react";
import "./About.css"; // Import CSS file

function About() {
  return (
    <div className="about-container">
      <div className="about-hero">
        <h1>Welcome to Our Insurance Platform</h1>
        <p>Your trusted partner for comprehensive insurance solutions.</p>
      </div>

      <h1>About Us</h1>
      <p>We provide the best insurance management solutions.</p>
      
      <section>
        <h2>Our Mission</h2>
        <p>
          Our mission is to simplify insurance management for individuals and businesses, 
          ensuring peace of mind and financial security.
        </p>
      </section>

      <section>
        <h2>Why Choose Us?</h2>
        <ul>
          <li>Comprehensive insurance solutions tailored to your needs.</li>
          <li>24/7 customer support to assist you anytime.</li>
          <li>Trusted by thousands of customers worldwide.</li>
          <li>Innovative technology for seamless management.</li>
        </ul>
      </section>

      <section>
        <h2>Contact Us</h2>
        <p>
          Have questions? Feel free to <a href="/contact">contact us</a>. 
          We're here to help you every step of the way.
        </p>
      </section>

      <div className="about-cta">
        <h2>Ready to Get Started?</h2>
        <a href="/get-started">Join Us Today</a>
      </div>
    </div>
  );
}

export default About;