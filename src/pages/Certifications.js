import React from "react";
import "../styles/Certifications.css";

// Import logos from assets folder
import courseraLogo from "../assets/Coursera.png";
import pythonLogo from "../assets/Python.png";

function Certifications() {
  const certifications = [
    {
      title: "PyTorch for Deep Learning (Professional Certificate)",
      org: "Coursera",
      date: "Nov 17, 2025",
      description:
        "Completed the PyTorch for Deep Learning Professional Certificate, covering neural networks, PyTorch fundamentals, CNNs, RNNs, and deployment workflows.",
      credential: "https://coursera.org/verify/professional-cert/L8UI8H6LKF6E",
      certificateFile: "https://drive.google.com/file/d/1yto-qycOYYwOl5CNipr8Cc9hZ4vwYma5/view?usp=drive_link", // add your link here
      logo: courseraLogo
    },
    {
      title: "PCED™ – Certified Entry-Level Data Analyst with Python",
      org: "Python Institute",
      date: "Nov 16, 2025",
      description:
        "Validated skills in Python programming, NumPy, data preprocessing, analytics, and foundational statistics.",
      credential: "https://verify.openedg.org",
      certificateFile: "https://drive.google.com/file/d/1Hfpp-dZZDry6kHU4KyzevV0W1Sg1Fl5F/view?usp=drive_link", // add your link here
      logo: pythonLogo
    }
  ];

  return (
    <section id="certifications" className="certifications-section">
      <div className="certifications-inner">
        <h2 className="section-title">Certifications</h2>

        <div className="certifications-list">
          {certifications.map((cert, index) => (
            <div key={index} className="cert-card">

              {/* Logo */}
              <div className="cert-logo">
                <img src={cert.logo} alt={cert.org} />
              </div>

              {/* Info */}
              <div className="cert-info">
                <h3>{cert.title}</h3>
                <span className="cert-org">{cert.org}</span>
                <span className="cert-date">{cert.date}</span>
                <p>{cert.description}</p>

                {/* Actions */}
                <div className="cert-actions">
                  <a
                    href={cert.credential}
                    className="btn btn-live"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    🔗 View Credential
                  </a>

                  <a
                    href={cert.certificateFile}
                    className="btn btn-code"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    📄 View Certificate
                  </a>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Certifications;
