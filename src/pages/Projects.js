import React from "react";
import "../styles/Projects.css";

function Projects() {
  const projectData = [
    {
      title: "Project One",
      description: "A brief description of your project. What problem it solves and why it’s cool.",
      tags: ["React", "CSS", "API"],
      imageUrl: "https://placehold.co/200x200?text=Proj+1",
      repoUrl: "https://github.com/yourusername/project1",
      liveUrl: "https://yourproject1.com"
    },
    {
      title: "Project Two",
      description: "Another exciting project you built with backend integration.",
      tags: ["Node.js", "Express", "MongoDB"],
      imageUrl: "https://placehold.co/200x200?text=Proj+2",
      repoUrl: "https://github.com/yourusername/project2",
      liveUrl: "https://yourproject2.com"
    },
    {
      title: "Project Three",
      description: "A machine learning powered app with interesting features.",
      tags: ["Python", "Flask", "ML"],
      imageUrl: "https://placehold.co/200x200?text=Proj+3",
      repoUrl: "https://github.com/yourusername/project3",
      liveUrl: "https://yourproject3.com"
    }
  ];

  return (
    <section id="projects" className="projects">
      <h2>My Projects</h2>
      <div className="projects-grid">
        {projectData.map((project, idx) => (
          <div key={idx} className="project-card">
            <img src={project.imageUrl} alt={project.title} className="project-logo" />
            <div className="project-info">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="tags">
                {project.tags.map((tag, i) => (
                  <span key={i}>{tag}</span>
                ))}
              </div>
              <div className="project-links">
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-link live">
                  🌐 Live Demo
                </a>
                <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="btn-link github">
                  💻 View Code
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;
