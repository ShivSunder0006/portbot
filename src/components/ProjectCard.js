import React from "react";
import "../styles/Projects.css";

function ProjectCard({ project, onClick }) {
  return (
    <div className="project-card" onClick={onClick}>
      <img src={project.imageUrl} alt={project.title} />
      <div className="project-overlay">View Details</div>
      <div className="project-content">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="tags">
          {project.tags.map(tag => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;   // 👈 IMPORTANT
