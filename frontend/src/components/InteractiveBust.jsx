import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, Float, Center } from '@react-three/drei';
import * as THREE from 'three';

function BustModel({ bustState, ...props }) {
  const group = useRef();
  // We use the primitive object to load whatever is in the scene
  const { scene } = useGLTF('/models/hipo.glb');

  const mouse = useRef({ x: 0, y: 0 });

  React.useEffect(() => {
    const handleMouseMove = (e) => {
      // Normalize mouse to -1 to +1
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    
    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        mouse.current.x = (e.touches[0].clientX / window.innerWidth) * 2 - 1;
        mouse.current.y = -(e.touches[0].clientY / window.innerHeight) * 2 + 1;
      }
    };

    const handleDeviceOrientation = (e) => {
      if (e.gamma !== null && e.beta !== null) {
        // gamma: left-to-right tilt in degrees, where right is positive
        const gamma = Math.max(-45, Math.min(45, e.gamma)); 
        // beta: front-to-back tilt in degrees, where front is positive
        const beta = Math.max(-45, Math.min(45, e.beta - 45)); 
        
        // Add smooth device orientation mapping
        mouse.current.x = gamma / 45; 
        mouse.current.y = -(beta / 45);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('deviceorientation', handleDeviceOrientation, { passive: true });
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('deviceorientation', handleDeviceOrientation);
    };
  }, []);

  useFrame((state) => {
    let targetX, targetY;

    if (bustState && bustState.current) {
      if (bustState.current.phase === "START") {
        // Look further up and slightly more left towards the logo
        targetX = -Math.PI / 5.5; 
        targetY = Math.PI / 6; // Increased from PI/12 to PI/6 for a more pronounced upward gaze
      } else if (bustState.current.phase === "READING") {
        // Base gaze aimed at the text block on the left side of the screen
        const baseLookX = -Math.PI / 7;
        const baseLookY = -Math.PI / 24; // Looking slightly down
        
        // Micro-tracking of the text fading in
        targetX = baseLookX + (bustState.current.simulatedX * Math.PI) / 20;
        targetY = baseLookY + (bustState.current.simulatedY * Math.PI) / 20;
      } else {
        // "DONE" -> Hand control back to user mouse globally
        targetX = (mouse.current.x * Math.PI) / 8;
        targetY = (mouse.current.y * Math.PI) / 8;
      }
    } else {
      // Fallback standard mouse tracking
      targetX = (mouse.current.x * Math.PI) / 8;
      targetY = (mouse.current.y * Math.PI) / 8;
    }

    if (group.current) {
      // Reduced lerp speed to 0.011 for extremely smooth and natural head turns
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetX, 0.011);
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -targetY, 0.011);
    }
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <primitive object={scene} />
    </group>
  );
}

export default function InteractiveBust({ bustState }) {
  return (
    <Canvas 
      camera={{ position: [0, 0, 10], fov: 45 }}
      style={{ width: '100%', height: '100%', pointerEvents: 'auto' }} 
    >
        <ambientLight intensity={0.5} />
        <Environment preset="city" />
        
        {/* Reduced Float intensities for a less exaggerated 'breathing' vivacity */}
        <Float
          speed={2} 
          rotationIntensity={0.2} 
          floatIntensity={0.8} 
        >
          {/* Re-centered with a slight downward bias and slightly reduced scale to ensure no clipping on top or bottom! */}
          <Center position={[0, -0.4, 0]}>
            <BustModel scale={0.042} bustState={bustState} />
          </Center>
        </Float>
    </Canvas>
  );
}

useGLTF.preload('/models/hipo.glb');
