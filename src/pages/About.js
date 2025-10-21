import React from "react";
import "../styles/About.css";
import useScrollFadeIn from "../utils/useScrollFadeIn";
import ResumePDF from "../assets/ShivSunder.pdf"; // ✅ Add your PDF file in src/assets

function About() {
  const fadeIn = useScrollFadeIn();

  return (
    <section id="about" className="about" ref={fadeIn.ref} style={fadeIn.style}>
      <div className="about-container">
        {/* Image */}
        <div className="about-img-wrapper">
          <img
            src="https://placehold.co/500x500/6b46c1/ffffff?text=About+Me"
            alt="About Me"
            className="about-img"
          />
        </div>

        {/* Text */}
        <div className="about-text">
          <h2>About Me</h2>
          <p>
            My journey into technology began at <b>NIT Rourkela</b>, where I was
            introduced to a new and exciting environment that sparked my
            curiosity. I started by building a strong foundation with
            <b> Competitive Programming</b>, <b>Data Structures & Algorithms</b>,
            and also explored the world of <b>Web Development</b>.
          </p>
          <p>
            However, it was in my third year that I was introduced to{" "}
            <b>AI and Machine Learning</b>, and I have been hooked ever since. I
            find the field incredibly interesting and am deeply passionate about
            its potential to solve complex problems.
          </p>
          <p>
            This passion led me to an internship at <b>Quantiphi</b>, where I
            truly put my ability as a quick learner to the test. I was tasked
            with challenging projects in <b>NLP</b>, <b>Computer Vision</b>, and{" "}
            <b>Time Series</b>, all with tight deadlines.
          </p>
          <p>
            This experience was instrumental, proving my ability to not only
            apply existing knowledge but also to <b>learn fast</b> and deliver
            results under pressure. I am now eager to bring that same energy,
            passion, and problem-solving ability to a new role.
          </p>

          {/* ✅ Download CV Button */}
          <div className="cv-btn-wrapper">
            <a href={ResumePDF} download className="cv-btn">
              📄 Download CV
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
