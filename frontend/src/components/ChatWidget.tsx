import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCommentDots, FaWhatsapp, FaEnvelope, FaTimes } from 'react-icons/fa';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="chat-widget-container" style={{ position: 'fixed', bottom: '20px', left: '20px', zIndex: 9999 }}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: 'spring' as const, stiffness: 200, damping: 20 }}
            className="glassmorphism p-3 mb-3 d-flex flex-column gap-2"
            style={{ borderRadius: '15px', width: '200px', backgroundColor: 'var(--glass-bg)' }}
          >
            <h6 className="text-white mb-2 pb-2 border-bottom border-secondary d-flex justify-content-between align-items-center">
              Let's Chat!
              <FaTimes style={{ cursor: 'pointer' }} onClick={() => setIsOpen(false)} />
            </h6>
            <a href="https://wa.me/918870073991" target="_blank" rel="noreferrer" className="btn btn-outline-success d-flex align-items-center gap-2">
              <FaWhatsapp /> WhatsApp
            </a>
            <a href="mailto:jawwadahnaf04@gmail.com" className="btn btn-outline-info d-flex align-items-center gap-2">
              <FaEnvelope /> Email Me
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="btn rounded-circle shadow-lg d-flex align-items-center justify-content-center"
        style={{ width: '60px', height: '60px', backgroundColor: 'var(--accent-neon)', color: '#050505', border: 'none' }}
      >
        {isOpen ? <FaTimes size={24} /> : <FaCommentDots size={24} />}
      </motion.button>
    </div>
  );
};

export default ChatWidget;
