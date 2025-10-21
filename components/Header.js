import React, { useState, useEffect } from "react";
import "../styles/Header.css";

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="nav-container">
        <a href="#home" className="logo">
          <span className="logo-highlight">Shiv</span> Sunder
        </a>

        <nav className={`nav-links ${isOpen ? "open" : ""}`}>
          <a href="#home" onClick={() => setIsOpen(false)}>Home</a>
          <a href="#about" onClick={() => setIsOpen(false)}>About</a>
          <a href="#projects" onClick={() => setIsOpen(false)}>Projects</a>
          <a href="#skills" onClick={() => setIsOpen(false)}>Skills</a>
          <a href="#experience" onClick={() => setIsOpen(false)}>Experience</a>
          <a href="#contact" onClick={() => setIsOpen(false)}>Contact</a>
        </nav>

        <div className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
          <div className={`bar ${isOpen ? "active" : ""}`}></div>
          <div className={`bar ${isOpen ? "active" : ""}`}></div>
          <div className={`bar ${isOpen ? "active" : ""}`}></div>
        </div>
      </div>
    </header>
  );
}

export default Header;
