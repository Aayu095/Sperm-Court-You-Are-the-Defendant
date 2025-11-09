"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

// Single swimming sperm particle
function SwimmingSperm({ position, speed, amplitude }: { 
  position: [number, number, number];
  speed: number;
  amplitude: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const tailRef = useRef<THREE.Mesh>(null);
  const offset = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame((state) => {
    if (!groupRef.current || !tailRef.current) return;

    const time = state.clock.elapsedTime * speed + offset;

    // Swimming motion - figure-8 pattern
    groupRef.current.position.x = position[0] + Math.sin(time * 0.3) * amplitude;
    groupRef.current.position.y = position[1] + Math.sin(time * 0.5) * amplitude * 0.5;
    groupRef.current.position.z = position[2] + Math.cos(time * 0.3) * amplitude;

    // Rotation to follow movement direction
    groupRef.current.rotation.y = Math.sin(time * 0.3) * 0.5;
    groupRef.current.rotation.z = Math.cos(time * 0.5) * 0.3;

    // Tail wiggle animation
    tailRef.current.rotation.x = Math.sin(time * 3) * 0.4;
    tailRef.current.rotation.z = Math.cos(time * 3) * 0.3;
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Head */}
      <mesh>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial 
          color="#e0e0e0" 
          transparent 
          opacity={0.3}
          emissive="#ffffff"
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* Tail segments for realistic wiggle */}
      <group ref={tailRef} position={[0, -0.1, 0]}>
        <mesh position={[0, -0.2, 0]}>
          <cylinderGeometry args={[0.03, 0.025, 0.4, 8]} />
          <meshStandardMaterial 
            color="#d0d0d0" 
            transparent 
            opacity={0.25}
            emissive="#ffffff"
            emissiveIntensity={0.05}
          />
        </mesh>
        <mesh position={[0, -0.5, 0]} rotation={[0, 0, Math.sin(offset) * 0.2]}>
          <cylinderGeometry args={[0.025, 0.015, 0.4, 8]} />
          <meshStandardMaterial 
            color="#c0c0c0" 
            transparent 
            opacity={0.2}
            emissive="#ffffff"
            emissiveIntensity={0.05}
          />
        </mesh>
      </group>
    </group>
  );
}

// Background scene with multiple swimming sperms
function SpermScene() {
  // Generate random positions for sperms
  const sperms = useMemo(() => {
    const count = 25; // Number of sperms
    const particles = [];
    
    for (let i = 0; i < count; i++) {
      particles.push({
        position: [
          (Math.random() - 0.5) * 20, // X
          (Math.random() - 0.5) * 15, // Y
          (Math.random() - 0.5) * 10 - 5, // Z (behind)
        ] as [number, number, number],
        speed: 0.5 + Math.random() * 1,
        amplitude: 2 + Math.random() * 3,
      });
    }
    
    return particles;
  }, []);

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.3} color="#8b6f47" />
      <pointLight position={[-10, -10, -5]} intensity={0.2} color="#d4b896" />
      
      {/* Render all swimming sperms */}
      {sperms.map((sperm, index) => (
        <SwimmingSperm
          key={index}
          position={sperm.position}
          speed={sperm.speed}
          amplitude={sperm.amplitude}
        />
      ))}
    </>
  );
}

// Main background component
export default function SpermBackground() {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        style={{ background: 'transparent' }}
      >
        <SpermScene />
      </Canvas>
    </div>
  );
}
