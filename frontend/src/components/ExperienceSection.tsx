import { motion } from "framer-motion";

const experiences = [
  {
    title: "Data Analyst Intern",
    company: "Intuitive Technosys (I.T Computer Education)",
    period: "Jul 2025 - Dec 2025",
    description: "Built ETL pipelines using Pandas/NumPy, reducing manual prep time by 30%. Designed interactive Power BI dashboards replacing weekly Excel reports.",
    grade: "",
    logo: "/images/ITLogo.png"
  },
  {
    title: "Technical Trainer",
    company: "Intuitive Technosys (I.T Computer Education)",
    period: "Jul 2022 - Jun 2025",
    description: "Designed and delivered structured training programs in Python, C, C++, and Java for 50+ students. Mentored capstone projects with a 90%+ success rate.",
    grade: "",
    logo: "/images/ITLogo.png"
  },
  {
    title: "B.Sc Data Science",
    company: "Islamiah College (Autonomous)",
    period: "2022 - 2025",
    description: "Focused on advanced data architectures, algorithms, and machine learning models. Graduated with High Proficiency as a University Rank Holder.",
    grade: "8.96 CGPA",
    logo: "/images/Logo.png"
  },
  {
    title: "High School",
    company: "Islamiah Boys Higher Secondary School",
    period: "2021 - 2022",
    description: "Core foundational education with emphasis on Science and Mathematics.",
    grade: "79%",
    logo: "/images/logo2.png"
  }
];

const ExperienceSection = () => {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--mouseX", `${x}px`);
    e.currentTarget.style.setProperty("--mouseY", `${y}px`);
  };

  return (
    <section id="experience" className="py-5 bg-black bg-opacity-25">
      <div className="container py-5">
        <h2 className="display-4 fw-bold text-center mb-5">Experience & <span className="text-gradient">Qualifications</span></h2>
        
        <div className="row justify-content-center">
          <div className="col-lg-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="glassmorphism glassmorphism-spotlight p-4 mb-4 d-flex flex-column flex-md-row align-items-center gap-4"
                onMouseMove={handleMouseMove}
              >
                {exp.logo && (
                  <div className="flex-shrink-0">
                    <img 
                      src={exp.logo} 
                      alt={exp.company} 
                      className="rounded shadow-sm"
                      style={{ width: "90px", height: "90px", objectFit: "contain", backgroundColor: "rgba(255,255,255,0.05)", padding: "8px", position: "relative", zIndex: 1 }} 
                    />
                  </div>
                )}
                <div className="flex-grow-1 text-center text-md-start w-100" style={{ position: "relative", zIndex: 1 }}>
                  <div className="d-flex justify-content-between align-items-md-center flex-column flex-md-row mb-2">
                    <h4 className="fw-bold mb-0 text-info">{exp.title}</h4>
                    <span className="badge bg-info text-dark mt-2 mt-md-0">{exp.period}</span>
                  </div>
                  <h5 className="text-secondary">{exp.company}</h5>
                  <p className="text-muted mt-3 mb-2">{exp.description}</p>
                  {exp.grade && (
                    <span className="badge border border-info text-light bg-transparent py-2 px-3 mt-1 fs-6">
                      Score: <span className="text-info fw-bold">{exp.grade}</span>
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
