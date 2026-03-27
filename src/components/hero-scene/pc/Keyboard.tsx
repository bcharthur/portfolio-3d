import { RoundedBox } from '@react-three/drei';
import { Common3DProps } from '../types';

export default function Keyboard({
                                     position = [0, 0, 0],
                                     rotation = [0, 0, 0],
                                 }: Common3DProps) {
    const rows = [
        { y: 0.018, z: -0.07, count: 10, width: 0.038 },
        { y: 0.018, z: -0.025, count: 10, width: 0.038 },
        { y: 0.018, z: 0.02, count: 9, width: 0.04 },
        { y: 0.018, z: 0.065, count: 7, width: 0.05 },
    ];

    return (
        <group position={position} rotation={rotation}>
            <group rotation={[-0.12, 0, 0]}>
                {/* Base du clavier */}
                <RoundedBox
                    args={[0.56, 0.028, 0.24]}
                    radius={0.012}
                    smoothness={4}
                    castShadow
                    receiveShadow
                >
                    <meshStandardMaterial color="#cfd4dc" roughness={0.72}/>
                </RoundedBox>

                {/* Touches */}
                {rows.map((row, rowIndex) => {
                    const totalWidth = row.count * row.width + (row.count - 1) * 0.008;
                    const startX = -totalWidth / 2 + row.width / 2;

                    return Array.from({ length: row.count }).map((_, i) => (
                        <RoundedBox
                            key={`${rowIndex}-${i}`}
                            args={[row.width, 0.012, 0.028]}
                            radius={0.004}
                            smoothness={4}
                            position={[startX + i * (row.width + 0.008), row.y, row.z]}
                            castShadow
                            receiveShadow
                        >
                            <meshStandardMaterial color="#a7afbb" roughness={0.55}/>
                        </RoundedBox>
                    ));
                })}

                {/* Barre espace */}
                <RoundedBox
                    args={[0.22, 0.012, 0.03]}
                    radius={0.004}
                    smoothness={4}
                    position={[0, 0.018, 0.105]}
                    castShadow
                    receiveShadow
                >
                    <meshStandardMaterial color="#a7afbb" roughness={0.55}/>
                </RoundedBox>

                {/* Petit pavé / touche entrée stylisée */}
                <RoundedBox
                    args={[0.065, 0.012, 0.065]}
                    radius={0.004}
                    smoothness={4}
                    position={[0.22, 0.018, 0.045]}
                    castShadow
                    receiveShadow
                >
                    <meshStandardMaterial color="#a7afbb" roughness={0.55}/>
                </RoundedBox>
            </group>
        </group>
    );
}