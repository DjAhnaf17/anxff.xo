import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const bootLogs = [
  "BIOS Date 04/15/26 19:30:52 Ver 08.00.15",
  "CPU : Intel(R) Core(TM) Quantum Processor @ 4.5GHz",
  "Memory Test : 64000K OK",
  "Mounting local file systems... done.",
  "Starting network interface... done.",
  "Initializing Jawwad_OS v2.0...",
  "Loading ML Models [Pandas, Scikit-learn, TensorFlow]...",
  "Bootstrapping UI/UX matrix...",
  "Running diagnostics...",
  "[OK] All systems optimal.",
  "Access Granted."
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
        await new Promise(r => setTimeout(r, Math.random() * 150 + 50));
      }
      if (isActive) {
        setTimeout(onComplete, 600);
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
        backgroundColor: "#000", color: "#198754", zIndex: 10000,
        fontFamily: "monospace", padding: "2rem", overflow: "hidden", pointerEvents: "none"
      }}
    >
      <h2 className="text-white mb-4 fw-bold">Jawwad_OS <span className="text-secondary fs-6 ms-2">Boot Sequence Initiated</span></h2>
      {logs.map((log, i) => (
        <div key={i} className="mb-2 fs-5">
          <span className="text-secondary opacity-75 ms-2 me-3">[{new Date().toISOString().split("T")[1].slice(0, -1)}]</span> 
          {log}
        </div>
      ))}
      {logs.length < bootLogs.length && (
        <motion.div 
          animate={{ opacity: [0, 1] }} 
          transition={{ repeat: Infinity, duration: 0.4 }} 
          className="d-inline-block bg-success" 
          style={{ width: "12px", height: "24px", verticalAlign: "middle" }} 
        />
      )}
    </motion.div>
  );
}
