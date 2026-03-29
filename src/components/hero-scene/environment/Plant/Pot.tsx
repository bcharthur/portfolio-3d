export default function Pot() {
  return (
    <group>
      <mesh castShadow receiveShadow position={[0, -0.08, 0]}>
        <cylinderGeometry args={[0.23, 0.18, 0.2, 40]} />
        <meshStandardMaterial color="#b49d8f" roughness={0.95} />
      </mesh>

      <mesh castShadow receiveShadow position={[0, -0.155, 0]}>
        <cylinderGeometry args={[0.19, 0.175, 0.03, 40]} />
        <meshStandardMaterial color="#f2efeb" roughness={0.78} />
      </mesh>

      <mesh castShadow receiveShadow position={[0, 0.085, 0]}>
        <cylinderGeometry args={[0.255, 0.235, 0.06, 40]} />
        <meshStandardMaterial color="#f4f1ed" roughness={0.72} />
      </mesh>

      <mesh receiveShadow position={[0, 0.092, 0]}>
        <cylinderGeometry args={[0.205, 0.215, 0.035, 32]} />
        <meshStandardMaterial color="#4b2917" roughness={1} />
      </mesh>

      <mesh castShadow receiveShadow position={[0, 0.102, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.2, 0.025, 18, 48]} />
        <meshStandardMaterial color="#f7f4f1" roughness={0.7} />
      </mesh>
    </group>
  );
}
