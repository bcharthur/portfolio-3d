import { ReactNode } from 'react';
import { RoundedBox } from '@react-three/drei';
import { Common3DProps } from '../types';

export const MONITOR_W = 1.18;
export const MONITOR_H = 0.76;
export const MONITOR_DEPTH = 0.05;

export const SCREEN_W = MONITOR_W - 0.12;
export const SCREEN_H = MONITOR_H - 0.12;

export type MonitorShellProps = Common3DProps & {
    bezelColor: string;
    standColor: string;
    children?: ReactNode;
    screenYOffset?: number;
};

export default function MonitorShell({
                                         position = [0, 0, 0],
                                         rotation = [0, 0, 0],
                                         bezelColor,
                                         standColor,
                                         children,
                                         screenYOffset = 0,
                                     }: MonitorShellProps) {
    const halfH = MONITOR_H / 2;

    return (
        <group position={position} rotation={rotation}>
            {/* Ecran */}
            <group position={[0, screenYOffset, 0]}>
                <RoundedBox
                    args={[MONITOR_W, MONITOR_H, MONITOR_DEPTH]}
                    radius={0.055}
                    smoothness={6}
                    position={[0, halfH, 0]}
                    castShadow
                    receiveShadow
                >
                    <meshStandardMaterial
                        color={bezelColor}
                        metalness={0.18}
                        roughness={0.58}
                    />
                </RoundedBox>

                {/* Cadre intérieur sombre */}
                <RoundedBox
                    args={[SCREEN_W + 0.045, SCREEN_H + 0.045, 0.018]}
                    radius={0.04}
                    smoothness={5}
                    position={[0, halfH, MONITOR_DEPTH / 2 - 0.01]}
                >
                    <meshStandardMaterial
                        color="#121522"
                        metalness={0.08}
                        roughness={0.86}
                    />
                </RoundedBox>

                {children}
            </group>

            {/* Pied : plus fin, plus proche du rendu attendu */}
            <mesh position={[0, 0.02, 0.02]} castShadow receiveShadow>
                <boxGeometry args={[0.30, 0.025, 0.15]} />
                <meshStandardMaterial
                    color={standColor}
                    metalness={0.15}
                    roughness={0.64}
                />
            </mesh>

            <mesh
                position={[0, 0.075, 0.01]}
                rotation={[0.2, 0, 0]}
                castShadow
                receiveShadow
            >
                <boxGeometry args={[0.18, 0.02, 0.10]} />
                <meshStandardMaterial
                    color={standColor}
                    metalness={0.15}
                    roughness={0.62}
                />
            </mesh>

            <mesh
                position={[0, 0.16 + screenYOffset / 2, -0.005]}
                castShadow
                receiveShadow
            >
                <boxGeometry args={[0.065, 0.20 + screenYOffset, 0.05]} />
                <meshStandardMaterial
                    color={standColor}
                    metalness={0.14}
                    roughness={0.60}
                />
            </mesh>
        </group>
    );
}