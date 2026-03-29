type LeafProps = {
    position?: [number, number, number];
    rotation?: [number, number, number];
    scale?: number;
};

export default function Leaf3({
                                  position = [0, 0, 0],
                                  rotation = [0, 0, 0],
                                  scale = 1,
                              }: LeafProps) {
    return (
        <group position={position} rotation={rotation} scale={scale}>
            <mesh castShadow position={[0, 0.08, 0]}>
                <cylinderGeometry args={[0.01, 0.014, 0.16, 12]} />
                <meshStandardMaterial color="#67b80f" roughness={0.9} />
            </mesh>

            <mesh
                castShadow
                position={[0, 0.3, 0]}
                rotation={[-0.2, 0, 0]}
                scale={[1, 5, 0.08]}
            >
                <sphereGeometry args={[0.1, 24, 24]} />
                <meshStandardMaterial
                    color="#a6ea08"
                    roughness={0.8}
                    metalness={0.02}
                />
            </mesh>

            <mesh position={[0, 0.24, 0.012]} rotation={[0.08, 0, 0]}>
                <boxGeometry args={[0.008, 0.23, 0.006]} />
                <meshStandardMaterial color="#7bc710" roughness={0.9} />
            </mesh>
        </group>
    );
}