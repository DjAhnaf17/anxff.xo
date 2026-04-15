import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaLinkedin, FaGithub, FaWhatsapp, FaBars, FaTimes } from "react-icons/fa";
import Magnetic from "./Magnetic";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Close menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 992) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const closeMenu = () => setIsOpen(false);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" }
  ];

  const socialLinks = (
    <div className="d-flex gap-3 mt-3 mt-lg-0 ms-lg-4 justify-content-center">
      <Magnetic><a href="https://linkedin.com/in/jawwadahnaf" target="_blank" rel="noreferrer" className="text-white fs-5 transition hover-gradient d-inline-block p-1"><FaLinkedin /></a></Magnetic>
      <Magnetic><a href="https://github.com/jawwadahnaf" target="_blank" rel="noreferrer" className="text-white fs-5 transition hover-gradient d-inline-block p-1"><FaGithub /></a></Magnetic>
      <Magnetic><a href="https://wa.me/918870073991" target="_blank" rel="noreferrer" className="text-white fs-5 transition hover-gradient d-inline-block p-1"><FaWhatsapp /></a></Magnetic>
    </div>
  );

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="navbar navbar-expand-lg fixed-top"
      style={{ backgroundColor: "rgba(10, 24, 61, 0.85)", backdropFilter: "blur(10px)", borderBottom: "1px solid var(--border-color)", zIndex: 1000 }}
    >
      <div className="container py-2">
        <div className="d-flex w-100 justify-content-between align-items-center d-lg-none">
          <span className="fw-bold fs-4 text-gradient" style={{fontFamily: 'Outfit'}}>Portfolio.</span>
          <button 
            className="btn text-white p-0 border-0 fs-3" 
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="d-none d-lg-flex justify-content-center w-100">
          <ul className="navbar-nav gap-4 align-items-center">
            {navLinks.map((link) => (
              <li className="nav-item" key={link.name}>
                <a className="nav-link" href={link.href}>{link.name}</a>
              </li>
            ))}
            <li className="nav-item">
              {socialLinks}
            </li>
          </ul>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-100 d-lg-none overflow-hidden"
            style={{ backgroundColor: "var(--nav-bg)" }}
          >
            <div className="container py-4 border-top border-secondary">
              <ul className="navbar-nav gap-3 text-center">
                {navLinks.map((link) => (
                  <li className="nav-item" key={link.name}>
                    <a className="nav-link fs-4" href={link.href} onClick={closeMenu}>{link.name}</a>
                  </li>
                ))}
                <li className="nav-item mt-2 pt-2 border-top border-secondary">
                  {socialLinks}
                </li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
