import { RefObject } from "react";
import * as THREE from "three";
import { COLORS } from "../constants";
import Mouse from "../pc/Mouse";

export default function MainDroite({
  handRef,
  mouseGroupRef,
}: {
  handRef: RefObject<THREE.Group | null>;
  mouseGroupRef: RefObject<THREE.Group | null>;
}) {
  return (
    <group ref={handRef} position={[0.02, -0.25, 0.13]} rotation={[0.08, 0.1, 0.02]}>
      <mesh position={[0, 0.01, 0]} castShadow>
        <boxGeometry args={[0.13, 0.06, 0.15]} />
        <meshStandardMaterial color={COLORS.skin} />
      </mesh>

      {[-0.036, -0.012, 0.012, 0.036].map((x, i) => (
        <mesh
          key={i}
          position={[x, -0.018, 0.05]}
          rotation={[0.5, 0, 0]}
          castShadow
        >
          <boxGeometry args={[0.02, 0.04, 0.024]} />
          <meshStandardMaterial color={COLORS.skin} />
        </mesh>
      ))}

      <mesh position={[0.066, 0.012, -0.01]} rotation={[0.22, -0.3, 0.92]} castShadow>
        <boxGeometry args={[0.024, 0.05, 0.026]} />
        <meshStandardMaterial color={COLORS.skin} />
      </mesh>

      <Mouse mouseGroupRef={mouseGroupRef} />
    </group>
  );
}
