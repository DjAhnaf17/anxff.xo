import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaExternalLinkAlt, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Magnetic from "./Magnetic";

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  url: string;
  liveUrl?: string; // Optional field for live demo link
  image?: string;   // Optional field for hero image
  hideLiveDemo?: boolean; // Flag to hide live demo button
}

const ProjectsSection = () => {
  const [projects] = useState<Project[]>([
    {
      id: 1,
      title: "Med-Predict — ML-Powered Disease Detection System",
      description: "An intelligent healthcare support application designed to assist in early disease detection using machine learning. It features a responsive UI and automatically generates medical PDF reports.",
      technologies: ["Python", "Streamlit", "Machine Learning", "Scikit-learn"],
      url: "https://github.com/DjAhnaf17/Med-Predict",
      hideLiveDemo: true
    },
    {
      id: 2,
      title: "PlotPlus — ML Property Price Predictor",
      description: "A full-stack web application built using Flask, Machine Learning, and PostgreSQL, designed to predict property prices based on area, number of rooms, and location.",
      technologies: ["Python", "Flask", "PostgreSQL", "Machine Learning", "HTML/CSS/JS"],
      url: "https://github.com/DjAhnaf17/PlotPlus",
      liveUrl: "https://plotplus.onrender.com/"
    },
    {
      id: 3,
      title: "Royal Suppliers Web Platform",
      description: "A modern, responsive web application built for Royal Suppliers to manage operations and provide an excellent user experience.",
      technologies: ["React", "TypeScript", "Node.js", "TailwindCSS"],
      url: "https://github.com/DjAhnaf17/RoyalSuppliersNewWeb",
      liveUrl: "https://royalsuppliersvnb.in/"
    }
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Automatic carousel delay
  useEffect(() => {
    if (projects.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % projects.length);
    }, 5000); // 5 seconds per slide
    return () => clearInterval(interval);
  }, [projects]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--mouseX", `${x}px`);
    e.currentTarget.style.setProperty("--mouseY", `${y}px`);
  };

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  };

  return (
    <section id="projects" className="py-5">
      <div className="container py-5 overflow-hidden">
        <h2 className="display-4 fw-bold text-center mb-5">My <span className="text-gradient">Projects</span></h2>
        
        {projects.length > 0 ? (
          <div className="position-relative mx-auto mt-4" style={{ maxWidth: "800px" }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="w-100"
              >
                <div 
                  className="glassmorphism glassmorphism-spotlight h-100 p-0 d-flex flex-column overflow-hidden shadow-lg"
                  onMouseMove={handleMouseMove}
                  style={{ borderRadius: "15px", minHeight: "350px" }}
                >
                  {/* Browser Window Header */}
                  <div className="w-100 px-3 py-2 border-bottom border-secondary d-flex align-items-center" style={{ backgroundColor: "rgba(0,0,0,0.3)" }}>
                    <div className="d-flex gap-2">
                      <div className="rounded-circle" style={{ width: "12px", height: "12px", backgroundColor: "#ff5f56" }}></div>
                      <div className="rounded-circle" style={{ width: "12px", height: "12px", backgroundColor: "#ffbd2e" }}></div>
                      <div className="rounded-circle" style={{ width: "12px", height: "12px", backgroundColor: "#27c93f" }}></div>
                    </div>
                    <div className="ms-3 text-muted" style={{ fontSize: "0.8rem", fontFamily: "monospace" }}>
                      {projects[currentIndex].liveUrl ? new URL(projects[currentIndex].liveUrl).hostname : "localhost:3000"}
                    </div>
                  </div>

                  {/* Thumbnail Mockup (Optional) */}
                  {projects[currentIndex].image && (
                    <div className="w-100 border-bottom border-secondary" style={{ height: "150px", objectFit: "cover", overflow: "hidden" }}>
                      <img src={projects[currentIndex].image} alt={projects[currentIndex].title} className="w-100 h-100" style={{ objectFit: "cover" }} />
                    </div>
                  )}

                  {/* Project Content */}
                  <div className="p-3 p-md-5 d-flex flex-column flex-grow-1" style={{ position: "relative", zIndex: 1 }}>
                    <h4 className="fw-bold mb-3">{projects[currentIndex].title}</h4>
                    <p className="text-muted flex-grow-1 fs-5">{projects[currentIndex].description}</p>
                    
                    <div className="d-flex flex-wrap gap-2 mb-4">
                      {projects[currentIndex].technologies.map((tech, i) => (
                        <span key={i} className="badge bg-secondary opacity-75 fs-6">{tech}</span>
                      ))}
                    </div>
                    
                    {/* Action Button */}
                    <div className="d-flex flex-wrap gap-3 justify-content-center mt-auto pt-4 border-top border-secondary border-opacity-50">
                      {!projects[currentIndex].hideLiveDemo && (
                        <Magnetic>
                          <a href={projects[currentIndex].liveUrl || projects[currentIndex].url} target="_blank" rel="noreferrer" className="btn border-0 text-white d-flex align-items-center gap-2 px-4 shadow-lg transition" style={{ borderRadius: "30px", backgroundColor: "var(--accent-neon)" }}>
                            Live Demo <FaExternalLinkAlt size={14} />
                          </a>
                        </Magnetic>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Carousel Controls */}
            <div className="d-flex justify-content-center align-items-center gap-4 mt-4">
              <button 
                onClick={prevProject} 
                className="btn btn-sm btn-outline-light rounded-circle p-2 d-flex align-items-center justify-content-center"
                style={{ width: "40px", height: "40px", borderColor: "rgba(255,255,255,0.2)" }}
              >
                <FaChevronLeft />
              </button>
              
              <div className="d-flex gap-2">
                {projects.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className="btn p-0"
                    style={{
                      width: currentIndex === i ? "30px" : "10px",
                      height: "10px",
                      borderRadius: "10px",
                      backgroundColor: currentIndex === i ? "var(--accent-neon)" : "rgba(255,255,255,0.3)",
                      transition: "all 0.3s ease"
                    }}
                    aria-label={`Go to project ${i + 1}`}
                  />
                ))}
              </div>

              <button 
                onClick={nextProject} 
                className="btn btn-sm btn-outline-light rounded-circle p-2 d-flex align-items-center justify-content-center"
                style={{ width: "40px", height: "40px", borderColor: "rgba(255,255,255,0.2)" }}
              >
                <FaChevronRight />
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center text-muted">No projects found.</div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
