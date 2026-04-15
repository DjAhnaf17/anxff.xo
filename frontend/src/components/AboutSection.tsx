import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaWhatsapp, FaEnvelope, FaPhone } from "react-icons/fa";

const AboutSection = () => {
  const skills = [
    "Python", "SQL", "C++", "Java", "JavaScript", 
    "Machine Learning", "Data Science", "Pandas", "Scikit-learn",
    "Flask", "Streamlit", "Power BI", "AWS"
  ];

  return (
    <section id="about" className="py-5">
      <div className="container py-5">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="row align-items-center"
        >
          <div className="col-lg-6 mb-4 mb-lg-0">
            <h2 className="display-4 fw-bold mb-4">About <span className="text-gradient">Me</span></h2>
            <p className="text-muted fs-5 mb-4">
              I am a results-driven Data Analyst and ML Developer. With hands-on industry experience in ETL pipelines, business intelligence, and end-to-end ML model development, I specialize in translating complex data into actionable insights for both technical and non-technical stakeholders.
            </p>
            
            <h4 className="fw-bold mb-3 mt-4 text-info">Technical Skills</h4>
            <div className="d-flex flex-wrap gap-2 mb-5">
              {skills.map((skill, index) => (
                <span key={index} className="badge bg-secondary opacity-75 fs-6 py-2 px-3 hover-gradient transition">
                  {skill}
                </span>
              ))}
            </div>

            <div className="d-flex flex-wrap gap-3">
              <a href="mailto:jawwadahnaf04@gmail.com" className="btn btn-outline-light text-decoration-none d-flex align-items-center gap-2">
                <FaEnvelope /> jawwadahnaf04@gmail.com
              </a>
              <a href="tel:+918870073991" className="btn btn-outline-light text-decoration-none d-flex align-items-center gap-2">
                <FaPhone /> +91 8870073991
              </a>
            </div>
          </div>
          <div className="col-lg-5 offset-lg-1">
            <div className="glassmorphism p-4 text-center">
              <h3 className="h4 mb-4">Let's Connect</h3>
              <div className="d-flex justify-content-center gap-4">
                <a href="https://github.com/jawwadahnaf" target="_blank" rel="noreferrer" className="text-light fs-1 hover-gradient transition">
                  <FaGithub />
                </a>
                <a href="https://linkedin.com/in/jawwadahnaf" target="_blank" rel="noreferrer" className="text-light fs-1 hover-gradient transition">
                  <FaLinkedin />
                </a>
                <a href="https://wa.me/918870073991" target="_blank" rel="noreferrer" className="text-light fs-1 hover-gradient transition">
                  <FaWhatsapp />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
