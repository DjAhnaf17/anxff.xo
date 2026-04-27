import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPaperPlane, FaEnvelope, FaMapMarkerAlt, FaCheckCircle, FaPhone } from "react-icons/fa";
import Magnetic from "./Magnetic";

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    
    try {
      // Validate form data
      if (!formData.name || !formData.email || !formData.message) {
        setStatus("error");
        return;
      }
      
      // Send email directly
      const mailtoLink = `mailto:jawwadahnaf04@gmail.com?subject=New Contact from ${formData.name}&body=Name: ${formData.name}%0AEmail: ${formData.email}%0AMessage: ${formData.message}`;
      window.location.href = mailtoLink;
      
      // Show success message
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      
      // Reset after 5 seconds
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: "spring" as const, stiffness: 100 } }
  };

  return (
    <section id="contact" className="py-5 position-relative overflow-hidden">
      {/* Background Decorative Element */}
      <div 
        className="position-absolute" 
        style={{ 
          top: "20%", right: "-10%", width: "500px", height: "500px", 
          background: "radial-gradient(circle, rgba(255,127,80,0.15) 0%, rgba(0,0,0,0) 70%)", 
          filter: "blur(80px)", zIndex: 0 
        }} 
      />

      <div className="container py-5 position-relative" style={{ zIndex: 1 }}>
        <div className="row align-items-center g-5">
          {/* Left Side Typography & Info */}
          <motion.div 
            className="col-lg-5"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.h2 variants={itemVariants} className="display-4 fw-bold mb-4">
              Let's build something <br/> 
              <span className="text-neon" style={{ textShadow: "0 0 15px rgba(255,127,80,0.4)" }}>extraordinary</span> together.
            </motion.h2>
            <motion.p variants={itemVariants} className="text-muted fs-5 mb-5">
              Whether you have a dataset waiting to be unlocked, a production machine learning pipeline to architect, or just want to say hi—I'm all ears.
            </motion.p>
            
            <motion.div variants={itemVariants} className="d-flex align-items-center gap-3 mb-4">
              <div className="rounded-circle bg-adaptive d-flex align-items-center justify-content-center border border-secondary" style={{ width: "50px", height: "50px" }}>
                <FaEnvelope className="text-info fs-4" />
              </div>
              <div>
                <h5 className="mb-0 text-adaptive">Email</h5>
                <a href="mailto:jawwadahnaf04@gmail.com" className="text-muted text-decoration-none">jawwadahnaf04@gmail.com</a>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="d-flex align-items-center gap-3 mb-4">
              <div className="rounded-circle bg-adaptive d-flex align-items-center justify-content-center border border-secondary" style={{ width: "50px", height: "50px" }}>
                <FaPhone className="text-success fs-4" />
              </div>
              <div>
                <h5 className="mb-0 text-adaptive">Phone</h5>
                <a href="tel:+918870073991" className="text-muted text-decoration-none">+91 8870073991</a>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="d-flex align-items-center gap-3">
              <div className="rounded-circle bg-adaptive d-flex align-items-center justify-content-center border border-secondary" style={{ width: "50px", height: "50px" }}>
                <FaMapMarkerAlt className="text-neon fs-4" />
              </div>
              <div>
                <h5 className="mb-0 text-adaptive">Location</h5>
                <span className="text-muted">Global / India</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side Glass Form */}
          <div className="col-lg-7">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, type: "spring" as const, stiffness: 80 }}
              className="glassmorphism p-4 p-md-5 position-relative"
              style={{ borderRadius: "20px", border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}
            >
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="d-flex flex-column align-items-center justify-content-center text-center py-5 h-100"
                    style={{ minHeight: "350px" }}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", damping: 10, mass: 0.75, delay: 0.2 }}
                    >
                      <FaCheckCircle className="text-success mb-4" style={{ fontSize: "5rem", filter: "drop-shadow(0 0 20px rgba(40,167,69,0.5))" }} />
                    </motion.div>
                    <h3 className="fw-bold mb-3">Message Received!</h3>
                    <p className="text-muted">I've got your message and will aim to respond within 24 hours. Thanks for reaching out!</p>
                  </motion.div>
                ) : (
                  <motion.form 
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                  >
                    <h3 className="fw-bold mb-4">Send a Message</h3>
                    
                    {status === "error" && (
                      <div className="alert alert-danger bg-transparent border-danger text-danger mb-4">
                        Server error occurred. Please try again later.
                      </div>
                    )}

                    <div className="row g-4">
                      <div className="col-md-6 custom-input-group mb-0">
                        <input 
                          type="text" 
                          className="custom-input w-100 d-block" 
                          placeholder="Your Name" 
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                        <span className="input-highlight"></span>
                      </div>
                      <div className="col-md-6 custom-input-group mb-0">
                        <input 
                          type="email" 
                          className="custom-input w-100 d-block" 
                          placeholder="Your Email" 
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                        <span className="input-highlight"></span>
                      </div>
                      <div className="col-12 custom-input-group mb-4">
                        <textarea 
                          className="custom-input w-100 d-block" 
                          rows={4} 
                          placeholder="Tell me about your project..." 
                          required
                          style={{ resize: "none" }}
                          value={formData.message}
                          onChange={(e) => setFormData({...formData, message: e.target.value})}
                        ></textarea>
                        <span className="input-highlight"></span>
                      </div>
                    </div>

                    <div className="d-flex justify-content-end">
                      <Magnetic>
                        <button 
                          type="submit" 
                          className="btn text-white fw-bold py-3 px-5 d-flex align-items-center gap-2 border-0 shadow-lg"
                          disabled={status === "loading"}
                          style={{ borderRadius: "50px", backgroundColor: "var(--accent-neon)", transition: "all 0.3s ease" }}
                        >
                          {status === "loading" ? (
                            <><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Sending Orbit...</>
                          ) : (
                            <>Send Message <FaPaperPlane size={15} className="ms-1" /></>
                          )}
                        </button>
                      </Magnetic>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
