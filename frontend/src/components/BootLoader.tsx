import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*";

const ScrambleText = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState("");
  
  useEffect(() => {
    let iteration = 0;
    let interval: ReturnType<typeof setInterval>;
    
    interval = setInterval(() => {
      setDisplayText(text.split("").map((letter, index) => {
        if(index < iteration) {
          return text[index];
        }
        if(text[index] === " ") {
          return " ";
        }
        return LETTERS[Math.floor(Math.random() * LETTERS.length)];
      }).join(""));
      
      if(iteration >= text.length){
        clearInterval(interval);
      }
      
      iteration += 1 / 2; // Decoding speed
    }, 30);

    return () => clearInterval(interval);
  }, [text]);

  return <span>{displayText}</span>;
}

const bootLogs = [
  "BIOS Date 04/15/26 19:30:52 Ver 08.00.15",
  "CPU: Intel(R) Core(TM) Quantum Architecture @ 4.5GHz",
  "Memory Test: 64000K OK",
  "Mounting local secure file systems... DECRYPTED.",
  "Starting network interface... ROUTING.",
  "Bypassing mainframe security protocols...",
  "Loading ML Models [Pandas, Scikit-learn, TensorFlow]...",
  "Bootstrapping UI/UX visual matrix...",
  "Running deep system diagnostics...",
  "[OK] Node architecture optimal.",
  "Access Granted. Initializing workspace."
];

interface BootLoaderProps {
  onComplete: () => void;
}

export default function BootLoader({ onComplete }: BootLoaderProps) {
  const [logs, setLogs] = useState<string[]>([]);
  
  useEffect(() => {
    let timeout: number;
    let isActive = true;

    const typeLogs = async () => {
      for (let i = 0; i < bootLogs.length; i++) {
        if (!isActive) break;
        setLogs(prev => [...prev, bootLogs[i]]);
        // Give enough time for scramble to finish before next log
        await new Promise(r => setTimeout(r, Math.random() * 200 + 400));
      }
      if (isActive) {
        setTimeout(onComplete, 800);
      }
    };
    
    typeLogs();
    
    return () => {
      isActive = false;
      clearTimeout(timeout);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ y: "-100%", opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
      style={{
        position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: "#050505", color: "#0f0", zIndex: 10000,
        fontFamily: "'Courier New', Courier, monospace", padding: "2rem", overflow: "hidden", pointerEvents: "none"
      }}
    >
      <h2 className="mb-4 fw-bold" style={{ color: "#0f0", textShadow: "0 0 5px #0f0" }}>
        <ScrambleText text="WELCOME TO AHNAF PORTFOLIO" /> 
        <span className="opacity-50 fs-6 ms-3">_INITIALIZING_</span>
      </h2>
      {logs.map((log, i) => (
        <div key={i} className="mb-2 fs-5" style={{ textShadow: "0 0 2px #0f0" }}>
          <span className="opacity-50 me-3">[{new Date().toISOString().split("T")[1].slice(0, -1)}]</span> 
          <ScrambleText text={log} />
        </div>
      ))}
      {logs.length < bootLogs.length && (
        <motion.div 
          animate={{ opacity: [0, 1] }} 
          transition={{ repeat: Infinity, duration: 0.4 }} 
          className="d-inline-block mt-2" 
          style={{ width: "12px", height: "24px", backgroundColor: "#0f0", verticalAlign: "middle" }} 
        />
      )}
    </motion.div>
  );
}
