import { COLORS } from "../constants";
import { Vec3 } from "../types";

export default function Desk({
  position,
  rotation = [0, 0, 0],
}: {
  position: Vec3;
  rotation?: Vec3;
}) {
  return (
    <group position={position} rotation={rotation}>
      <mesh position={[0.34, 1.0, 0.02]} castShadow receiveShadow>
        <boxGeometry args={[2.82, 0.08, 1.22]} />
        <meshStandardMaterial color={COLORS.deskTop} roughness={0.88} />
      </mesh>

      <mesh position={[-0.9, 1.0, -0.52]} castShadow receiveShadow>
        <boxGeometry args={[1.04, 0.08, 0.9]} />
        <meshStandardMaterial color={COLORS.deskTop} roughness={0.88} />
      </mesh>

      <mesh position={[0.34, 0.955, 0.02]} receiveShadow>
        <boxGeometry args={[2.88, 0.03, 1.28]} />
        <meshStandardMaterial color="#e8e4df" roughness={0.95} />
      </mesh>

      <mesh position={[-0.9, 0.955, -0.52]} receiveShadow>
        <boxGeometry args={[1.08, 0.03, 0.96]} />
        <meshStandardMaterial color="#e8e4df" roughness={0.95} />
      </mesh>

      {[
        [-0.84, 0.5, 0.5] as Vec3,
        [1.6, 0.5, 0.5] as Vec3,
        [1.6, 0.5, -0.46] as Vec3,
        [-0.48, 0.5, -0.92] as Vec3,
        [-1.33, 0.5, -0.92] as Vec3,
      ].map((deskLeg, i) => (
        <mesh key={i} position={deskLeg} castShadow>
          <boxGeometry args={[0.1, 0.98, 0.1]} />
          <meshStandardMaterial color={COLORS.deskWood} roughness={0.82} />
        </mesh>
      ))}

      <mesh position={[-0.18, 0.97, -0.38]} castShadow>
        <boxGeometry args={[0.18, 0.05, 0.62]} />
        <meshStandardMaterial color="#ddd7d1" roughness={0.88} />
      </mesh>
    </group>
  );
}
