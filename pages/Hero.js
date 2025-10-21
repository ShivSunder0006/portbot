import React from "react";
import "../styles/Hero.css";
import profile from "../assets/profile.jpeg"; // make sure this path exists
import { ReactTyped as Typed } from "react-typed"; // ✅ correct import

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-container">
        <div className="hero-text">
          <h1 className="hero-title">
            Hello, I'm <span>Shiv Sunder Pradhan</span>
          </h1>

          <div className="typed-wrapper">
            <Typed
              strings={[
                "Data Analyst",
                "Machine Learning Engineer",
                "AI Enthusiast",
                "MLOps Practitioner",
              ]}
              typeSpeed={60}
              backSpeed={40}
              loop
              className="typed-text"
            />
          </div>

          <p className="hero-description">
            Passionate about developing intelligent systems and solving real-world problems through AI.
          </p>

          <div className="hero-buttons">
            <a href="#projects" className="btn-primary">View My Work</a>
            <a href="#contact" className="btn-outline">Get in Touch</a>
          </div>
        </div>

        <div className="hero-image-frame">
          <img src={profile} alt="Profile" className="hero-image" />
        </div>
      </div>
    </section>
  );
}

export default Hero;
