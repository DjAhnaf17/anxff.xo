import { useEffect, useState } from 'react';
import { AnimatePresence } from "framer-motion";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ExperienceSection from './components/ExperienceSection';
import ProjectsSection from './components/ProjectsSection';
import ContactSection from './components/ContactSection';

import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import Terminal from './components/Terminal';
import BootLoader from './components/BootLoader';
import ResumeDrawer from './components/ResumeDrawer';

function App() {
  const [isBooting, setIsBooting] = useState(true);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  useEffect(() => {
    // Inject fonts
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&family=Outfit:wght@400;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isBooting && <BootLoader onComplete={() => setIsBooting(false)} />}
      </AnimatePresence>

      {!isBooting && (
        <div className="App min-vh-100">
          <CustomCursor />
          <Terminal />
          <ResumeDrawer isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
          <Navbar openResume={() => setIsResumeOpen(true)} />
          <div style={{ paddingTop: '70px' }}>
            <HeroSection openResume={() => setIsResumeOpen(true)} />
            <AboutSection />
            <ExperienceSection />
            <ProjectsSection />
            <ContactSection />
          </div>
        </div>
      )}
    </>
  );
}

export default App;
