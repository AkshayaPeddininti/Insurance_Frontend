import React from "react";
import "./Contact.css"; // Import CSS file for styling

function Contact() {
  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <p>We'd love to hear from you! Reach out to us using the information below:</p>

      <section>
        <h2>Our Office</h2>
        <p>123 Insurance Lane, Suite 456</p>
        <p>Insurance City, IN 78901</p>
      </section>

      <section>
        <h2>Phone</h2>
        <p>Customer Support: +1 (800) 123-4567</p>
        <p>Business Inquiries: +1 (800) 987-6543</p>
      </section>

      <section>
        <h2>Email</h2>
        <p>Support: <a href="mailto:support@insurance.com">support@insurance.com</a></p>
        <p>Sales: <a href="mailto:sales@insurance.com">sales@insurance.com</a></p>
      </section>

      <section>
        <h2>Follow Us</h2>
        <p>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a> | 
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"> Twitter</a> | 
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"> LinkedIn</a>
        </p>
      </section>
    </div>
  );
}

export default Contact;