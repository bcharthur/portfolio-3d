import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { MONITOR, SCREEN_H } from "../constants";

export default function ScreenContent({
  lines,
  phase = 0,
}: {
  lines: { width: number; x: number; color: string }[];
  phase?: number;
}) {
  const linesRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (!linesRef.current) return;

    linesRef.current.position.y = Math.sin(t * 0.65 + phase) * 0.14;
  });

  return (
    <group
      ref={linesRef}
      position={[0, MONITOR.height / 2 + 0.03, MONITOR.depth / 2 + 0.013]}
    >
      {lines.map((line, i) => {
        const baseY = SCREEN_H / 2 - 0.08 - i * 0.095;
        return (
          <mesh key={i} position={[line.x, baseY, 0]}>
            <boxGeometry args={[line.width, 0.02, 0.001]} />
            <meshStandardMaterial
              color={line.color}
              emissive={line.color}
              emissiveIntensity={0.55}
            />
          </mesh>
        );
      })}
    </group>
  );
}
