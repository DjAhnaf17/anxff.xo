import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  url: string;
}

const ProjectsSection = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch projects from Flask backend
    fetch("http://127.0.0.1:5000/api/projects")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch projects:", err);
        setLoading(false);
      });
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--mouseX", `${x}px`);
    e.currentTarget.style.setProperty("--mouseY", `${y}px`);
  };

  return (
    <section id="projects" className="py-5">
      <div className="container py-5">
        <h2 className="display-4 fw-bold text-center mb-5">My <span className="text-gradient">Projects</span></h2>
        
        {loading ? (
          <div className="text-center"><div className="spinner-border text-info" role="status"></div></div>
        ) : (
          <div className="row g-4">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="col-md-6"
              >
                <div 
                  className="glassmorphism glassmorphism-spotlight h-100 p-4 d-flex flex-column"
                  onMouseMove={handleMouseMove}
                >
                  <h4 className="fw-bold mb-3">{project.title}</h4>
                  <p className="text-muted flex-grow-1">{project.description}</p>
                  <div className="d-flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, i) => (
                      <span key={i} className="badge bg-secondary opacity-75">{tech}</span>
                    ))}
                  </div>
                  <a href={project.url} target="_blank" rel="noreferrer" className="btn btn-outline-info mt-auto">
                    View on GitHub
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
