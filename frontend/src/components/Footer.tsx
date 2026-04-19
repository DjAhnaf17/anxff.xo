import { motion } from "framer-motion";
import { FaLinkedin, FaGithub, FaWhatsapp, FaArrowUp, FaHeart } from "react-icons/fa";
import Magnetic from "./Magnetic";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="position-relative overflow-hidden pt-5 pb-3 border-top border-secondary border-opacity-25" style={{ backgroundColor: "#02050f" }}>
      {/* Background Glow */}
      <div 
        className="position-absolute" 
        style={{ 
          top: "0%", left: "50%", width: "600px", height: "400px", 
          background: "radial-gradient(ellipse at top, rgba(0,255,255,0.08) 0%, rgba(0,0,0,0) 70%)", 
          transform: "translateX(-50%)",
          filter: "blur(60px)", zIndex: 0 
        }} 
      />

      <div className="container position-relative z-1 pt-4">
        <div className="row align-items-center justify-content-between mb-5">
          {/* Brand & Logo */}
          <div className="col-12 col-md-5 text-center text-md-start mb-4 mb-md-0">
            <h2 className="fw-bold mb-1" style={{ fontFamily: "Outfit", letterSpacing: "1px", color: "white" }}>
              JAWWAD <span className="text-info">AHNAF</span>
            </h2>
            <p className="text-muted mb-0 opacity-75">Architecting Intelligent Web Solutions.</p>
          </div>
          
          {/* Back to Top */}
          <div className="col-12 col-md-2 d-flex justify-content-center mb-4 mb-md-0">
            <Magnetic>
              <button 
                onClick={scrollToTop}
                className="btn border-0 shadow-lg d-inline-flex justify-content-center align-items-center"
                style={{ width: "60px", height: "60px", borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--accent-coral)" }}
                aria-label="Scroll to top"
              >
                <FaArrowUp size={20} />
              </button>
            </Magnetic>
          </div>

          {/* Glass Social Links */}
          <div className="col-12 col-md-5 d-flex justify-content-center justify-content-md-end gap-3">
            <Magnetic>
              <a href="https://github.com/DjAhnaf17/" target="_blank" rel="noreferrer" className="d-flex align-items-center justify-content-center border border-secondary border-opacity-50 text-white transition hover-scale shadow-sm" style={{ width: "45px", height: "45px", borderRadius: "12px", background: "rgba(255,255,255,0.03)", backdropFilter: "blur(5px)" }}>
                <FaGithub size={20} />
              </a>
            </Magnetic>
            <Magnetic>
              <a href="https://www.linkedin.com/in/jawwad-ahnaf-998727387" target="_blank" rel="noreferrer" className="d-flex align-items-center justify-content-center border border-secondary border-opacity-50 text-white transition hover-scale shadow-sm" style={{ width: "45px", height: "45px", borderRadius: "12px", background: "rgba(255,255,255,0.03)", backdropFilter: "blur(5px)" }}>
                <FaLinkedin size={20} />
              </a>
            </Magnetic>
            <Magnetic>
              <a href="https://wa.me/918870073991" target="_blank" rel="noreferrer" className="d-flex align-items-center justify-content-center border border-secondary border-opacity-50 text-white transition hover-scale shadow-sm" style={{ width: "45px", height: "45px", borderRadius: "12px", background: "rgba(255,255,255,0.03)", backdropFilter: "blur(5px)" }}>
                <FaWhatsapp size={20} />
              </a>
            </Magnetic>
          </div>
        </div>
        
        {/* Bottom Banner */}
        <div className="row mt-4 pt-4 border-top border-secondary border-opacity-25">
          <div className="col-12 d-flex flex-column flex-md-row justify-content-between align-items-center">
            <p className="text-muted small mb-2 mb-md-0 fw-light">
              &copy; {new Date().getFullYear()} Jawwad Ahnaf. All rights reserved.
            </p>
            <p className="text-muted small mb-0 d-flex align-items-center gap-1 fw-light">
              Crafted with <FaHeart className="text-coral mx-1" size={12} /> in React & Framer Motion
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
