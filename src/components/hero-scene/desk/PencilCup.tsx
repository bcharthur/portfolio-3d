import { Common3DProps } from '../types';

export default function PencilCup({ position = [0, 0, 0], rotation = [0, 0, 0] }: Common3DProps) {
  return (
    <group position={position} rotation={rotation}>
      <mesh castShadow>
        <cylinderGeometry args={[0.08, 0.08, 0.18, 16]} />
        <meshStandardMaterial color="#d1b28f" roughness={0.8} />
      </mesh>

      <mesh position={[-0.035, 0.14, 0]} rotation={[0.12, 0, 0.08]} castShadow>
        <boxGeometry args={[0.018, 0.24, 0.018]} />
        <meshStandardMaterial color="#7dd3fc" />
      </mesh>
      <mesh position={[0.015, 0.12, 0.01]} rotation={[-0.08, 0, -0.18]} castShadow>
        <boxGeometry args={[0.018, 0.21, 0.018]} />
        <meshStandardMaterial color="#fb7185" />
      </mesh>
      <mesh position={[0.045, 0.145, -0.008]} rotation={[0.1, 0, 0.14]} castShadow>
        <boxGeometry args={[0.018, 0.25, 0.018]} />
        <meshStandardMaterial color="#fbbf24" />
      </mesh>
    </group>
  );
}
