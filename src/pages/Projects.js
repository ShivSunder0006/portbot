import React, { useState } from "react";
import "../styles/Projects.css";
// import placeholderImg from "../assets/project-placeholder.jpg";

const Placeholder = "https://via.placeholder.com/800x600.png?text=Project+Preview";


function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      title: "Footfall Counter",
      period: "Oct 2025",
      short: "Real-time crowd counting app using YOLOv8 and OpenCV, deployed on Hugging Face.",
      tags: ["YOLOv8", "OpenCV", "Python", "Streamlit", "Hugging Face"],
      features: [
        "Developed a real-time Footfall Counter for detecting people entering and exiting defined zones.",
        "Deployed on Hugging Face Spaces using Streamlit with a clean, interactive UI.",
        "Supports both live camera feeds and uploaded videos for flexible analytics."
      ],
      liveUrl: "https://huggingface.co/spaces/shivsunder0006/footfallcounter",
      repoUrl: "https://github.com/ShivSunder0006/FootfallCounter",
      imageUrl: Placeholder
    },
    {
      title: "AniRecs AI",
      period: "Sept 2025",
      short: "Anime recommendation system using NLP embeddings and semantic similarity, deployed on Hugging Face.",
      tags: ["Transformers", "Gradio", "Python", "Hugging Face"],
      features: [
        "Deployed on Hugging Face Spaces leveraging NLP embeddings for semantic similarity between anime titles.",
        "Engineered backend vector search (FAISS/Annoy) for top-k recommendations among 20,000+ anime titles.",
        "Interactive Gradio frontend integrated with model inference for seamless user experience."
      ],
      liveUrl: "https://huggingface.co/spaces/shivsunder0006/anirecs_ai",
      repoUrl: "https://github.com/ShivSunder0006/AniRecs_AI",
      imageUrl: Placeholder
    },
    {
      title: "License Plate Detection",
      period: "March 2025",
      short: "Real-time ANPR system using YOLO and EasyOCR for automatic number plate recognition.",
      tags: ["TensorFlow", "YOLO", "OCR", "Python"],
      features: [
        "Trained on 25K+ annotated images in YOLO format for robust license plate localization.",
        "Integrated EasyOCR for high-accuracy alphanumeric extraction.",
        "Outputs recognized plates with metadata in a structured CSV report."
      ],
      liveUrl: "https://github.com/ShivSunder0006/License-Plate-Detection",
      repoUrl: "https://github.com/ShivSunder0006/License-Plate-Detection",
      imageUrl: Placeholder
    }
  ];

  return (
    <section id="projects" className="projects-section">
      <div className="projects-inner">
        <h2 className="section-title">Projects</h2>

        <div className="projects-list">
          {projects.map((project, index) => (
            <div
              key={index}
              className="project-card"
              onClick={() => setSelectedProject(project)}
            >
              <div className="project-left">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="project-thumb"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://placehold.co/600x400/00cfe0/ffffff?text=Project+Image";
                  }}
                />
              </div>

              <div className="project-right">
                <div className="project-head">
                  <h3 className="project-title">{project.title}</h3>
                  <span className="project-date">{project.period}</span>
                </div>
                <p className="project-short">{project.short}</p>

                <div className="project-meta">
                  <div className="project-tags">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="project-links">
                    <a
                      href={project.liveUrl}
                      className="btn btn-live"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      🌐 Live
                    </a>
                    <a
                      href={project.repoUrl}
                      className="btn btn-code"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      💻 Code
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedProject && (
          <div
            className="modal-backdrop"
            onClick={() => setSelectedProject(null)}
          >
            <div
              className="modal-card"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="modal-close"
                onClick={() => setSelectedProject(null)}
              >
                ✕
              </button>
              <div className="modal-body">
                <img
                  src={selectedProject.imageUrl}
                  alt={selectedProject.title}
                  className="modal-image"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://placehold.co/600x400/00cfe0/ffffff?text=Project";
                  }}
                />
                <div className="modal-content">
                  <h2>{selectedProject.title}</h2>
                  <div className="modal-sub">{selectedProject.period}</div>
                  <p className="modal-desc">{selectedProject.short}</p>
                  <ul className="modal-features">
                    {selectedProject.features.map((feat, i) => (
                      <li key={i}>{feat}</li>
                    ))}
                  </ul>
                  <div className="project-links">
                    <a
                      href={selectedProject.liveUrl}
                      className="btn btn-live"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      🌐 Live Demo
                    </a>
                    <a
                      href={selectedProject.repoUrl}
                      className="btn btn-code"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      💻 Source Code
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Projects;
