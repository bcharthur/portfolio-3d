import { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Common3DProps } from '../types';

export default function WallClock({ position = [0, 0, 0] }: Common3DProps) {
  const hourRef = useRef<THREE.Group>(null);
  const minuteRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (hourRef.current) hourRef.current.rotation.z = -(t * 0.05);
    if (minuteRef.current) minuteRef.current.rotation.z = -(t * 0.6);
  });

  return (
    <group position={position} rotation={[Math.PI / 2, 0, 0]}>
      <mesh castShadow>
        <cylinderGeometry args={[0.22, 0.22, 0.05, 32]} />
        <meshStandardMaterial color="#f2e6d7" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.03, 0]}>
        <cylinderGeometry args={[0.18, 0.18, 0.01, 32]} />
        <meshStandardMaterial color="#fffaf4" roughness={0.96} />
      </mesh>
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const r = 0.14;
        return (
          <mesh key={i} position={[Math.sin(angle) * r, 0.038, Math.cos(angle) * r]}>
            <boxGeometry args={[0.012, 0.006, 0.02]} />
            <meshStandardMaterial color="#555" />
          </mesh>
        );
      })}
      <group ref={hourRef} position={[0, 0.042, 0]}>
        <mesh position={[0, 0, -0.045]}>
          <boxGeometry args={[0.012, 0.007, 0.09]} />
          <meshStandardMaterial color="#1f1f1f" />
        </mesh>
      </group>
      <group ref={minuteRef} position={[0, 0.046, 0]}>
        <mesh position={[0, 0, -0.065]}>
          <boxGeometry args={[0.008, 0.007, 0.13]} />
          <meshStandardMaterial color="#333" />
        </mesh>
      </group>
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[0.014, 0.014, 0.015, 12]} />
        <meshStandardMaterial color="#c0392b" />
      </mesh>
    </group>
  );
}
