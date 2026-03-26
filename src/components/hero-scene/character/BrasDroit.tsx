import { RefObject } from "react";
import * as THREE from "three";
import { COLORS } from "../constants";
import MainDroite from "./MainDroite";

export default function BrasDroit({
  upperArmRef,
  forearmRef,
  handRef,
  mouseGroupRef,
}: {
  upperArmRef: RefObject<THREE.Group | null>;
  forearmRef: RefObject<THREE.Group | null>;
  handRef: RefObject<THREE.Group | null>;
  mouseGroupRef: RefObject<THREE.Group | null>;
}) {
  return (
    <group
      ref={upperArmRef}
      position={[0.34, 1.31, 0.05]}
      rotation={[-1.04, -0.54, -0.34]}
    >
      <mesh position={[0, -0.21, 0]} castShadow>
        <boxGeometry args={[0.18, 0.5, 0.18]} />
        <meshStandardMaterial color={COLORS.shirt} />
      </mesh>

      <group
        ref={forearmRef}
        position={[0.02, -0.45, 0.13]}
        rotation={[-0.74, 0.02, -0.06]}
      >
        <mesh position={[0, -0.18, 0]} castShadow>
          <boxGeometry args={[0.15, 0.42, 0.15]} />
          <meshStandardMaterial color={COLORS.shirt} />
        </mesh>

        <MainDroite handRef={handRef} mouseGroupRef={mouseGroupRef} />
      </group>
    </group>
  );
}
