import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Box } from '@react-three/drei';

const Cityscape = () => {
  // Generate mock GitHub contribution data (52 weeks x 7 days)
  const grid = useMemo(() => {
    const data = [];
    for (let w = 0; w < 52; w++) {
      for (let d = 0; d < 7; d++) {
        // Randomize to look somewhat realistic (lots of 0s, some 1s-4s)
        let level = 0;
        const rand = Math.random();
        if (rand > 0.6) level = 1;
        if (rand > 0.8) level = 2;
        if (rand > 0.9) level = 3;
        if (rand > 0.95) level = 4;
        
        data.push({ w, d, level });
      }
    }
    return data;
  }, []);

  const groupRef = useRef<any>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle floating/breathing rotation
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  const getColor = (level: number) => {
    switch (level) {
      case 1: return '#114a0a';
      case 2: return '#1c7a10';
      case 3: return '#29b817';
      case 4: return '#39FF14'; // Neon Green
      default: return '#0a0a0a'; // Empty
    }
  };

  return (
    <group ref={groupRef} position={[-13, 0, -1.5]}>
      {grid.map((cell, i) => {
        const height = cell.level === 0 ? 0.1 : cell.level * 0.4;
        return (
          <Box
            key={i}
            position={[cell.w * 0.5, height / 2, cell.d * 0.5]}
            args={[0.4, height, 0.4]}
          >
            <meshStandardMaterial 
              color={getColor(cell.level)} 
              emissive={getColor(cell.level)}
              emissiveIntensity={cell.level === 4 ? 0.8 : 0.2}
              roughness={0.2}
              metalness={0.8}
            />
          </Box>
        );
      })}
    </group>
  );
};

const GitHubCityscape = () => {
  return (
    <div className="w-100 position-relative" style={{ height: "400px", borderRadius: "20px", overflow: "hidden", background: "var(--glass-bg)", border: "1px solid var(--border-color)" }}>
      {/* Overlay Title */}
      <div className="position-absolute top-0 start-0 p-3 z-1 w-100 d-flex justify-content-between align-items-center" style={{ background: "linear-gradient(to bottom, rgba(5,5,5,0.8), transparent)" }}>
        <span className="fw-bold text-white fs-5" style={{ fontFamily: "Outfit" }}>GitHub Contributions Cityscape</span>
        <span className="badge border border-neon text-neon bg-dark bg-opacity-50">Interactive 3D</span>
      </div>
      
      <Canvas camera={{ position: [0, 8, 15], fov: 45 }}>
        <ambientLight intensity={0.2} />
        <directionalLight position={[10, 20, 10]} intensity={1.5} color="#00f3ff" />
        <pointLight position={[-10, 5, -10]} intensity={1} color="#39FF14" />
        <Cityscape />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          autoRotate 
          autoRotateSpeed={0.5} 
          maxPolarAngle={Math.PI / 2.5}
          minPolarAngle={Math.PI / 4}
        />
      </Canvas>
    </div>
  );
};

export default GitHubCityscape;
