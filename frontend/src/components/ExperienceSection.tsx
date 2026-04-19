import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

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

const StickyCard = ({ exp, index, totalCards }: { exp: any; index: number, totalCards: number }) => {
  // We use direct sticky positioning without artificial wrapper heights!
  const stickyTop = `calc(15vh + ${index * 30}px)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--mouseX", `${x}px`);
    e.currentTarget.style.setProperty("--mouseY", `${y}px`);
  };

  return (
    // The margin-bottom here defines the EXACT scroll distance before the next card arrives!
    <div 
      className="w-100 d-flex justify-content-center experience-card-wrapper"
      style={{ 
        position: "sticky",
        top: stickyTop,
        zIndex: index,
        marginBottom: index === totalCards - 1 ? "0" : "25vh"
      }}
    >
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="w-100"
      >
        <div 
          className="glassmorphism glassmorphism-spotlight max-w-4xl mx-auto p-4 p-md-5 d-flex flex-column flex-md-row gap-4 align-items-center align-items-md-start"
          onMouseMove={handleMouseMove}
          style={{ 
            borderRadius: "24px", 
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: `0 -15px 40px rgba(0,0,0,0.6)`, // Aggressive dark shadow to separate stacked cards
            maxWidth: "900px",
            backgroundColor: "rgba(5, 10, 25, 0.85)" // Solidified background so cards don't bleed visually when stacked
          }}
        >
          {/* Left Side: Logo Block */}
          <div className="flex-shrink-0 bg-dark p-3 rounded-circle d-flex align-items-center justify-content-center shadow-lg border border-secondary border-opacity-50" style={{ width: "100px", height: "100px" }}>
            {exp.logo ? (
              <img src={exp.logo} alt={exp.company} className="w-100 h-100 object-fit-contain bg-white rounded-circle" />
            ) : (
              <span className="text-info fw-bold display-6">{exp.company.charAt(0)}</span>
            )}
          </div>

          {/* Right Side: Content Block */}
          <div className="flex-grow-1 text-center text-md-start">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-2">
              <h3 className="fw-bold text-white mb-1 display-6 fs-md-4" style={{ fontFamily: "Outfit" }}>{exp.title}</h3>
              <span className="badge bg-transparent border border-coral text-coral align-self-center align-self-md-start mt-2 mt-md-0 px-3 py-2 rounded-pill shadow-sm" style={{ backdropFilter: "blur(5px)" }}>{exp.period}</span>
            </div>
            
            <h5 className="text-info opacity-75 mb-3">{exp.company}</h5>
            
            <p className="text-muted fs-5 mt-3 mb-0" style={{ lineHeight: "1.7" }}>
              {exp.description}
            </p>

            {exp.grade && (
              <div className="mt-4 text-center text-md-start">
                <span className="badge bg-black bg-opacity-25 border border-info border-opacity-50 text-light px-4 py-2 fs-6 rounded-pill">
                  Score: <span className="text-info ms-1 fw-bold">{exp.grade}</span>
                </span>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const ExperienceSection = () => {
  return (
    <section id="experience" className="py-5 position-relative overflow-hidden bg-black bg-opacity-25">
      <div className="container py-5">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, type: "spring" }}
          className="text-center mb-5 pb-5"
        >
          <h2 className="display-3 fw-bold mb-3" style={{ fontFamily: "Outfit" }}>
            Experience & <span className="text-gradient">Qualifications</span>
          </h2>
          <p className="text-muted fs-5 max-w-2xl mx-auto">A chronical of my professional and academic journey.</p>
        </motion.div>

        {/* Sticky Deck Wrapper */}
        <div className="position-relative w-100 mt-5">
          {experiences.map((exp, index) => (
            <StickyCard key={index} exp={exp} index={index} totalCards={experiences.length} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default ExperienceSection;
