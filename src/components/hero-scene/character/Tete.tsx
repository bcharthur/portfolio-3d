import { RefObject } from "react";
import * as THREE from "three";
import { COLORS } from "../constants";

export default function Tete({
  headGroupRef,
}: {
  headGroupRef: RefObject<THREE.Group | null>;
}) {
  return (
    <group ref={headGroupRef} position={[0, 1.86, -0.1]}>
      <mesh castShadow>
        <boxGeometry args={[0.44, 0.5, 0.44]} />
        <meshStandardMaterial color={COLORS.skin} />
      </mesh>

      <mesh position={[-0.24, 0, 0]} castShadow>
        <boxGeometry args={[0.06, 0.1, 0.08]} />
        <meshStandardMaterial color={COLORS.skin} />
      </mesh>
      <mesh position={[0.24, 0, 0]} castShadow>
        <boxGeometry args={[0.06, 0.1, 0.08]} />
        <meshStandardMaterial color={COLORS.skin} />
      </mesh>

      <mesh position={[0, 0.23, -0.01]} castShadow>
        <boxGeometry args={[0.44, 0.06, 0.42]} />
        <meshStandardMaterial color={COLORS.hairTop} />
      </mesh>
      <mesh position={[0, 0.27, -0.01]} castShadow>
        <boxGeometry args={[0.33, 0.04, 0.31]} />
        <meshStandardMaterial color={COLORS.hairTop} />
      </mesh>
      <mesh position={[0, 0.2, 0.2]} castShadow>
        <boxGeometry args={[0.4, 0.05, 0.06]} />
        <meshStandardMaterial color={COLORS.hairTop} />
      </mesh>

      <mesh position={[-0.225, 0.12, 0]} castShadow>
        <boxGeometry args={[0.04, 0.22, 0.38]} />
        <meshStandardMaterial color={COLORS.hairSide} />
      </mesh>
      <mesh position={[-0.225, -0.03, 0]} castShadow>
        <boxGeometry args={[0.03, 0.13, 0.3]} />
        <meshStandardMaterial color={COLORS.hairSide} />
      </mesh>
      <mesh position={[0.225, 0.12, 0]} castShadow>
        <boxGeometry args={[0.04, 0.22, 0.38]} />
        <meshStandardMaterial color={COLORS.hairSide} />
      </mesh>
      <mesh position={[0.225, -0.03, 0]} castShadow>
        <boxGeometry args={[0.03, 0.13, 0.3]} />
        <meshStandardMaterial color={COLORS.hairSide} />
      </mesh>

      <mesh position={[0, 0.1, -0.225]} castShadow>
        <boxGeometry args={[0.4, 0.24, 0.06]} />
        <meshStandardMaterial color={COLORS.hairTop} />
      </mesh>
    </group>
  );
}
