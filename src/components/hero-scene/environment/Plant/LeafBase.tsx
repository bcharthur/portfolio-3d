import { LeafProps } from './Plant.types.ts';

export default function LeafBase({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  color = '#76d51a',
  tilt = 0,
  length = 0.26,
  width = 0.09,
  bend = 0.18,
}: LeafProps) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      <mesh castShadow receiveShadow position={[0, 0.045, 0]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.012, 0.018, 0.09, 10]} />
        <meshStandardMaterial color="#3f7f18" roughness={0.95} />
      </mesh>

      <group position={[0, 0.07, 0]} rotation={[tilt, 0, bend]}>
        <mesh castShadow receiveShadow position={[0, length * 0.48, 0]}>
          {/*<sphereGeometry args={[0.1, 24, 24]} />*/}
          <meshStandardMaterial color={color} roughness={0.72} metalness={0.02} />
          {/* scale creates a pointed thin leaf instead of a round bulb */}
        </mesh>
        <mesh
          castShadow
          receiveShadow
          position={[0, length * 0.48, 0]}
          scale={[width, length, 0.055]}
        >
          <sphereGeometry args={[1, 24, 24, 0, Math.PI * 2, 0.2, Math.PI - 0.4]} />
          <meshStandardMaterial color={color} roughness={0.72} metalness={0.02} />
        </mesh>

        <mesh castShadow receiveShadow position={[0, length * 0.48, 0.012]}>
          <boxGeometry args={[0.008, length * 0.9, 0.006]} />
          <meshStandardMaterial color="#4f951d" roughness={0.9} />
        </mesh>
      </group>
    </group>
  );
}
