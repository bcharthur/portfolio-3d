import { Common3DProps } from '../types';

export default function WallShelf({ position = [0, 0, 0], rotation = [0, 0, 0] }: Common3DProps) {
  return (
    <group position={position} rotation={rotation}>
      <mesh castShadow>
        <boxGeometry args={[0.75, 0.07, 0.22]} />
        <meshStandardMaterial color="#e6d4af" roughness={0.86} />
      </mesh>
      <mesh position={[-0.15, 0.18, 0]} castShadow>
        <boxGeometry args={[0.1, 0.34, 0.18]} />
        <meshStandardMaterial color="#dfe5ef" roughness={0.84} />
      </mesh>
      <mesh position={[0, 0.19, 0]} castShadow>
        <boxGeometry args={[0.14, 0.38, 0.18]} />
        <meshStandardMaterial color="#f6b341" roughness={0.84} />
      </mesh>
      <mesh position={[0.22, 0.11, 0]} castShadow>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#f7f5f0" roughness={0.94} />
      </mesh>
      <mesh position={[0.22, 0.21, 0]} castShadow>
        <sphereGeometry args={[0.065, 12, 12]} />
        <meshStandardMaterial color="#86d92c" roughness={0.9} />
      </mesh>
    </group>
  );
}
