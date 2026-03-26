import { Vec3 } from "../types";

export default function Rug({ position }: { position: Vec3 }) {
  return (
    <group position={position}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[4.2, 2.8]} />
        <meshStandardMaterial color="#e89c28" roughness={1} />
      </mesh>
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[3.2, 2.05]} />
        <meshStandardMaterial color="#f2df78" roughness={1} />
      </mesh>
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[2.15, 1.25]} />
        <meshStandardMaterial color="#e6d984" roughness={1} />
      </mesh>
    </group>
  );
}
