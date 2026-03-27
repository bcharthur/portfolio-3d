import { ReactNode } from 'react';
import { RoundedBox } from '@react-three/drei';
import { Common3DProps } from '../types';

export const MONITOR_W = 1.18;
export const MONITOR_H = 0.76;
export const MONITOR_DEPTH = 0.035;

export const SCREEN_TEXTURE_W = MONITOR_W - 0.12;
export const SCREEN_TEXTURE_H = MONITOR_H - 0.12;

export const SCREEN_SURFACE_Y = MONITOR_H / 2;
export const SCREEN_SURFACE_Z = MONITOR_DEPTH / 2 + 0.002;

type MonitorShellSecondaireProps = Common3DProps & {
    bezelColor: string;
    standColor: string;
    screenYOffset?: number;
    texture?: ReactNode;
    content?: ReactNode;
};

export default function MonitorShellSecondaire({
                                                   position = [0, 0, 0],
                                                   rotation = [0, 0, 0],
                                                   bezelColor,
                                                   standColor,
                                                   screenYOffset = 0,
                                                   texture,
                                                   content,
                                               }: MonitorShellSecondaireProps) {
    const halfH = MONITOR_H / 2;

    return (
        <group position={position}>
            {/* écran uniquement */}
            <group rotation={rotation}>
                <group position={[0, screenYOffset, 0.15]}>
                    <RoundedBox
                        args={[MONITOR_W, MONITOR_H, MONITOR_DEPTH]}
                        radius={0.035}
                        smoothness={4}
                        position={[0, halfH, 0]}
                        castShadow
                        receiveShadow
                    >
                        <meshStandardMaterial
                            color={bezelColor}
                            metalness={0.05}
                            roughness={0.78}
                        />
                    </RoundedBox>

                    {texture}
                    {content}
                </group>
            </group>

            {/* base */}
            <RoundedBox args={[0.30, 0.025, 0.15]}
                        radius={0.008}
                        smoothness={3}
                        position={[0, 0.05, 0.02]}
                        rotation={[0.2, 0.3, 0]}
                        castShadow receiveShadow
            >
                <meshStandardMaterial
                    color={standColor}
                    metalness={0.08}
                    roughness={0.62}
                />
            </RoundedBox>

            {/* support plus compact */}
            <RoundedBox
                args={[0.14, 0.02, 0.08]}
                radius={0.005}
                smoothness={3}
                position={[0, 0.072, 0.01]}
                rotation={[0.2, 0.3, 0]}
                castShadow
                receiveShadow
            >
                <meshStandardMaterial
                    color={standColor}
                    metalness={0.08}
                    roughness={0.62}
                />
            </RoundedBox>

            {/* colonne un peu plus fine */}
            <RoundedBox
                args={[0.05, 0.20 + screenYOffset, 0.035]}
                radius={0.008}
                smoothness={3}
                position={[0, 0.16 + screenYOffset / 2, -0.005]}
                rotation={[0, 0.3, 0]}
                castShadow
                receiveShadow
            >
                <meshStandardMaterial
                    color={standColor}
                    metalness={0.08}
                    roughness={0.6}
                />
            </RoundedBox>
        </group>
    );
}