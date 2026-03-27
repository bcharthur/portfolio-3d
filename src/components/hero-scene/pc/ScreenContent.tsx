import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import { MONITOR_DEPTH, SCREEN_H, SCREEN_W } from './MonitorShell';
import { MAIN_CODE_LINES } from './CodeScreenLines';

type ScreenContentProps = {
  emissive?: string;
  emissiveIntensity?: number;
};

export default function ScreenContent({
  emissive = '#202636',
  emissiveIntensity = 0.13,
}: ScreenContentProps) {
  const screenRef = useRef<THREE.Mesh>(null);
  const lines = useMemo(() => MAIN_CODE_LINES, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (!screenRef.current) return;

    const mat = screenRef.current.material as THREE.MeshStandardMaterial;
    mat.emissiveIntensity = emissiveIntensity + Math.sin(t * 1.4) * 0.01;
  });

  const screenY = MONITOR_DEPTH / 2 + SCREEN_H / 2 + 0.08;
  const screenZ = MONITOR_DEPTH / 2 - 0.003;

  return (
    <group position={[0, screenY, screenZ]}>
      {/* Fond principal de l'écran, légèrement rentré pour éviter le scintillement */}
      <RoundedBox args={[SCREEN_W, SCREEN_H, 0.008]} radius={0.04} smoothness={4} ref={screenRef}>
        <meshStandardMaterial
          color="#343a44"
          emissive={emissive}
          emissiveIntensity={emissiveIntensity}
          roughness={0.92}
          metalness={0.04}
          polygonOffset
          polygonOffsetFactor={1}
          polygonOffsetUnits={1}
        />
      </RoundedBox>

      {/* Reflet doux */}
      <mesh position={[-SCREEN_W * 0.24, SCREEN_H * 0.06, 0.005]} renderOrder={1}>
        <planeGeometry args={[SCREEN_W * 0.16, SCREEN_H * 0.78]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.045} depthWrite={false} />
      </mesh>

      {/* Lignes de code */}
      <group position={[0, 0, 0.006]} renderOrder={2}>
        {lines.map((line, i) => (
          <mesh key={i} position={[line.x, line.y, 0]} renderOrder={2}>
            <planeGeometry args={[line.width, line.height ?? 0.017]} />
            <meshBasicMaterial color={line.color} toneMapped={false} depthWrite={false} />
          </mesh>
        ))}
      </group>
    </group>
  );
}
