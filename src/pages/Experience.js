import React from "react";
import "../styles/Experience.css";
import useScrollFadeIn from "../utils/useScrollFadeIn";

// ✅ Import logos (make sure these paths are correct)
import quantiphiLogo from "../assets/Quantiphi.jpg";
import MCLLogo from "../assets/mcl.png";

function Experience() {
  const fadeIn = useScrollFadeIn();

  const experiences = [
  {
    role: "Machine Learning Engineer Intern",
    company: "Quantiphi",
    period: "July 2025 – Sept 2025",
    logo: quantiphiLogo,   // import this at the top
    description: [
      "Gained hands-on training across diverse ML domains including Machine Learning, Deep Learning, Computer Vision, NLP, Time Series, and MLOps, with successful completion of multiple assessments. ",
      "Implemented real-world use cases in Computer Vision and NLP, applying industry-standard ML workflows and deployment practices. ",
      "Developed a mock end-to-end project on real-time Paytm logo detection in cricket matches using YOLO-based object detection and MLOps integration"
    ]
  },
  {
    role: "System Engineer Intern",
    company: "Mahanadi Coalfields Limited (MCL)",
    period: "May 2024 – July 2024",
    logo: MCLLogo,   // import this at the top
    description: [
      "Assisted in system performance analysis and troubleshooting.",
      "Supported the IT team in maintaining enterprise applications and network infrastructure.",
      "Studied under the guidance of senior engineers to enter into the machine learning domain."
    ]
  }
];


  return (
    <section id="experience" className="experience" ref={fadeIn.ref} style={fadeIn.style}>
      <h2>Experience</h2>
      <div className="experience-grid">
        {experiences.map((exp, idx) => (
          <div key={idx} className="experience-card">
            <img src={exp.logo} alt={exp.company} className="company-logo" />
            <div className="experience-info">
              <h3>{exp.role}</h3>
              <h4>{exp.company}</h4>
              <p className="period">{exp.period}</p>
              <ul>
                {exp.description.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Experience;
