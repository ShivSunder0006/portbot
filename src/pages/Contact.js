import React from "react";
import "../styles/Contact.css";
import useScrollFadeIn from "../utils/useScrollFadeIn";

// react-icons
import { FaLinkedin, FaInstagram, FaEnvelope } from "react-icons/fa";

function Contact() {
  const fadeIn = useScrollFadeIn();

  return (
    <section id="contact" className="contact" ref={fadeIn.ref} style={fadeIn.style}>
      <h2>Contact Me</h2>
      <p>I'd love to connect! Reach me via email or on my socials below.</p>

      <div className="contact-links">
        {/* Email */}
        <a href="mailto:shivsunder46@gmail.com" className="contact-btn email">
          <FaEnvelope className="icon" /> Email
        </a>

        {/* LinkedIn */}
        <a href="https://www.linkedin.com/in/shiv-sunder-pradhan-1a0a81194/" target="_blank" rel="noreferrer" className="contact-btn linkedin">
          <FaLinkedin className="icon" /> LinkedIn
        </a>

        {/* Instagram */}
        <a href="https://instagram.com/yourusername" target="_blank" rel="noreferrer" className="contact-btn instagram">
          <FaInstagram className="icon" /> Instagram
        </a>
      </div>
    </section>
  );
}

export default Contact;
