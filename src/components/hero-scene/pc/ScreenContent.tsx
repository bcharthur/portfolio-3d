import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import { MONITOR_DEPTH, SCREEN_H, SCREEN_W } from './MonitorShell';

type ScreenContentProps = {
    emissive?: string;
    emissiveIntensity?: number;
    variant?: 'main' | 'secondary';
};

type LineDef = {
    x: number;
    y: number;
    width: number;
    height: number;
    color: string;
};

function buildLines(variant: 'main' | 'secondary'): LineDef[] {
    const colors = [
        '#d98cff',
        '#7ee787',
        '#ffd866',
        '#ff9e64',
        '#78dce8',
        '#c0caf5',
    ];

    const widthsMain = [0.34, 0.26, 0.30, 0.22, 0.40, 0.28, 0.18, 0.31, 0.24, 0.36, 0.20];
    const widthsSecondary = [0.25, 0.30, 0.22, 0.36, 0.18, 0.28, 0.34, 0.20, 0.27, 0.16];

    const widths = variant === 'main' ? widthsMain : widthsSecondary;

    return widths.map((w, i) => ({
        x: -SCREEN_W / 2 + 0.08 + w / 2,
        y: SCREEN_H / 2 - 0.08 - i * 0.05,
        width: w,
        height: 0.014,
        color: colors[i % colors.length],
    }));
}

export default function ScreenContent({
                                          emissive = '#161b2b',
                                          emissiveIntensity = 0.18,
                                          variant = 'main',
                                      }: ScreenContentProps) {
    const screenRef = useRef<THREE.Mesh>(null);
    const lines = useMemo(() => buildLines(variant), [variant]);

    useFrame(({ clock }) => {
        if (!screenRef.current) return;
        const t = clock.getElapsedTime();
        const mat = screenRef.current.material as THREE.MeshStandardMaterial;
        mat.emissiveIntensity = emissiveIntensity + Math.sin(t * 1.2) * 0.008;
    });

    const screenY = MONITOR_DEPTH / 2 + SCREEN_H / 2 + 0.01;
    const screenZ = MONITOR_DEPTH / 2 - 0.004;

    return (
        <group position={[0, screenY, screenZ]}>
            {/* Fond écran */}
            <RoundedBox
                args={[SCREEN_W, SCREEN_H, 0.008]}
                radius={0.018}
                smoothness={4}
                ref={screenRef}
            >
                <meshStandardMaterial
                    color="#06080f"
                    emissive={emissive}
                    emissiveIntensity={emissiveIntensity}
                    roughness={0.95}
                    metalness={0.03}
                    polygonOffset
                    polygonOffsetFactor={1}
                    polygonOffsetUnits={1}
                />
            </RoundedBox>

            {/* Léger reflet vertical à gauche */}
            <mesh position={[-SCREEN_W * 0.28, 0.02, 0.005]} renderOrder={1}>
                <planeGeometry args={[SCREEN_W * 0.06, SCREEN_H * 0.72]} />
                <meshBasicMaterial
                    color="#ffffff"
                    transparent
                    opacity={0.035}
                    depthWrite={false}
                />
            </mesh>

            {/* Lignes de code */}
            <group position={[0, 0, 0.006]} renderOrder={2}>
                {lines.map((line, i) => (
                    <mesh key={i} position={[line.x, line.y, 0]} renderOrder={2}>
                        <planeGeometry args={[line.width, line.height]} />
                        <meshBasicMaterial
                            color={line.color}
                            toneMapped={false}
                            depthWrite={false}
                        />
                    </mesh>
                ))}
            </group>
        </group>
    );
}