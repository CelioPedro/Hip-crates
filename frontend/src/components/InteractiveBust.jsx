import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, Float, Center } from '@react-three/drei';
import * as THREE from 'three';

function BustModel(props) {
  const group = useRef();
  // We use the primitive object to load whatever is in the scene
  const { scene } = useGLTF('/models/hipo.glb');

  useFrame((state) => {
    // Limiting the rotation to make it subtle
    const targetX = (state.pointer.x * Math.PI) / 8;
    const targetY = (state.pointer.y * Math.PI) / 8;

    if (group.current) {
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetX, 0.05);
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -targetY, 0.05);
    }
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <primitive object={scene} />
    </group>
  );
}

export default function InteractiveBust() {
  return (
    <Canvas 
      camera={{ position: [0, 0, 10], fov: 45 }}
      style={{ width: '100%', height: '100%', pointerEvents: 'auto' }} 
    >
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#2cb7b3" />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#1a8aff" />
        <Environment preset="city" />

        <Float
          speed={2} 
          rotationIntensity={0.2} 
          floatIntensity={1} 
        >
          {/* Center automatically centers the model regardless of its pivot point */}
          <Center>
            {/* Locked scale based on your print */}
            <BustModel scale={0.05} />
          </Center>
        </Float>
    </Canvas>
  );
}

useGLTF.preload('/models/hipo.glb');
