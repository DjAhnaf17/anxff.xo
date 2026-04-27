import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface HistoryItem {
  prompt: string;
  output: React.ReactNode;
}

const Terminal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([
    { prompt: "", output: "Welcome to anxff_OS v2.0. Type 'help' to see available commands." }
  ]);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    if (endRef.current) endRef.current.scrollIntoView({ behavior: "smooth" });
  }, [history, isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) inputRef.current.focus();
  }, [isOpen]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    
    let output: React.ReactNode = "";

    switch (cmd) {
      case "help":
        output = "Available commands: whoami, skills, clear, sudo rm -rf /";
        break;
      case "whoami":
        output = "anxff.xo - Full-Stack Data Analyst & ML Developer blending logic and aesthetics.";
        break;
      case "skills":
        output = "Python, SQL, C++, React, Flask, Framer Motion, Machine Learning pipelines, Power BI.";
        break;
      case "sudo rm -rf /":
        output = <span className="text-danger">Permission denied: Nice try, hacker! :P</span>;
        break;
      case "clear":
        setHistory([]);
        setInput("");
        return;
      case "":
        output = "";
        break;
      default:
        output = `Command not found: ${cmd}`;
    }

    setHistory((prev) => [...prev, { prompt: `jawwad@portfolio:~$ ${cmd}`, output }]);
    setInput("");
  };

  return (
    <>
      <motion.button
        className="btn btn-outline-success rounded-circle shadow-lg"
        style={{
          position: "fixed",
          bottom: "30px",
          right: "30px",
          width: "60px",
          height: "60px",
          zIndex: 9999,
          backgroundColor: "#000",
          fontFamily: "monospace",
          fontSize: "24px"
        }}
        whileHover={{ scale: 1.1, boxShadow: "0px 0px 15px #198754" }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        title="Open Hacker Terminal"
      >
        &gt;_
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ type: "spring" as const, stiffness: 200, damping: 20 }}
            style={{
              position: "fixed",
              bottom: "100px",
              right: "30px",
              width: "min(400px, 90vw)",
              height: "300px",
              backgroundColor: "rgba(0, 0, 0, 0.9)",
              border: "1px solid #198754",
              borderRadius: "10px",
              zIndex: 9998,
              boxShadow: "0 10px 30px rgba(25, 135, 84, 0.3)",
              display: "flex",
              flexDirection: "column",
              fontFamily: "monospace",
              color: "#198754",
              backdropFilter: "blur(5px)"
            }}
          >
            {/* Header */}
            <div className="d-flex justify-content-between p-2 border-bottom border-success" style={{ backgroundColor: "rgba(25, 135, 84, 0.1)" }}>
              <span>bash - jawwad@portfolio</span>
              <button 
                className="btn btn-sm btn-link text-success p-0" 
                onClick={() => setIsOpen(false)}
              >
                ✖
              </button>
            </div>

            {/* Body */}
            <div className="flex-grow-1 p-3 overflow-auto" style={{ fontSize: "14px", msOverflowStyle: "none", scrollbarWidth: "none" }}>
              {history.map((h, i) => (
                <div key={i} className="mb-2">
                  {h.prompt && <div>{h.prompt}</div>}
                  <div style={{ color: "#a8ccae" }}>{h.output}</div>
                </div>
              ))}
              <form onSubmit={handleCommand} className="d-flex mt-2">
                <span className="me-2">jawwad@portfolio:~$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-grow-1 bg-transparent border-0 text-success p-0"
                  style={{ outline: "none", boxShadow: "none" }}
                  autoComplete="off"
                  spellCheck="false"
                />
              </form>
              <div ref={endRef} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Terminal;
