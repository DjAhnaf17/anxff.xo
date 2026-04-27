
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

const TimelineItem = ({ exp, index }: { exp: any; index: number }) => {
  const isEven = index % 2 === 0;

  return (
    <div className={`row w-100 mb-5 position-relative align-items-center justify-content-${isEven ? 'start' : 'end'} mx-0`}>
      {/* Center Line Marker */}
      <div className="position-absolute start-50 translate-middle-x rounded-circle d-none d-md-block" style={{ width: '20px', height: '20px', zIndex: 2, backgroundColor: 'var(--accent-neon)', border: '4px solid var(--primary-bg)' }} />

      <motion.div 
        initial={{ opacity: 0, x: isEven ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, type: "spring" as const, stiffness: 100 }}
        className={`col-12 col-md-5 ${isEven ? 'text-md-end pe-md-5' : 'text-md-start ps-md-5'}`}
      >
        <div className="glassmorphism p-3 p-md-4 position-relative transition" style={{ borderRadius: '20px' }}>
          {/* Arrow pointing to center */}
          <div 
            className="position-absolute top-50 translate-middle-y d-none d-md-block"
            style={{
              [isEven ? 'right' : 'left']: '-10px',
              width: 0,
              height: 0,
              borderTop: '10px solid transparent',
              borderBottom: '10px solid transparent',
              [isEven ? 'borderLeft' : 'borderRight']: '10px solid var(--border-color)',
            }}
          />

          <h3 className="fw-bold mb-2" style={{ color: "var(--text-white)", fontFamily: "Outfit" }}>{exp.title}</h3>
          <span className="badge bg-transparent border border-coral text-neon mb-3 px-3 py-2 rounded-pill shadow-sm">{exp.period}</span>
          <h5 className="text-info opacity-75 mb-3">{exp.company}</h5>
          <p className="text-muted mb-0" style={{ lineHeight: "1.7", color: "var(--text-gray)" }}>{exp.description}</p>
          
          {exp.grade && (
            <div className={`mt-3 ${isEven ? 'text-md-end' : 'text-md-start'}`}>
              <span className="badge bg-black bg-opacity-25 border border-info border-opacity-50 px-3 py-2 fs-6 rounded-pill" style={{ color: "var(--text-white)" }}>
                Score: <span className="text-info ms-1 fw-bold">{exp.grade}</span>
              </span>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

const ExperienceSection = () => {
  return (
    <section id="experience" className="py-5 position-relative overflow-hidden" style={{ backgroundColor: "var(--primary-bg)" }}>
      <div className="container py-5">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, type: "spring" as const }}
          className="text-center mb-5 pb-5"
        >
          <h2 className="display-3 fw-bold mb-3" style={{ fontFamily: "Outfit" }}>
            Experience & <span className="text-gradient">Qualifications</span>
          </h2>
          <p className="text-muted fs-5 max-w-2xl mx-auto">A chronical of my professional and academic journey.</p>
        </motion.div>

        <div className="position-relative w-100 mt-5 mx-auto py-4" style={{ maxWidth: "1000px" }}>
          {/* Central Line */}
          <div className="position-absolute top-0 bottom-0 start-50 translate-middle-x d-none d-md-block" style={{ width: "4px", backgroundColor: "var(--border-color)", borderRadius: "2px" }} />
          
          {experiences.map((exp, index) => (
            <TimelineItem key={index} exp={exp} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
