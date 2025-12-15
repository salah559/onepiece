import { Canvas, useThree } from '@react-three/fiber';
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

  const posX = mousePos.x * (viewport.width / 2);
  const posY = mousePos.y * (viewport.height / 2);

  return (
    <primitive 
      ref={meshRef} 
      object={scene.clone()} 
      scale={0.15}
      position={[posX, posY, 0]}
    />
  );
}

export default function MouseFollower3D() {
  return (
    <div className="fixed inset-0 z-[55] pointer-events-none" style={{ pointerEvents: 'none' }}>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        style={{ background: 'transparent', pointerEvents: 'none' }}
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
