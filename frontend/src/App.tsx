import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ExperienceSection from './components/ExperienceSection';
import ProjectsSection from './components/ProjectsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import Terminal from './components/Terminal';
import BootLoader from './components/BootLoader';
import ResumeDrawer from './components/ResumeDrawer';
import ChatWidget from './components/ChatWidget';

function App() {
  const [isBooting, setIsBooting] = useState(true);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Global reading progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    // Inject fonts
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&family=Outfit:wght@400;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  return (
    <>
      {/* Global Scroll Bar */}
      <motion.div
        className="position-fixed top-0 start-0 z-3"
        style={{ scaleX, height: "4px", backgroundColor: "var(--accent-neon)", transformOrigin: "0%", width: "100%" }}
      />

      <AnimatePresence>
        {isBooting && <BootLoader onComplete={() => setIsBooting(false)} />}
      </AnimatePresence>

      {!isBooting && (
        <div className="App min-vh-100 position-relative">
          <CustomCursor />
          <Terminal />
          <ChatWidget />
          <ResumeDrawer isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
          <Navbar openResume={() => setIsResumeOpen(true)} theme={theme} toggleTheme={toggleTheme} />
          <div style={{ paddingTop: '70px' }}>
            <HeroSection openResume={() => setIsResumeOpen(true)} />
            <AboutSection />
            <ExperienceSection />
            <ProjectsSection />
            <ContactSection />
          </div>
          <Footer />
        </div>
      )}
    </>
  );
}

export default App;
