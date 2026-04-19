import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { FaChevronRight } from "react-icons/fa";
import Magnetic from "./Magnetic";

interface HeroProps {
  openResume: () => void;
}

const HeroSection = ({ openResume }: HeroProps) => {
  const particlesInit = useCallback(async (engine: any) => {
    await loadFull(engine);
  }, []);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.4
      }
    }
  };
  
  const wordAnim = {
    hidden: { y: 50, opacity: 0, rotateX: -30 },
    show: { y: 0, opacity: 1, rotateX: 0, transition: { type: "spring" as const, stiffness: 200, damping: 20 } }
  };

  return (
    <section 
      id="home" 
      className="position-relative vh-100 d-flex align-items-center justify-content-center overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1000 }}
    >
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: { enable: false },
          background: { color: { value: "transparent" } },
          fpsLimit: 60,
          interactivity: {
            events: {
              onHover: { enable: true, mode: "repulse" },
              resize: true,
            },
            modes: { repulse: { distance: 100, duration: 0.4 } },
          },
          particles: {
            color: { value: ["#FF7F50", "#00FFFF", "#8A2BE2", "#FFFFFF"] },
            links: { enable: false },
            move: {
              enable: true,
              speed: 1.5,
              direction: "none",
              random: true,
              straight: false,
              outModes: { default: "bounce" },
            },
            number: { density: { enable: true, area: 800 }, value: 120 },
            opacity: { value: 0.8, random: true },
            shape: { type: "circle" },
            size: { value: { min: 2, max: 7 }, random: true },
          },
          detectRetina: true,
        }}
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{ zIndex: 0 }}
      />
      
      <div className="container position-relative text-center" style={{ zIndex: 1, marginTop: "80px" }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        >
          <div style={{ transform: "translateZ(50px)" }}>
            <p className="text-coral fw-bold text-uppercase mb-3" style={{ letterSpacing: "3px" }}>The Solution You Need</p>
            
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              animate="show"
              className="display-1 fw-bold mb-4" 
              style={{ lineHeight: 1.1, textShadow: "0px 10px 30px rgba(0,0,0,0.5)", perspective: 800 }}
            >
              <div className="d-inline-flex flex-wrap justify-content-center gap-3">
                <motion.span variants={wordAnim} style={{ transformOrigin: "bottom center", display: "inline-block" }}>Building</motion.span>
              </div>
              <br />
              <div className="d-inline-flex flex-wrap justify-content-center gap-3 mt-2">
                <motion.span variants={wordAnim} className="text-coral" style={{ textShadow: "0 0 20px rgba(255,127,80,0.4)", transformOrigin: "bottom center", display: "inline-block" }}>Intelligent</motion.span> 
                <motion.span variants={wordAnim} style={{ transformOrigin: "bottom center", display: "inline-block" }}>Systems</motion.span>
              </div>
            </motion.div>

            <p className="fs-5 text-gray mb-5 mx-auto" style={{ maxWidth: "700px" }}>
              I am Jawwad Ahnaf, a Full-Stack Data Analyst & ML Developer translating complex data into actionable digital experiences. Architecting pipelines, building production models, and crafting premium UI/UX.
            </p>
            
            <div className="d-flex justify-content-center gap-4 align-items-center">
              <Magnetic>
                <a href="#contact" className="text-decoration-none d-inline-block">
                  <button className="btn-pill-white" style={{ position: "relative", zIndex: 10 }}>
                    Get In Touch <FaChevronRight className="ms-2" />
                  </button>
                </a>
              </Magnetic>
              <Magnetic>
                <a href="#projects" className="text-decoration-none d-inline-block">
                  <button className="btn-pill-white" style={{ background: "transparent", border: "2px solid #ffffff", color: "rgba(255, 255, 255, 0.7)", position: "relative", zIndex: 10 }}>
                    View Projects
                  </button>
                </a>
              </Magnetic>
              <Magnetic>
                <button onClick={openResume} className="btn-pill-white border-0 text-coral" style={{ background: "transparent", position: "relative", zIndex: 10 }}>
                  View Resume
                </button>
              </Magnetic>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
