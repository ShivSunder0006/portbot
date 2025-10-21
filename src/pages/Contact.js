import React from "react";
import "../styles/Contact.css";
import { FaLinkedin, FaEnvelope, FaGithub } from "react-icons/fa";

function Contact() {
  return (
    <section id="contact" className="contact-section">
      <h2 className="contact-title">Get in Touch</h2>
      <p className="contact-text">
        I'm always open to discussing new opportunities, collaborations, or just chatting about AI & Machine Learning.
      </p>

      <div className="contact-cards">
        <a
          href="mailto:shivsunder46@gmail.com"
          className="contact-card"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaEnvelope className="contact-icon" />
          <span>Email</span>
        </a>

        <a
          href="https://www.linkedin.com/in/shiv-sunder-pradhan-1a0a81194/"
          className="contact-card"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin className="contact-icon" />
          <span>LinkedIn</span>
        </a>

        <a
          href="https://github.com/ShivSunder0006"
          className="contact-card"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub className="contact-icon" />
          <span>GitHub</span>
        </a>
      </div>
    </section>
  );
}

export default Contact;
