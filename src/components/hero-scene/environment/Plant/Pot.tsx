export default function Pot() {
    return (
        <group>
            {/* pot principal */}
            <mesh castShadow receiveShadow position={[0, -0.02, 0]}>
                <cylinderGeometry args={[0.24, 0.18, 0.28, 32]} />
                <meshStandardMaterial color="#dccfc2" roughness={0.95} />
            </mesh>

            {/* rebord haut blanc */}
            <mesh castShadow receiveShadow position={[0, 0.11, 0]}>
                <cylinderGeometry args={[0.29, 0.245, 0.055, 32]} />
                <meshStandardMaterial color="#f4f4f4" roughness={0.75} />
            </mesh>

            {/* liseré bas blanc */}
            <mesh castShadow receiveShadow position={[0, -0.145, 0]}>
                <cylinderGeometry args={[0.205, 0.195, 0.04, 32]} />
                <meshStandardMaterial color="#f4f4f4" roughness={0.75} />
            </mesh>

            {/* terre */}
            <mesh receiveShadow position={[0, 0.07, 0]}>
                <cylinderGeometry args={[0.205, 0.205, 0.05, 32]} />
                <meshStandardMaterial color="#5a321b" roughness={1} />
            </mesh>
        </group>
    );
}