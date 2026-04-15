import { useRef } from "react";
import { motion, useAnimationFrame } from "framer-motion";

const skills = [
  "Python", "SQL", "C++", "Java", "JavaScript", 
  "Machine Learning", "Data Science", "Pandas", "Scikit",
  "Flask", "Streamlit", "Power BI", "AWS",
  "React", "Framer", "Git", "Docker", "Linux"
];

export default function SkillsOrbit() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useAnimationFrame((time) => {
    if (containerRef.current) {
      // Endless rotation over time
      containerRef.current.style.transform = `rotateY(${time * 0.015}deg) rotateX(${time * 0.005}deg)`;
    }
  });

  return (
    <div style={{ perspective: "1000px", width: "100%", height: "400px", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <motion.div
        ref={containerRef}
        style={{
          width: "100%", height: "100%",
          position: "relative",
          transformStyle: "preserve-3d"
        }}
      >
        {skills.map((skill, index) => {
          // Math to calculate points on a sphere (Fibonacci sphere)
          const phi = Math.acos(-1 + (2 * index) / skills.length);
          const theta = Math.sqrt(skills.length * Math.PI) * phi;
          
          const r = 160;
          const x = r * Math.cos(theta) * Math.sin(phi);
          const y = r * Math.sin(theta) * Math.sin(phi);
          const z = r * Math.cos(phi);

          return (
            <div
              key={skill}
              className="badge bg-secondary opacity-75 fs-6 py-2 px-3 shadow"
              style={{
                position: "absolute",
                top: "50%", left: "50%",
                transform: `translate3d(${x}px, ${y}px, ${z}px) translate(-50%, -50%)`,
                backfaceVisibility: "visible", // Keeping visible so user can see through to the back side 
                border: "1px solid rgba(255,127,80,0.3)"
              }}
            >
              {skill}
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
