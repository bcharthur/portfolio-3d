import { Common3DProps } from '../types';

export default function Mug({ position = [0, 0, 0], rotation = [0, 0, 0] }: Common3DProps) {
  return (
    <group position={position} rotation={rotation}>
      <mesh castShadow>
        <cylinderGeometry args={[0.06, 0.05, 0.12, 16]} />
        <meshStandardMaterial color="#e88f73" roughness={0.62} />
      </mesh>
    </group>
  );
}
