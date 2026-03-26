import { RefObject } from "react";
import * as THREE from "three";
import { COLORS } from "../constants";

export default function MainGauche({
  handRef,
}: {
  handRef: RefObject<THREE.Group | null>;
}) {
  return (
    <group ref={handRef} position={[0.02, -0.26, 0.12]} rotation={[-0.18, -0.1, -0.04]}>
      <mesh castShadow>
        <boxGeometry args={[0.15, 0.065, 0.18]} />
        <meshStandardMaterial color={COLORS.skin} />
      </mesh>

      {[-0.05, -0.017, 0.016, 0.048].map((x, i) => (
        <mesh
          key={i}
          position={[x, -0.022, 0.06]}
          rotation={[0.6, 0, 0]}
          castShadow
        >
          <boxGeometry args={[0.022, 0.05, 0.024]} />
          <meshStandardMaterial color={COLORS.skin} />
        </mesh>
      ))}

      <mesh position={[-0.08, 0.004, -0.01]} rotation={[0.16, 0.3, -0.78]} castShadow>
        <boxGeometry args={[0.028, 0.05, 0.028]} />
        <meshStandardMaterial color={COLORS.skin} />
      </mesh>
    </group>
  );
}
