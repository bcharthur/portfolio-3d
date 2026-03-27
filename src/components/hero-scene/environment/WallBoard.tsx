import { Common3DProps } from '../types';

export default function WallBoard({ position = [0, 0, 0], rotation = [0, 0, 0] }: Common3DProps) {
  return (
    <group position={position} rotation={rotation}>
      <mesh castShadow>
        <boxGeometry args={[1.42, 0.88, 0.06]} />
        <meshStandardMaterial color="#e6d4b5" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0, 0.035]}>
        <boxGeometry args={[1.25, 0.72, 0.02]} />
        <meshStandardMaterial color="#bca18f" roughness={1} />
      </mesh>
      <mesh position={[-0.34, 0.16, 0.055]} rotation={[0, 0, 0.08]}>
        <boxGeometry args={[0.22, 0.28, 0.01]} />
        <meshStandardMaterial color="#cfe2fb" roughness={0.96} />
      </mesh>
      <mesh position={[0.38, -0.1, 0.055]} rotation={[0, 0, -0.12]}>
        <boxGeometry args={[0.24, 0.32, 0.01]} />
        <meshStandardMaterial color="#f8f4ef" roughness={0.96} />
      </mesh>
      <mesh position={[-0.42, 0.26, 0.07]}>
        <sphereGeometry args={[0.05, 12, 12]} />
        <meshStandardMaterial color="#ef6c7c" />
      </mesh>
      <mesh position={[0.31, -0.01, 0.07]}>
        <sphereGeometry args={[0.05, 12, 12]} />
        <meshStandardMaterial color="#ef6c7c" />
      </mesh>
    </group>
  );
}
