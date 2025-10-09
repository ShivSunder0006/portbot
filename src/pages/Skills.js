import React from "react";
import "../styles/Skills.css";
import useScrollFadeIn from "../utils/useScrollFadeIn";

// Import icons from react-icons
import { FaPython, FaGithub, FaReact } from "react-icons/fa";
import { SiTensorflow, SiPytorch, SiKeras, SiOpenai, SiGooglecloud, SiOracle, SiHtml5, SiCss3, SiJavascript, SiMysql } from "react-icons/si";

function Skills() {
  const fadeIn = useScrollFadeIn();

  const skills = [
    { name: "Python", icon: <FaPython className="skill-icon python" /> },
    { name: "TensorFlow", icon: <SiTensorflow className="skill-icon tensorflow" /> },
    { name: "PyTorch", icon: <SiPytorch className="skill-icon pytorch" /> },
    { name: "Computer Vision", icon: <SiOpenai className="skill-icon cv" /> }, // placeholder icon
    { name: "NLP", icon: <SiOpenai className="skill-icon nlp" /> }, // placeholder icon
    { name: "MLOps", icon: <SiOpenai className="skill-icon mlops" /> }, // placeholder icon
    { name: "Keras", icon: <SiKeras className="skill-icon keras" /> },
    { name: "HuggingFace", icon: <SiOpenai className="skill-icon hf" /> }, // placeholder icon
    { name: "HTML", icon: <SiHtml5 className="skill-icon html" /> },
    { name: "CSS", icon: <SiCss3 className="skill-icon css" /> },
    { name: "JavaScript", icon: <SiJavascript className="skill-icon js" /> },
    { name: "React", icon: <FaReact className="skill-icon react" /> },
    { name: "MySQL", icon: <SiMysql className="skill-icon mysql" /> },
    { name: "GitHub", icon: <FaGithub className="skill-icon github" /> },
    { name: "GCP", icon: <SiGooglecloud className="skill-icon gcp" /> },
    { name: "OCI", icon: <SiOracle className="skill-icon oci" /> }
  ];

  return (
    <section id="skills" className="skills" ref={fadeIn.ref} style={fadeIn.style}>
      <h2>Skills</h2>
      <div className="skills-grid">
        {skills.map((s, index) => (
          <div key={index} className="skill-card">
            {s.icon}
            <p>{s.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Skills;
