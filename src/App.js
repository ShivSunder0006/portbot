import React, { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Hero from "./pages/Hero";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Skills from "./pages/Skills";
import Experience from "./pages/Experience";  // ✅ new section
import Contact from "./pages/Contact";
import ProjectModal from "./components/ProjectModal";
import Chatbot from "./components/Chatbot";


function App() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <div className="app">
      <Header />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects setSelectedProject={setSelectedProject} />
        <Skills />
        <Contact />
        // <Chatbot />
      </main>
      <Footer />

      {/* Modal for project details */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}

export default App;   // ✅ this must be here
