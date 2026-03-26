import { COLORS } from '../constants';

export default function Corps() {
  return (
    <group>
      <mesh position={[-0.16, 0.28, 0.05]} castShadow>
        <boxGeometry args={[0.22, 0.6, 0.22]} />
        <meshStandardMaterial color={COLORS.pants} />
      </mesh>
      <mesh position={[0.16, 0.28, 0.05]} castShadow>
        <boxGeometry args={[0.22, 0.6, 0.22]} />
        <meshStandardMaterial color={COLORS.pants} />
      </mesh>

      <mesh position={[0, 0.72, 0.02]} castShadow>
        <boxGeometry args={[0.58, 0.34, 0.28]} />
        <meshStandardMaterial color={COLORS.pants} />
      </mesh>

      <mesh position={[0, 1.14, -0.04]} castShadow>
        <boxGeometry args={[0.8, 0.86, 0.44]} />
        <meshStandardMaterial color={COLORS.shirt} />
      </mesh>

      <mesh position={[0, 1.36, -0.24]} castShadow>
        <boxGeometry args={[0.76, 0.32, 0.1]} />
        <meshStandardMaterial color={COLORS.shirt} />
      </mesh>

      <mesh position={[0, 1.6, -0.1]} castShadow>
        <boxGeometry args={[0.18, 0.22, 0.18]} />
        <meshStandardMaterial color={COLORS.skin} />
      </mesh>
    </group>
  );
}
