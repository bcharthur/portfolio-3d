import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Vec3 } from "../types";
import MonitorShell from "./MonitorShell";
import ScreenContent from "./ScreenContent";

export default function EcranPrincipal({
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
    mat.emissiveIntensity = 0.36 + Math.sin(t * 2.1) * 0.04;
  });

  return (
    <MonitorShell
      position={position}
      rotation={rotation}
      bezelColor="#26203a"
      standColor="#4a4463"
      screenRef={screenRef}
      emissiveColor="#233d97"
      emissiveIntensity={0.36}
    >
      <ScreenContent
        phase={0}
        lines={[
          { width: 0.74, x: 0.02, color: "#fbcfe8" },
          { width: 0.58, x: -0.1, color: "#c4b5fd" },
          { width: 0.7, x: -0.02, color: "#fde047" },
          { width: 0.5, x: -0.14, color: "#a7f3d0" },
          { width: 0.78, x: 0.03, color: "#d8b4fe" },
          { width: 0.62, x: -0.08, color: "#fbbf24" },
          { width: 0.55, x: -0.11, color: "#7dd3fc" },
          { width: 0.44, x: -0.17, color: "#34d399" },
        ]}
      />
    </MonitorShell>
  );
}
