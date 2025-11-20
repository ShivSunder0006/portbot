import React, { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Hero from "./pages/Hero";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Skills from "./pages/Skills";
import Experience from "./pages/Experience";  
import Contact from "./pages/Contact";
import ProjectModal from "./components/ProjectModal";
import Certifications from "./pages/Certifications";

<<<<<<< HEAD
import Chatbot from "./components/Chatbot";
=======
// import Chatbot from "./components/Chatbot";
>>>>>>> d6b6e75052f8281d7444f50a685872d1a8ac4e54


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
        <Certifications />
        <Skills />
        <Contact />
        <Chatbot />
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
