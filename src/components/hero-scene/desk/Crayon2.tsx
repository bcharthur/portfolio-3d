import { Common3DProps } from '../types';

export default function Crayon2({
                                    position = [0, 0, 0],
                                    rotation = [0, 0, 0],
                                }: Common3DProps) {
    const bodyColor = '#fb7185';
    const bodyHeight = 0.20;
    const bodyRadius = 0.014;
    const woodHeight = 0.038;
    const tipHeight = 0.015;

    return (
        <group position={position} rotation={rotation}>
            {/* Tige arrondie */}
            <mesh position={[0, bodyHeight / 2, 0]} castShadow>
                <cylinderGeometry args={[bodyRadius, bodyRadius, bodyHeight, 16]} />
                <meshStandardMaterial color={bodyColor} roughness={0.72} />
            </mesh>

            {/* Pointe bois vers le haut */}
            <mesh position={[0, bodyHeight + woodHeight / 2 - 0.002, 0]} castShadow>
                <coneGeometry args={[bodyRadius * 0.95, woodHeight, 16]} />
                <meshStandardMaterial color="#e9c59a" roughness={0.9} />
            </mesh>

            {/* Extrémité colorée */}
            <mesh position={[0, bodyHeight + woodHeight + tipHeight / 2 - 0.006, 0]} castShadow>
                <coneGeometry args={[bodyRadius * 0.38, tipHeight, 16]} />
                <meshStandardMaterial color={bodyColor} roughness={0.85} />
            </mesh>
        </group>
    );
}