import { COLORS } from "../constants";

export default function Corps() {
  return (
    <>
      <mesh position={[-0.17, 0.29, 0.02]} castShadow>
        <boxGeometry args={[0.22, 0.62, 0.22]} />
        <meshStandardMaterial color={COLORS.pants} />
      </mesh>
      <mesh position={[0.17, 0.29, 0.02]} castShadow>
        <boxGeometry args={[0.22, 0.62, 0.22]} />
        <meshStandardMaterial color={COLORS.pants} />
      </mesh>

      <mesh position={[0, 0.72, 0.04]} castShadow>
        <boxGeometry args={[0.62, 0.34, 0.3]} />
        <meshStandardMaterial color={COLORS.pants} />
      </mesh>

      <mesh position={[0, 1.16, -0.06]} rotation={[0.06, 0, 0]} castShadow>
        <boxGeometry args={[0.82, 0.9, 0.46]} />
        <meshStandardMaterial color={COLORS.shirt} />
      </mesh>

      <mesh position={[0, 1.37, -0.27]} rotation={[0.08, 0, 0]} castShadow>
        <boxGeometry args={[0.74, 0.36, 0.1]} />
        <meshStandardMaterial color={COLORS.shirt} />
      </mesh>

      <mesh position={[0, 1.32, 0.08]} castShadow>
        <boxGeometry args={[0.92, 0.12, 0.18]} />
        <meshStandardMaterial color={COLORS.shirt} />
      </mesh>

      <mesh position={[0, 1.62, -0.1]} castShadow>
        <boxGeometry args={[0.18, 0.22, 0.18]} />
        <meshStandardMaterial color={COLORS.skin} />
      </mesh>
    </>
  );
}
