import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Vec3 } from "../types";
import MonitorShell from "./MonitorShell";
import ScreenContent from "./ScreenContent";

export default function EcranSecondaire({
  position,
  rotation = [0, 0, 0],
}: {
  position: Vec3;
  rotation?: Vec3;
}) {
  const screenRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (!screenRef.current) return;

    const mat = screenRef.current.material as THREE.MeshStandardMaterial;
    mat.emissiveIntensity = 0.26 + Math.sin(t * 1.8 + 0.7) * 0.04;
  });

  return (
    <MonitorShell
      position={position}
      rotation={rotation}
      bezelColor="#312b46"
      standColor="#4f4868"
      screenRef={screenRef}
      emissiveColor="#27398d"
      emissiveIntensity={0.26}
    >
      <ScreenContent
        phase={Math.PI / 2}
        lines={[
          { width: 0.26, x: -0.06, color: "#cbd5e1" },
          { width: 0.18, x: 0.08, color: "#94a3b8" },
          { width: 0.32, x: -0.02, color: "#a5b4fc" },
          { width: 0.24, x: -0.1, color: "#e2e8f0" },
          { width: 0.2, x: 0.1, color: "#f9a8d4" },
          { width: 0.28, x: -0.04, color: "#67e8f9" },
          { width: 0.22, x: -0.08, color: "#9ca3af" },
          { width: 0.18, x: 0.04, color: "#cbd5e1" },
        ]}
      />
    </MonitorShell>
  );
}
