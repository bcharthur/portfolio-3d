import { forwardRef } from 'react';
import * as THREE from 'three';
import { Common3DProps } from '../types';

const Mouse = forwardRef<THREE.Group, Common3DProps>(function Mouse({ position = [0, 0, 0] }, ref) {
  return (
    <group ref={ref} position={position}>
      <mesh rotation={[0.25, 0, 0]} castShadow>
        <boxGeometry args={[0.09, 0.048, 0.135]} />
        <meshStandardMaterial color="#d8dbe2" roughness={0.42} metalness={0.08} />
      </mesh>
      <mesh position={[0, 0.028, -0.01]} rotation={[0.25, 0, 0]} castShadow>
        <boxGeometry args={[0.085, 0.018, 0.1]} />
        <meshStandardMaterial color="#e8ebf0" roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.034, 0.01]} rotation={[0.25, 0, 0]} castShadow>
        <cylinderGeometry args={[0.01, 0.01, 0.032, 8]} />
        <meshStandardMaterial color="#888" roughness={0.6} />
      </mesh>
      <mesh position={[-0.022, 0.032, 0.022]} rotation={[0.25, 0, 0]}>
        <boxGeometry args={[0.036, 0.008, 0.07]} />
        <meshStandardMaterial color="#cacdd4" />
      </mesh>
      <mesh position={[0.022, 0.032, 0.022]} rotation={[0.25, 0, 0]}>
        <boxGeometry args={[0.036, 0.008, 0.07]} />
        <meshStandardMaterial color="#cacdd4" />
      </mesh>
    </group>
  );
});

export default Mouse;
