import { RoundedBox } from '@react-three/drei';
import { COLORS, DEFAULT_ROTATION } from '../constants';
import { Common3DProps } from '../types';

interface DeskProps extends Common3DProps {
    length?: number;
    width?: number;
    hideLegs?: number[]; // Tableau pour cacher certains pieds (ex: [0, 2])
}

export default function Desk({
                                 position = [0, 0, 0],
                                 rotation = DEFAULT_ROTATION,
                                 length = 2,
                                 width = 0.8, // Plus fin que 1.08 pour correspondre à la référence
                                 hideLegs = [],
                             }: DeskProps) {
    const DESK_THICKNESS = 0.06; // Épaisseur réduite
    const DESK_RADIUS = 0.015;   // Rayon très petit pour un bord net mais doux

    const LEG_RADIUS = 0.05;
    const LEG_HEIGHT = 0.74;

    const TABLE_TOP_Y = 0.8;
    const LEG_Y = TABLE_TOP_Y - DESK_THICKNESS / 2 - LEG_HEIGHT / 2;

    const LEG_OFFSET = 0.15;

    // Position du centre du plateau
    const topPosition: [number, number, number] = [
        length / 2,
        TABLE_TOP_Y,
        width / 2,
    ];

    // Positions des 4 pieds (0: Avant-Gauche, 1: Avant-Droit, 2: Arrière-Gauche, 3: Arrière-Droit)
    const legPositions: [number, number, number][] = [
        [LEG_OFFSET, LEG_Y, LEG_OFFSET],
        [length - LEG_OFFSET, LEG_Y, LEG_OFFSET],
        [LEG_OFFSET, LEG_Y, width - LEG_OFFSET],
        [length - LEG_OFFSET, LEG_Y, width - LEG_OFFSET],
    ];

    return (
        <group position={position} rotation={rotation}>
            <RoundedBox
                args={[length, DESK_THICKNESS, width]}
                radius={DESK_RADIUS}
                smoothness={4}
                position={topPosition}
                castShadow
                receiveShadow
            >
                <meshStandardMaterial color={COLORS.deskTop} roughness={0.88} />
            </RoundedBox>

            {legPositions.map((pos, i) => (
                // On ne rend le pied que si son index n'est pas dans hideLegs
                !hideLegs.includes(i) && (
                    <mesh key={i} position={pos} castShadow receiveShadow>
                        <cylinderGeometry args={[LEG_RADIUS, LEG_RADIUS, LEG_HEIGHT, 20]} />
                        <meshStandardMaterial color={COLORS.deskLeg} roughness={0.82} />
                    </mesh>
                )
            ))}
        </group>
    );
}