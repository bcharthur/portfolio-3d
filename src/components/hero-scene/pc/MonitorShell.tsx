import type { ReactNode, RefObject } from "react";
import * as THREE from "three";
import { MONITOR, SCREEN_H, SCREEN_W } from "../constants";
import { Vec3 } from "../types";

export default function MonitorShell({
  position,
  rotation = [0, 0, 0],
  bezelColor,
  standColor,
  screenRef,
  children,
  emissiveColor,
  emissiveIntensity,
}: {
  position: Vec3;
  rotation?: Vec3;
  bezelColor: string;
  standColor: string;
  screenRef?: RefObject<THREE.Mesh | null>;
  emissiveColor: string;
  emissiveIntensity: number;
  children?: ReactNode;
}) {
  const halfH = MONITOR.height / 2;

  return (
    <group position={position} rotation={rotation}>
      <mesh position={[0, halfH, 0]} castShadow>
        <boxGeometry args={[MONITOR.width, MONITOR.height, MONITOR.depth]} />
        <meshStandardMaterial color={bezelColor} metalness={0.45} roughness={0.35} />
      </mesh>

      <mesh ref={screenRef} position={[0, halfH, MONITOR.depth / 2 + 0.006]}>
        <boxGeometry args={[SCREEN_W, SCREEN_H, 0.01]} />
        <meshStandardMaterial color="#1b2437" emissive={emissiveColor} emissiveIntensity={emissiveIntensity} />
      </mesh>

      {children}

      <mesh position={[0, 0.18, -0.01]} castShadow>
        <boxGeometry args={[0.12, 0.3, 0.08]} />
        <meshStandardMaterial color={standColor} />
      </mesh>
      <mesh position={[0, 0.04, 0]} castShadow>
        <boxGeometry args={[0.4, 0.04, 0.2]} />
        <meshStandardMaterial color={standColor} />
      </mesh>
    </group>
  );
}
