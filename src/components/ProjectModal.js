import React from "react";
import "../styles/Projects.css";

function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>✖</button>
        <img src={project.imageUrl} alt={project.title} />
        <h2>{project.title}</h2>
        <p>{project.longDescription}</p>
        <h4>Features</h4>
        <ul>
          {project.features.map(f => <li key={f}>{f}</li>)}
        </ul>
        <div className="modal-links">
          <a href={project.liveUrl} target="_blank" rel="noreferrer">Live Demo</a>
          <a href={project.repoUrl} target="_blank" rel="noreferrer">Source Code</a>
        </div>
      </div>
    </div>
  );
}

export default ProjectModal;
