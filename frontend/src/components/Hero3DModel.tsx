import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Icosahedron } from '@react-three/drei';

const AnimatedShape = () => {
  const meshRef = useRef<any>(null);
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.2;
      meshRef.current.rotation.y = t * 0.3;
      meshRef.current.position.y = Math.sin(t) * 0.2;
    }
  });

  return (
    <Icosahedron args={[1.5, 0]} ref={meshRef}>
      <meshStandardMaterial color="var(--accent-neon)" wireframe />
    </Icosahedron>
  );
};

const Hero3DModel = () => {
  return (
    <div style={{ width: '100%', height: '350px', pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} style={{ pointerEvents: 'auto' }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <AnimatedShape />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1} />
      </Canvas>
    </div>
  );
};

export default Hero3DModel;
