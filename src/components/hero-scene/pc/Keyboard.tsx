import { Common3DProps } from '../types';

export default function Keyboard({ position = [0, 0, 0] }: Common3DProps) {
  return (
    <group position={position}>
      <mesh rotation={[-0.1, 0, 0]} castShadow>
        <boxGeometry args={[0.54, 0.03, 0.22]} />
        <meshStandardMaterial color="#dee1e6" roughness={0.75} />
      </mesh>
    </group>
  );
}
