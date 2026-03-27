import { RoundedBox } from '@react-three/drei';
import { COLORS, DEFAULT_ROTATION } from '../constants';
import { Common3DProps } from '../types';

export default function Chair({
                                  position = [0, 0, 0],
                                  rotation = DEFAULT_ROTATION,
                              }: Common3DProps) {
    return (
        <group position={position} rotation={rotation}>
            {/* Assise */}
            <RoundedBox
                args={[0.56, 0.08, 0.54]}
                radius={0.03}
                smoothness={4}
                position={[0, 0.50, 0.02]}
                castShadow
            >
                <meshStandardMaterial color={COLORS.chairSeat} roughness={0.9} />
            </RoundedBox>

            {/* Dossier plus bas */}
            <RoundedBox
                args={[0.52, 0.52, 0.07]}
                radius={0.03}
                smoothness={6}
                position={[0, 0.80, -0.22]}
                castShadow
            >
                <meshStandardMaterial color={COLORS.chairSeat} roughness={0.9} />
            </RoundedBox>

            {/* Petits supports sous l’assise */}
            <RoundedBox
                args={[0.06, 0.10, 0.06]}
                radius={0.02}
                smoothness={6}
                position={[0.16, 0.42, 0.02]}
                castShadow
            >
                <meshStandardMaterial
                    color={COLORS.chairFrame}
                    metalness={0.35}
                    roughness={0.42}
                />
            </RoundedBox>

            <RoundedBox
                args={[0.06, 0.10, 0.06]}
                radius={0.02}
                smoothness={6}
                position={[-0.16, 0.42, 0.02]}
                castShadow
            >
                <meshStandardMaterial
                    color={COLORS.chairFrame}
                    metalness={0.35}
                    roughness={0.42}
                />
            </RoundedBox>

            {/* Montants diagonaux */}
            <RoundedBox
                args={[0.07, 0.42, 0.07]}
                radius={0.02}
                smoothness={6}
                position={[0.18, 0.24, 0.02]}
                rotation={[0, 0, -0.28]}
                castShadow
            >
                <meshStandardMaterial
                    color={COLORS.chairFrame}
                    metalness={0.35}
                    roughness={0.4}
                />
            </RoundedBox>

            <RoundedBox
                args={[0.07, 0.42, 0.07]}
                radius={0.02}
                smoothness={6}
                position={[-0.18, 0.24, 0.02]}
                rotation={[0, 0, 0.28]}
                castShadow
            >
                <meshStandardMaterial
                    color={COLORS.chairFrame}
                    metalness={0.35}
                    roughness={0.4}
                />
            </RoundedBox>

            {/* Pied au sol avant */}
            <RoundedBox
                args={[0.52, 0.06, 0.06]}
                radius={0.025}
                smoothness={6}
                position={[0, 0.03, 0.26]}
                castShadow
                receiveShadow
            >
                <meshStandardMaterial
                    color={COLORS.chairFrame}
                    metalness={0.35}
                    roughness={0.38}
                />
            </RoundedBox>

            {/* Pied au sol arrière */}
            <RoundedBox
                args={[0.52, 0.06, 0.06]}
                radius={0.025}
                smoothness={6}
                position={[0, 0.03, -0.16]}
                castShadow
                receiveShadow
            >
                <meshStandardMaterial
                    color={COLORS.chairFrame}
                    metalness={0.35}
                    roughness={0.38}
                />
            </RoundedBox>

            {/* Côtés du cadre au sol */}
            <RoundedBox
                args={[0.48, 0.06, 0.06]}
                radius={0.025}
                smoothness={6}
                position={[0.23, 0.03, 0.05]}
                rotation={[0, Math.PI / 2, 0]}
                castShadow
                receiveShadow
            >
                <meshStandardMaterial
                    color={COLORS.chairFrame}
                    metalness={0.35}
                    roughness={0.38}
                />
            </RoundedBox>

            <RoundedBox
                args={[0.48, 0.06, 0.06]}
                radius={0.03}
                smoothness={6}
                position={[-0.23, 0.03, 0.05]}
                rotation={[0, Math.PI / 2, 0]}
                castShadow
                receiveShadow
            >
                <meshStandardMaterial
                    color={COLORS.chairFrame}
                    metalness={0.35}
                    roughness={0.38}
                />
            </RoundedBox>
        </group>
    );
}