import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Vec3 } from "../types";
import Corps from "./Corps";
import Tete from "./Tete";
import BrasGauche from "./BrasGauche";
import BrasDroit from "./BrasDroit";

export default function Person({
  position,
  rotation = [0, 0, 0],
}: {
  position: Vec3;
  rotation?: Vec3;
}) {
  const bodyRef = useRef<THREE.Group>(null);
  const headGroupRef = useRef<THREE.Group>(null);
  const leftUpperArmRef = useRef<THREE.Group>(null);
  const rightUpperArmRef = useRef<THREE.Group>(null);
  const leftForearmRef = useRef<THREE.Group>(null);
  const rightForearmRef = useRef<THREE.Group>(null);
  const leftHandRef = useRef<THREE.Group>(null);
  const rightHandRef = useRef<THREE.Group>(null);
  const mouseGroupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const breathe = Math.sin(t * 1.35);
    const typeA = Math.sin(t * 6.8);
    const typeB = Math.sin(t * 7.9 + 0.6);
    const mouseSweep = Math.sin(t * 1.25) * 0.06;
    const mouseDepth = Math.cos(t * 1.1) * 0.04;
    const clickPulse = Math.max(0, Math.sin(t * 4.8 + 0.9));

    if (bodyRef.current) {
      bodyRef.current.position.y = position[1] + breathe * 0.012;
      bodyRef.current.position.z = position[2] - 0.02 + Math.cos(t * 1.2) * 0.01;
      bodyRef.current.rotation.x = -0.16 + Math.sin(t * 1.1) * 0.012;
      bodyRef.current.rotation.y = rotation[1] + 0.03 + Math.sin(t * 0.55) * 0.012;
      bodyRef.current.rotation.z = -0.015 + Math.sin(t * 0.9) * 0.006;
    }

    if (headGroupRef.current) {
      headGroupRef.current.position.y = 1.86 + Math.sin(t * 1.1) * 0.008;
      headGroupRef.current.rotation.x = 0.05 + Math.sin(t * 1.25) * 0.01;
      headGroupRef.current.rotation.y = -0.26 + Math.sin(t * 0.62) * 0.08;
      headGroupRef.current.rotation.z = Math.sin(t * 0.8) * 0.008;
    }

    if (leftUpperArmRef.current) {
      leftUpperArmRef.current.rotation.x = -1.22 + typeA * 0.04;
      leftUpperArmRef.current.rotation.y = -0.16 + typeB * 0.025;
      leftUpperArmRef.current.rotation.z = 0.92 + typeB * 0.03;
    }

    if (leftForearmRef.current) {
      leftForearmRef.current.rotation.x = -0.94 + typeB * 0.06;
      leftForearmRef.current.rotation.y = -0.02 + typeA * 0.03;
      leftForearmRef.current.rotation.z = 0.18 + typeA * 0.025;
    }

    if (leftHandRef.current) {
      leftHandRef.current.position.x = 0.02 + typeA * 0.01;
      leftHandRef.current.position.y = -0.26 + Math.abs(typeA) * 0.008;
      leftHandRef.current.position.z = 0.12 + typeB * 0.01;
      leftHandRef.current.rotation.x = -0.18 + typeA * 0.05;
      leftHandRef.current.rotation.y = -0.1 + typeB * 0.03;
      leftHandRef.current.rotation.z = -0.04 + typeB * 0.02;
    }

    if (rightUpperArmRef.current) {
      rightUpperArmRef.current.rotation.x = -1.04 + mouseDepth * 0.18;
      rightUpperArmRef.current.rotation.y = -0.54 + mouseSweep * 0.3;
      rightUpperArmRef.current.rotation.z = -0.34 + mouseSweep * 0.15;
    }

    if (rightForearmRef.current) {
      rightForearmRef.current.rotation.x = -0.74 + mouseDepth * 0.15;
      rightForearmRef.current.rotation.y = 0.02 + mouseSweep * 0.12;
      rightForearmRef.current.rotation.z = -0.06 + mouseSweep * 0.15;
    }

    if (rightHandRef.current) {
      rightHandRef.current.position.x = 0.02 + mouseSweep;
      rightHandRef.current.position.y = -0.25 - clickPulse * 0.008;
      rightHandRef.current.position.z = 0.13 + mouseDepth;
      rightHandRef.current.rotation.x = 0.08 + clickPulse * 0.08;
      rightHandRef.current.rotation.y = 0.1 + mouseSweep * 0.2;
      rightHandRef.current.rotation.z = 0.02 + mouseDepth * 0.08;
    }

    if (mouseGroupRef.current) {
      mouseGroupRef.current.position.x = 0.015 + mouseSweep;
      mouseGroupRef.current.position.y = -0.1 - clickPulse * 0.008;
      mouseGroupRef.current.position.z = 0.02 + mouseDepth;
      mouseGroupRef.current.rotation.x = 0.08 - clickPulse * 0.05;
      mouseGroupRef.current.rotation.y = mouseSweep * 0.6;
      mouseGroupRef.current.rotation.z = mouseDepth * 0.45;
    }
  });

  return (
    <group ref={bodyRef} position={position} rotation={rotation}>
      <Corps />
      <Tete headGroupRef={headGroupRef} />
      <BrasGauche upperArmRef={leftUpperArmRef} forearmRef={leftForearmRef} handRef={leftHandRef} />
      <BrasDroit
        upperArmRef={rightUpperArmRef}
        forearmRef={rightForearmRef}
        handRef={rightHandRef}
        mouseGroupRef={mouseGroupRef}
      />
    </group>
  );
}
