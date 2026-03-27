import { ReactNode } from 'react';
import { RoundedBox } from '@react-three/drei';
import { Common3DProps } from '../types';

export const MONITOR_W = 1.18;
export const MONITOR_H = 0.76;
export const MONITOR_DEPTH = 0.035;

export const SCREEN_FRAME_W = MONITOR_W - 0.06;
export const SCREEN_FRAME_H = MONITOR_H - 0.06;

export const SCREEN_TEXTURE_W = MONITOR_W - 0.12;
export const SCREEN_TEXTURE_H = MONITOR_H - 0.12;

export const SCREEN_SURFACE_Y = MONITOR_H / 2;
export const SCREEN_SURFACE_Z = MONITOR_DEPTH / 2 + 0.002;

type MonitorShellProps = Common3DProps & {
    bezelColor: string;
    innerFrameColor?: string;
    standColor: string;
    screenYOffset?: number;
    texture?: ReactNode;
    content?: ReactNode;
};

export default function MonitorShell({
                                         position = [0, 0, 0],
                                         rotation = [0, 0, 0],
                                         bezelColor,
                                         innerFrameColor = '#b7bec8',
                                         standColor,
                                         screenYOffset = 0,
                                         texture,
                                         content,
                                     }: MonitorShellProps) {
    const halfH = MONITOR_H / 2;

    return (
        <group position={position} rotation={rotation}>
            <group position={[0, screenYOffset, 0]}>
                {/* coque simple */}
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

            {/* base */}
            <RoundedBox
                args={[0.30, 0.025, 0.15]}
                radius={0.008}
                smoothness={3}
                position={[0, 0.02, 0.02]}
                castShadow
                receiveShadow
            >
                <meshStandardMaterial color={standColor} metalness={0.08} roughness={0.62} />
            </RoundedBox>

            {/* support */}
            <RoundedBox
                args={[0.18, 0.02, 0.10]}
                radius={0.006}
                smoothness={3}
                position={[0, 0.075, 0.01]}
                rotation={[0.2, 0, 0]}
                castShadow
                receiveShadow
            >
                <meshStandardMaterial color={standColor} metalness={0.08} roughness={0.62} />
            </RoundedBox>

            {/* colonne */}
            <RoundedBox
                args={[0.055, 0.20 + screenYOffset, 0.04]}
                radius={0.008}
                smoothness={3}
                position={[0, 0.16 + screenYOffset / 2, -0.005]}
                castShadow
                receiveShadow
            >
                <meshStandardMaterial color={standColor} metalness={0.08} roughness={0.6} />
            </RoundedBox>
        </group>
    );
}