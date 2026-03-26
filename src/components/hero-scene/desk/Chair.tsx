import { COLORS } from "../constants";
import { Vec3 } from "../types";

export default function Chair({
  position,
  rotation = [0, 0, 0],
}: {
  position: Vec3;
  rotation?: Vec3;
}) {
  return (
    <group position={position} rotation={rotation}>
      <mesh position={[0, 0.65, 0.06]} castShadow>
        <boxGeometry args={[0.66, 0.09, 0.64]} />
        <meshStandardMaterial color={COLORS.chairSeat} roughness={0.85} />
      </mesh>

      <mesh position={[0, 1.21, -0.32]} rotation={[0.08, 0, 0]} castShadow>
        <boxGeometry args={[0.6, 1.02, 0.1]} />
        <meshStandardMaterial color={COLORS.chairSeat} roughness={0.85} />
      </mesh>

      <mesh position={[0, 0.34, -0.02]} rotation={[0.2, 0, 0]} castShadow>
        <boxGeometry args={[0.08, 0.66, 0.08]} />
        <meshStandardMaterial color={COLORS.chairFrame} metalness={0.55} roughness={0.35} />
      </mesh>

      {[
        [0.22, 0.14, 0.18, 0.88],
        [-0.22, 0.14, 0.18, -0.88],
        [0.22, 0.14, -0.24, -0.88],
        [-0.22, 0.14, -0.24, 0.88],
      ].map(([x, y, z, r], i) => (
        <mesh key={i} position={[x, y, z]} rotation={[0, 0, r]} castShadow>
          <boxGeometry args={[0.56, 0.06, 0.06]} />
          <meshStandardMaterial color={COLORS.chairFrame} metalness={0.55} roughness={0.35} />
        </mesh>
      ))}
    </group>
  );
}
