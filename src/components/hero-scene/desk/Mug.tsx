import { Vec3 } from "../types";

export default function Mug({ position }: { position: Vec3 }) {
  return (
    <group position={position}>
      <mesh castShadow>
        <cylinderGeometry args={[0.06, 0.05, 0.12, 16]} />
        <meshStandardMaterial color="#e88f73" roughness={0.62} />
      </mesh>
    </group>
  );
}
