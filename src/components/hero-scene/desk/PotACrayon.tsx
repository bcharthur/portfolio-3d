import { Common3DProps } from '../types';

export default function PotACrayon({
                                       position = [0, 0, 0],
                                       rotation = [0, 0, 0],
                                   }: Common3DProps) {
    return (
        <group position={position} rotation={rotation}>
            <mesh castShadow receiveShadow>
                <cylinderGeometry args={[0.082, 0.088, 0.18, 28]} />
                <meshStandardMaterial color="#d2b28f" roughness={0.9} />
            </mesh>

            <mesh position={[0, 0.084, 0]} castShadow receiveShadow>
                <cylinderGeometry args={[0.087, 0.087, 0.012, 28]} />
                <meshStandardMaterial color="#c7a581" roughness={0.85} />
            </mesh>

            <mesh position={[0, 0.03, 0]} receiveShadow>
                <cylinderGeometry args={[0.069, 0.072, 0.11, 24]} />
                <meshStandardMaterial color="#b8936d" roughness={1} />
            </mesh>

            <mesh position={[0, 0.086, 0]} receiveShadow>
                <cylinderGeometry args={[0.066, 0.066, 0.01, 24]} />
                <meshStandardMaterial color="#a98662" roughness={1} />
            </mesh>
        </group>
    );
}