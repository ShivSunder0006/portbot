import React from "react";
import "../styles/Navbar.css";

function Navbar() {
  const handleScroll = (e, targetId) => {
    e.preventDefault();
    const element = document.querySelector(targetId);
    const offset = 70; // adjust based on your navbar height
    const topPosition = element.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({
      top: topPosition,
      behavior: "smooth",
    });
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <a href="#home" className="nav-logo">Shiv Sunder</a>
        <ul className="nav-links">
          <li><a href="#about" onClick={(e) => handleScroll(e, "#about")}>About</a></li>
          <li><a href="#experience" onClick={(e) => handleScroll(e, "#experience")}>Experience</a></li>
          <li><a href="#projects" onClick={(e) => handleScroll(e, "#projects")}>Projects</a></li>
          <li><a href="#certifications" onClick={(e) => handleScroll(e, "#certifications")}>Certifications</a></li>
          <li><a href="#skills" onClick={(e) => handleScroll(e, "#skills")}>Skills</a></li>
          <li><a href="#contact" onClick={(e) => handleScroll(e, "#contact")}>Contact</a></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
