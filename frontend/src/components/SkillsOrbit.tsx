import { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { 
  SiPython, SiCplusplus, SiJavascript, SiScikitlearn, SiPandas, 
  SiFlask, SiStreamlit, SiReact, 
  SiGit, SiDocker, SiLinux, SiPostgresql
} from "react-icons/si";
import { FaJava, FaAws, FaChartBar } from "react-icons/fa";

const skills = [
  { name: "Python", icon: <SiPython size={40} />, color: "#3776AB" },
  { name: "SQL", icon: <SiPostgresql size={40} />, color: "#336791" },
  { name: "C++", icon: <SiCplusplus size={40} />, color: "#00599C" },
  { name: "Java", icon: <FaJava size={40} />, color: "#007396" },
  { name: "JavaScript", icon: <SiJavascript size={40} />, color: "#F7DF1E" },
  { name: "React", icon: <SiReact size={40} />, color: "#61DAFB" },
  { name: "Scikit-Learn", icon: <SiScikitlearn size={40} />, color: "#F7931E" },
  { name: "Pandas", icon: <SiPandas size={40} />, color: "#150458" },
  { name: "Flask", icon: <SiFlask size={40} />, color: "var(--text-white)" },
  { name: "Streamlit", icon: <SiStreamlit size={40} />, color: "#FF4B4B" },
  { name: "Power BI", icon: <FaChartBar size={40} />, color: "#F2C811" },
  { name: "AWS", icon: <FaAws size={40} />, color: "#FF9900" },
  { name: "Git", icon: <SiGit size={40} />, color: "#F05032" },
  { name: "Docker", icon: <SiDocker size={40} />, color: "#2496ED" },
  { name: "Linux", icon: <SiLinux size={40} />, color: "#FCC624" },
];

export default function SkillsOrbit() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [orbitRadius, setOrbitRadius] = useState(180);
  const [iconSize, setIconSize] = useState(40);
  const [boxSize, setBoxSize] = useState(80);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 500) {
        setOrbitRadius(120);
        setIconSize(24);
        setBoxSize(50);
      } else if (width < 768) {
        setOrbitRadius(150);
        setIconSize(30);
        setBoxSize(60);
      } else {
        setOrbitRadius(180);
        setIconSize(40);
        setBoxSize(80);
      }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Mouse tracking values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for mouse movement
  const springConfig = { damping: 20, stiffness: 100, mass: 1.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Transform mouse values into rotation degrees. 
  // Base rotation accumulates over time, mouse rotation adds to it.
  const baseRotationX = useMotionValue(0);
  const baseRotationY = useMotionValue(0);

  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();

    const animate = (time: number) => {
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      // Increment base rotation slowly for idle spinning
      baseRotationY.set(baseRotationY.get() + delta * 15); // 15 degrees per second
      baseRotationX.set(baseRotationX.get() + delta * 5);  // 5 degrees per second

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    
    // Calculate mouse position relative to center of container
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Convert to rotation values (moving right rotates Y positively, moving down rotates X negatively)
    mouseX.set((e.clientX - centerX) * 0.2); 
    mouseY.set((e.clientY - centerY) * -0.2);
  };

  const handleMouseLeave = () => {
    // Reset mouse influence to 0 when leaving
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div 
      className="position-relative w-100 h-100 d-flex justify-content-center align-items-center"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: "1200px" }}
    >
      {/* Background Glowing Lights */}
      <div 
        className="position-absolute rounded-circle" 
        style={{ 
          width: "250px", height: "250px", 
          background: "radial-gradient(circle, rgba(57,255,20,0.6) 0%, rgba(0,0,0,0) 70%)", 
          filter: "blur(60px)", zIndex: 0,
          transform: "translate(-30%, -30%)"
        }} 
      />
      <div 
        className="position-absolute rounded-circle" 
        style={{ 
          width: "200px", height: "200px", 
          background: "radial-gradient(circle, rgba(0,255,255,0.4) 0%, rgba(0,0,0,0) 70%)", 
          filter: "blur(50px)", zIndex: 0,
          transform: "translate(40%, 40%)"
        }} 
      />

      <motion.div
        ref={containerRef}
        style={{
          width: "100%", height: "100%",
          position: "relative",
          transformStyle: "preserve-3d",
          rotateX: useTransform(() => baseRotationX.get() + smoothY.get()),
          rotateY: useTransform(() => baseRotationY.get() + smoothX.get()),
          zIndex: 1
        }}
      >
        {skills.map((skill, index) => {
          // Mathematical spherical distribution (Fibonacci lattice)
          const phi = Math.acos(-1 + (2 * index) / skills.length);
          const theta = Math.sqrt(skills.length * Math.PI) * phi;
          
          const r = orbitRadius; // Dynamic radius of the sphere
          const x = r * Math.cos(theta) * Math.sin(phi);
          const y = r * Math.sin(theta) * Math.sin(phi);
          const z = r * Math.cos(phi);

          return (
            <div
              key={skill.name}
              className="glassmorphism d-flex justify-content-center align-items-center shadow-lg"
              title={skill.name}
              style={{
                position: "absolute",
                top: "50%", left: "50%",
                width: `${boxSize}px`, height: `${boxSize}px`,
                transform: `translate3d(${x}px, ${y}px, ${z}px) translate(-50%, -50%)`,
                backfaceVisibility: "visible", 
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "50%",
                boxShadow: `0 0 20px ${skill.color}40`,
                color: skill.color,
                background: "var(--glass-bg)"
              }}
            >
              {/* Internal reverse rotation to keep logos facing forward relative to the container 
                  (Not perfectly billboarding, but creates a cool badge effect attached to the sphere surface) 
              */}
              <div style={{ transform: `scale(${iconSize / 40})` }}>
                {skill.icon}
              </div>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
