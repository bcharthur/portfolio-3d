import { COLORS, DEFAULT_ROTATION } from '../constants';
import { Common3DProps } from '../types';

export default function Desk1({ position = [0, 0, 0], rotation = DEFAULT_ROTATION }: Common3DProps) {
  return (
    <group position={position} rotation={rotation}>
      <mesh position={[1.15, 1.0, 0.24]} castShadow receiveShadow>
        <boxGeometry args={[2.4, 0.08, 1.08]} />
        <meshStandardMaterial color={COLORS.deskTop} roughness={0.88} />
      </mesh>

      {[
        [0.12, 0.48, -0.2],
        [2.18, 0.48, -0.2],
        [0.12, 0.48, 0.68],
        [2.18, 0.48, 0.68],
      ].map((p, i) => (
        <mesh key={i} position={p as [number, number, number]} castShadow>
          <boxGeometry args={[0.1, 0.96, 0.1]} />
          <meshStandardMaterial color={COLORS.deskLeg} roughness={0.82} />
        </mesh>
      ))}
    </group>
  );
}
