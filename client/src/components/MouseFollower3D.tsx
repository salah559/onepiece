import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';

function Model() {
  const { scene } = useGLTF('/models/mouse_model.glb');
  const meshRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame(() => {
    if (meshRef.current) {
      const targetX = mousePos.x * (viewport.width / 2);
      const targetY = mousePos.y * (viewport.height / 2);
      
      meshRef.current.position.x += (targetX - meshRef.current.position.x) * 0.1;
      meshRef.current.position.y += (targetY - meshRef.current.position.y) * 0.1;
      
      meshRef.current.rotation.y += 0.02;
      meshRef.current.rotation.x = Math.sin(Date.now() * 0.001) * 0.1;
    }
  });

  return (
    <primitive 
      ref={meshRef} 
      object={scene.clone()} 
      scale={1.5}
      position={[0, 0, 0]}
    />
  );
}

export default function MouseFollower3D() {
  return (
    <div className="fixed inset-0 z-[55] pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[-5, -5, 5]} intensity={0.5} color="#ffd700" />
        <Model />
      </Canvas>
    </div>
  );
}
