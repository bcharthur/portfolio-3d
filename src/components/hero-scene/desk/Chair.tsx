import { COLORS, DEFAULT_ROTATION } from '../constants';
import { Common3DProps } from '../types';

export default function Chair({ position = [0, 0, 0], rotation = DEFAULT_ROTATION }: Common3DProps) {
  return (
    <group position={position} rotation={rotation}>
      <mesh position={[0, 0.66, 0.02]} castShadow>
        <boxGeometry args={[0.62, 0.09, 0.62]} />
        <meshStandardMaterial color={COLORS.chairSeat} roughness={0.85} />
      </mesh>

      <mesh position={[0, 1.18, -0.34]} castShadow>
        <boxGeometry args={[0.58, 0.96, 0.08]} />
        <meshStandardMaterial color={COLORS.chairSeat} roughness={0.85} />
      </mesh>

      <mesh position={[0, 0.33, -0.05]} rotation={[0.25, 0, 0]} castShadow>
        <boxGeometry args={[0.08, 0.62, 0.08]} />
        <meshStandardMaterial color={COLORS.chairFrame} metalness={0.55} roughness={0.35} />
      </mesh>

      <mesh position={[0.16, 0.15, 0.18]} rotation={[0, 0, 0.8]} castShadow>
        <boxGeometry args={[0.58, 0.06, 0.06]} />
        <meshStandardMaterial color={COLORS.chairFrame} metalness={0.55} roughness={0.35} />
      </mesh>
      <mesh position={[-0.16, 0.15, 0.18]} rotation={[0, 0, -0.8]} castShadow>
        <boxGeometry args={[0.58, 0.06, 0.06]} />
        <meshStandardMaterial color={COLORS.chairFrame} metalness={0.55} roughness={0.35} />
      </mesh>
      <mesh position={[0, 0.03, 0.42]} castShadow>
        <boxGeometry args={[0.54, 0.06, 0.06]} />
        <meshStandardMaterial color={COLORS.chairFrame} metalness={0.55} roughness={0.35} />
      </mesh>
    </group>
  );
}
