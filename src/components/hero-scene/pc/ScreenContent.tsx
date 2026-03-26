import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useScreenScroll } from '../animations/useScreenScroll';
import { MONITOR_DEPTH, SCREEN_H, SCREEN_W } from './MonitorShell';

export type ScreenLine = {
  y: number;
  width: number;
  x: number;
  color: string;
};

export default function ScreenContent({
  emissive = '#253b8c',
  emissiveIntensity = 0.32,
  lines,
}: {
  emissive?: string;
  emissiveIntensity?: number;
  lines: ScreenLine[];
}) {
  const screenRef = useRef<THREE.Mesh>(null);
  const linesRef = useRef<THREE.Group>(null);

  useScreenScroll(linesRef, 0.7);

  const baseLines = useMemo(() => lines, [lines]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (!screenRef.current) return;

    const mat = screenRef.current.material as THREE.MeshStandardMaterial;
    mat.emissiveIntensity = emissiveIntensity + Math.sin(t * 2.2) * 0.05;
  });

  return (
    <group>
      <mesh ref={screenRef} position={[0, MONITOR_DEPTH / 2 + SCREEN_H / 2 + 0.08, MONITOR_DEPTH / 2 + 0.006]}>
        <boxGeometry args={[SCREEN_W, SCREEN_H, 0.01]} />
        <meshStandardMaterial color="#1b2437" emissive={emissive} emissiveIntensity={emissiveIntensity} />
      </mesh>

      <group ref={linesRef} position={[0, SCREEN_H / 2 + 0.08, MONITOR_DEPTH / 2 + 0.013]}>
        {baseLines.concat(baseLines.map((line) => ({ ...line, y: line.y - 0.74 }))).map((line, i) => (
          <mesh key={i} position={[line.x, line.y, 0]}>
            <boxGeometry args={[line.width, 0.02, 0.001]} />
            <meshStandardMaterial color={line.color} emissive={line.color} emissiveIntensity={0.52} />
          </mesh>
        ))}
      </group>
    </group>
  );
}
