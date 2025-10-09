import React from "react";
import "../styles/Hero.css";
import profile from "../assets/profile.jpg";
import { ReactTyped } from "react-typed";   // ✅ correct import

function Hero() {
  return (
    <section className="hero">
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <img src={profile} alt="Profile" className="profile-pic" />
        <h1>Hello, I'm <span>Shiv Sunder Pradhan</span></h1>

        {/* ✅ Correct usage */}
        <ReactTyped
          strings={[
            "Data Analyst",
            "Machine Learning Engineer"
          ]}
          typeSpeed={60}
          backSpeed={40}
          loop
          className="typed-text"
        />

        <div className="buttons">
          <a href="#projects" className="btn primary">View My Work</a>
          <a href="#contact" className="btn secondary">Get In Touch</a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
