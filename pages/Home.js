import React from "react";
import "../styles/Home.css";
import profile from "../assets/profile.jpg";

function Home() {
  return (
    <section id="home" className="home">
      <div className="home-content">
        <img src={profile} alt="Profile" className="profile-pic" />
        <h1>Hello, I'm <span className="highlight">Your Name</span></h1>
        <h2 className="typing">Machine Learning Engineer | Web Developer</h2>
        <a href="#projects" className="btn">See My Work</a>
      </div>
    </section>
  );
}

export default Home;
