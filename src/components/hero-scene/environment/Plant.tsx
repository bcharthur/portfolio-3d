import { Common3DProps } from '../types';

export default function Plant({ position = [0, 0, 0], rotation = [0, 0, 0] }: Common3DProps) {
  return (
    <group position={position} rotation={rotation}>
      <mesh castShadow>
        <cylinderGeometry args={[0.21, 0.17, 0.3, 18]} />
        <meshStandardMaterial color="#d4c4b5" roughness={0.9} />
      </mesh>
      <mesh position={[0, -0.07, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.15, 0.08, 18]} />
        <meshStandardMaterial color="#7b4b27" roughness={1} />
      </mesh>
      {[
        [0, 0.28, 0, 0.15, 0, 0],
        [0.1, 0.23, 0.02, 0.18, 0, -0.4],
        [-0.09, 0.24, -0.03, 0.16, 0, 0.42],
        [0.04, 0.32, -0.05, 0.22, 0, -0.25],
        [-0.05, 0.33, 0.05, 0.22, 0, 0.24],
      ].map((leaf, i) => (
        <mesh key={i} position={[leaf[0], leaf[1], leaf[2]]} rotation={[leaf[3], leaf[4], leaf[5]] as [number, number, number]} castShadow>
          <sphereGeometry args={[0.11, 14, 14]} />
          <meshStandardMaterial color="#92dc2d" roughness={0.88} />
        </mesh>
      ))}
    </group>
  );
}
