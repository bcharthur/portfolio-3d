import { RefObject } from "react";
import * as THREE from "three";
import { COLORS } from "../constants";
import MainGauche from "./MainGauche";

export default function BrasGauche({
  upperArmRef,
  forearmRef,
  handRef,
}: {
  upperArmRef: RefObject<THREE.Group | null>;
  forearmRef: RefObject<THREE.Group | null>;
  handRef: RefObject<THREE.Group | null>;
}) {
  return (
    <group
      ref={upperArmRef}
      position={[-0.34, 1.33, 0.07]}
      rotation={[-1.22, -0.16, 0.92]}
    >
      <mesh position={[0, -0.21, 0]} castShadow>
        <boxGeometry args={[0.18, 0.5, 0.18]} />
        <meshStandardMaterial color={COLORS.shirt} />
      </mesh>

      <group
        ref={forearmRef}
        position={[0.03, -0.45, 0.11]}
        rotation={[-0.94, -0.02, 0.18]}
      >
        <mesh position={[0, -0.18, 0]} castShadow>
          <boxGeometry args={[0.15, 0.42, 0.15]} />
          <meshStandardMaterial color={COLORS.shirt} />
        </mesh>

        <MainGauche handRef={handRef} />
      </group>
    </group>
  );
}
