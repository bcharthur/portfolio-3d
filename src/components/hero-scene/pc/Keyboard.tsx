import { Vec3 } from "../types";

export default function Keyboard({
  position,
  rotation = [0, 0, 0],
}: {
  position: Vec3;
  rotation?: Vec3;
}) {
  return (
    <group position={position} rotation={rotation}>
      <mesh rotation={[-0.18, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.8, 0.038, 0.32]} />
        <meshStandardMaterial color="#e6e8ee" roughness={0.75} />
      </mesh>

      {[-0.27, -0.135, 0, 0.135, 0.27].flatMap((x) =>
        [-0.1, -0.035, 0.03, 0.095].map((z, i) => (
          <mesh key={`${x}-${z}-${i}`} position={[x, 0.018, z]} rotation={[-0.18, 0, 0]}>
            <boxGeometry args={[0.09, 0.008, 0.04]} />
            <meshStandardMaterial color="#cfd5df" roughness={0.82} />
          </mesh>
        )),
      )}

      <mesh position={[0, 0.017, 0.132]} rotation={[-0.18, 0, 0]}>
        <boxGeometry args={[0.48, 0.008, 0.035]} />
        <meshStandardMaterial color="#bcc6d3" roughness={0.82} />
      </mesh>
    </group>
  );
}
