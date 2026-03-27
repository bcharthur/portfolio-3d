import { Common3DProps } from '../types';
import { RoundedBox } from '@react-three/drei';

export default function WallBoard({ position = [0, 0, 0], rotation = [0, 0, 0] }: Common3DProps) {
    return (
        <group position={position} rotation={rotation}>

            {/* Cadre en bois : Bords doux */}
            <RoundedBox
                args={[1.42, 0.88, 0.06]}
                radius={0.03}
                smoothness={4}
                castShadow
                receiveShadow
            >
                <meshStandardMaterial color="#e6d4b5" roughness={0.9} />
            </RoundedBox>

            {/* Surface en liège (légèrement en retrait et adoucie) */}
            <RoundedBox
                position={[0, 0, 0.035]}
                args={[1.25, 0.72, 0.02]}
                radius={0.01}
                smoothness={4}
                receiveShadow
            >
                <meshStandardMaterial color="#bca18f" roughness={1} />
            </RoundedBox>

            {/* --- GROUPE GAUCHE (Feuilles empilées) --- */}
            <group position={[-0.32, 0.16, 0.045]}>
                {/* Feuille blanche en arrière-plan */}
                <RoundedBox
                    position={[-0.04, 0.02, 0]}
                    rotation={[0, 0, 0]}
                    args={[0.22, 0.28, 0.008]}
                    radius={0.002}
                    castShadow
                >
                    <meshStandardMaterial color="#f8f4ef" roughness={0.96} />
                </RoundedBox>

                {/* Feuille bleue au premier plan */}
                <group position={[0, -0.02, 0.012]} rotation={[0, 0, 0.08]}>
                    <RoundedBox args={[0.22, 0.28, 0.008]} radius={0.002} castShadow>
                        <meshStandardMaterial color="#cfe2fb" roughness={0.96} />
                    </RoundedBox>

                    {/* Lignes de texte (détails) sur la feuille bleue */}
                    <group position={[0, -0.02, 0.005]}>
                        <mesh position={[0, 0.05, 0]}><boxGeometry args={[0.12, 0.012, 0.002]} /><meshStandardMaterial color="#a0b8df" /></mesh>
                        <mesh position={[-0.02, 0.02, 0]}><boxGeometry args={[0.08, 0.012, 0.002]} /><meshStandardMaterial color="#a0b8df" /></mesh>
                        <mesh position={[0.01, -0.01, 0]}><boxGeometry args={[0.14, 0.012, 0.002]} /><meshStandardMaterial color="#a0b8df" /></mesh>
                        <mesh position={[-0.01, -0.04, 0]}><boxGeometry args={[0.10, 0.012, 0.002]} /><meshStandardMaterial color="#a0b8df" /></mesh>
                    </group>

                    {/* Punaise gauche */}
                    <group position={[-0.06, 0.1, 0.015]}>
                        {/* Tête de la punaise */}
                        <mesh position={[0, 0, 0.02]} rotation={[Math.PI / 2, 0, 0]} castShadow>
                            <cylinderGeometry args={[0.045, 0.045, 0.02, 32]} />
                            <meshStandardMaterial color="#e56b7a" roughness={0.6} />
                        </mesh>
                        {/* Base de la punaise (la tige visible) */}
                        <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
                            <cylinderGeometry args={[0.025, 0.025, 0.03, 32]} />
                            <meshStandardMaterial color="#d45a69" roughness={0.7} />
                        </mesh>
                    </group>
                </group>
            </group>

            {/* --- GROUPE DROIT (Feuille unique) --- */}
            <group position={[0.38, -0.1, 0.055]} rotation={[0, 0, -0.12]}>
                {/* Feuille blanche */}
                <RoundedBox args={[0.24, 0.32, 0.008]} radius={0.002} castShadow>
                    <meshStandardMaterial color="#f8f4ef" roughness={0.96} />
                </RoundedBox>

                {/* Lignes de texte (détails) sur la feuille blanche */}
                <group position={[0, -0.04, 0.005]}>
                    <mesh position={[0, 0.06, 0]}><boxGeometry args={[0.14, 0.012, 0.002]} /><meshStandardMaterial color="#dcd6ce" /></mesh>
                    <mesh position={[-0.02, 0.03, 0]}><boxGeometry args={[0.10, 0.012, 0.002]} /><meshStandardMaterial color="#dcd6ce" /></mesh>
                    <mesh position={[0.02, 0, 0]}><boxGeometry args={[0.18, 0.012, 0.002]} /><meshStandardMaterial color="#dcd6ce" /></mesh>
                    <mesh position={[-0.03, -0.03, 0]}><boxGeometry args={[0.08, 0.012, 0.002]} /><meshStandardMaterial color="#dcd6ce" /></mesh>
                    <mesh position={[0.01, -0.06, 0]}><boxGeometry args={[0.16, 0.012, 0.002]} /><meshStandardMaterial color="#dcd6ce" /></mesh>
                </group>

                {/* Punaise droite */}
                <group position={[0, 0.12, 0.015]}>
                    <mesh position={[0, 0, 0.02]} rotation={[Math.PI / 2, 0, 0]} castShadow>
                        <cylinderGeometry args={[0.045, 0.045, 0.02, 32]} />
                        <meshStandardMaterial color="#e56b7a" roughness={0.6} />
                    </mesh>
                    <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
                        <cylinderGeometry args={[0.025, 0.025, 0.03, 32]} />
                        <meshStandardMaterial color="#d45a69" roughness={0.7} />
                    </mesh>
                </group>
            </group>

        </group>
    );
}