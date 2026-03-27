import { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { MONITOR_DEPTH, SCREEN_H, SCREEN_W } from './MonitorShell';

export default function ScreenContent({
                                        emissive = '#253b8c',
                                        emissiveIntensity = 0.32,
                                      }: {
  emissive?: string;
  emissiveIntensity?: number;
}) {
  const screenRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (!screenRef.current) return;

    const mat = screenRef.current.material as THREE.MeshStandardMaterial;
    mat.emissiveIntensity = emissiveIntensity + Math.sin(t * 2.2) * 0.05;
  });

  return (
      <group>
        <mesh
            ref={screenRef}
            position={[0, MONITOR_DEPTH / 2 + SCREEN_H / 2 + 0.08, MONITOR_DEPTH / 2 + 0.006]}
        >
          <boxGeometry args={[SCREEN_W, SCREEN_H, 0.01]} />
          <meshStandardMaterial
              color="#1b2437"
              emissive={emissive}
              emissiveIntensity={emissiveIntensity}
          />
        </mesh>
      </group>
  );
}