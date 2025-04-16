import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, useGLTF } from '@react-three/drei';
import { Mesh } from 'three';

function GamingSetup() {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <boxGeometry args={[2, 1, 1]} />
      <meshStandardMaterial
        color="#6C5DD3"
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  );
}

export default function StationPreview3D() {
  return (
    <div className="w-full h-[400px] rounded-2xl overflow-hidden">
      <Canvas
        camera={{ position: [0, 2, 5], fov: 45 }}
        className="bg-[#0a0118]"
      >
        <ambientLight intensity={0.5} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          intensity={1}
        />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        <GamingSetup />
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 2}
        />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
} 