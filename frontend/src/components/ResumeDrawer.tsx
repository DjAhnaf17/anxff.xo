import { motion, AnimatePresence } from "framer-motion";
import { FaDownload, FaTimes } from "react-icons/fa";
import Magnetic from "./Magnetic";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeDrawer({ isOpen, onClose }: Props) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="position-fixed top-0 start-0 w-100 h-100"
            style={{ backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(5px)", zIndex: 10050 }}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="position-fixed top-0 end-0 h-100 glassmorphism p-4 d-flex flex-column"
            style={{ width: "min(500px, 100vw)", zIndex: 10051, borderRadius: "20px 0 0 20px" }}
          >
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="fw-bold mb-0 text-white">My Resume</h3>
              <button className="btn btn-outline-light rounded-circle p-2 d-flex align-items-center justify-content-center hover-gradient" onClick={onClose}>
                <FaTimes />
              </button>
            </div>
            
            <div className="flex-grow-1 border border-secondary rounded p-0 d-flex align-items-center justify-content-center overflow-hidden" style={{ backgroundColor: "rgba(0,0,0,0.4)" }}>
              <object data="/Ahnaf.pdf" type="application/pdf" width="100%" height="100%">
                <div className="text-center text-muted w-100 h-100 d-flex flex-column align-items-center justify-content-center p-3">
                  <p className="fs-5 text-white mb-2">Resume Viewer</p>
                  <small className="text-info mb-4">Your browser does not support PDFs. Please download the PDF to view it.</small>
                </div>
              </object>
            </div>

            <div className="mt-4 text-center">
              <Magnetic>
                <a href="/Ahnaf.pdf" download="Ahnaf_Resume.pdf" className="text-decoration-none">
                  <button className="btn btn-info fw-bold py-3 px-5 shadow-lg d-flex align-items-center gap-2 m-auto rounded-pill transition" style={{ fontSize: "1.1rem" }}>
                    <FaDownload /> Download PDF
                  </button>
                </a>
              </Magnetic>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
