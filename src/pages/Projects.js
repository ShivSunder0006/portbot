import React, { useState } from "react";
import "../styles/Projects.css";
// import Placeholder from "../assets/project-placeholder.jpg"; // create or replace with real images

const Placeholder = "https://via.placeholder.com/800x600.png?text=Project+Preview";


function ProjectCard({ project, onOpen }) {
  return (
    <article className="project-card" onClick={() => onOpen(project)}>
      <div className="project-left">
        <img
          src={project.image || Placeholder}
          alt={project.title}
          className="project-thumb"
          onError={(e) => { e.target.onerror = null; e.target.src = Placeholder; }}
        />
      </div>

      <div className="project-right">
        <div className="project-head">
          <h3 className="project-title">{project.title}</h3>
          <span className="project-date">{project.date}</span>
        </div>

        <p className="project-short">{project.description}</p>

        <div className="project-meta">
          <div className="project-tags">
            {project.tags.map((t) => (
              <span key={t} className="tag">{t}</span>
            ))}
          </div>

          <div className="project-links">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="btn btn-live"
              >
                Live Demo
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="btn btn-code"
              >
                View Code
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

function ProjectModal({ project, onClose }) {
  if (!project) return null;
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <div className="modal-body">
          <img
            src={project.image || Placeholder}
            alt={project.title}
            className="modal-image"
            onError={(e) => { e.target.onerror = null; e.target.src = Placeholder; }}
          />
          <div className="modal-content">
            <h2>{project.title}</h2>
            <p className="modal-sub">{project.date} • {project.stack.join(" • ")}</p>
            <p className="modal-desc">{project.longDescription}</p>

            {project.features && (
              <>
                <h4>Key features</h4>
                <ul className="modal-features">
                  {project.features.map((f) => <li key={f}>{f}</li>)}
                </ul>
              </>
            )}

            <div className="modal-actions">
              {project.liveUrl && <a className="btn btn-live" href={project.liveUrl} target="_blank" rel="noopener noreferrer">Open Live</a>}
              {project.repoUrl && <a className="btn btn-code" href={project.repoUrl} target="_blank" rel="noopener noreferrer">Open Repo</a>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [selected, setSelected] = useState(null);

  const projectData = [
    {
      title: "AniRecs Ai",
      date: "Sept 2025",
      description: "Recommendation system for anime titles using semantic NLP embeddings and vector search, deployed on Hugging Face Spaces.",
      longDescription:
        "AniRecs_Ai is a semantic recommendation engine for anime. It uses NLP embeddings to represent titles and user queries in vector space and conducts vector similarity search to return the most relevant anime recommendations. The system was packaged and deployed as an interactive demo on Hugging Face Spaces via Gradio.",
      tags: ["NLP", "Embeddings", "FAISS", "Gradio", "Hugging Face"],
      stack: ["Transformers", "Python", "Gradio", "FAISS"],
      features: [
        "Semantic embeddings for titles and queries (BERT / Transformers)",
        "Vector search backend with FAISS/Annoy for sub-second retrieval over 20k+ items",
        "Interactive Gradio frontend integrated with backend inference",
        "Deployment on Hugging Face Spaces for public demo"
      ],
      image: Placeholder,
      liveUrl: "https://huggingface.co/spaces/shivsunder0006/AniRecs_Ai", // replace with real HF Spaces URL
      repoUrl: "https://huggingface.co/spaces/shivsunder0006/AniRecs_Ai/tree/main" // replace with real GitHub URL
    },
    {
      title: "License Plate Detection (ANPR)",
      date: "March 2025",
      description: "Automated Number Plate Recognition using YOLO-style detection and OCR for text extraction; trained on 25k+ annotated images.",
      longDescription:
        "Built an end-to-end ANPR pipeline: used a YOLO-style detector / custom CNN for localizing license plates and EasyOCR for extracting alphanumeric text. Trained on a dataset of over 25,000 images with Yolo-format annotations. The pipeline produces cleaned plate text, bounding boxes, and stores results in a structured CSV for analytics and reporting.",
      tags: ["Computer Vision", "YOLO", "OCR", "TensorFlow"],
      stack: ["TensorFlow", "YOLO", "EasyOCR", "Python"],
      features: [
        "Custom CNN + YOLO detection for robust plate localization",
        "EasyOCR integration for text extraction with post-processing",
        "Trained on 25,000+ images; supports multiple plate styles",
        "Exports recognized plate text + bounding boxes to CSV"
      ],
      image: Placeholder,
      liveUrl: "https://huggingface.co/spaces/shivsunder0006/npds",
      repoUrl: "https://github.com/ShivSunder0006/numberplatedetector"
    },

    // add more projects here if you want
  ];

  return (
    <section id="projects" className="projects-section">
      <div className="projects-inner">
        <h2 className="section-title">Projects</h2>
        <div className="projects-list">
          {projectData.map((p) => (
            <ProjectCard key={p.title} project={p} onOpen={(proj) => setSelected(proj)} />
          ))}
        </div>
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
