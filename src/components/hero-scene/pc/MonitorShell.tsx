import { ReactNode } from 'react';
import { RoundedBox } from '@react-three/drei';
import { Common3DProps } from '../types';

export const MONITOR_W = 1.18;
export const MONITOR_H = 0.9;
export const MONITOR_DEPTH = 0.08;

export const SCREEN_W = MONITOR_W - 0.18;
export const SCREEN_H = MONITOR_H - 0.18;

export type MonitorShellProps = Common3DProps & {
  bezelColor: string;
  standColor: string;
  children?: ReactNode;
};

export default function MonitorShell({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  bezelColor,
  standColor,
  children,
}: MonitorShellProps) {
  const halfH = MONITOR_H / 2;

  return (
    <group position={position} rotation={rotation}>
      {/* Coque principale */}
      <RoundedBox
        args={[MONITOR_W, MONITOR_H, MONITOR_DEPTH]}
        radius={0.085}
        smoothness={6}
        position={[0, halfH, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color={bezelColor} metalness={0.2} roughness={0.5} />
      </RoundedBox>

      {/* Bord intérieur sombre pour mieux cadrer l'écran */}
      <RoundedBox
        args={[SCREEN_W + 0.06, SCREEN_H + 0.06, 0.02]}
        radius={0.055}
        smoothness={5}
        position={[0, halfH + 0.002, MONITOR_DEPTH / 2 - 0.008]}
      >
        <meshStandardMaterial color="#161826" metalness={0.08} roughness={0.82} />
      </RoundedBox>

      {children}

      {/* Col du pied plus propre */}
      <mesh position={[0, 0.15, -0.005]} castShadow receiveShadow>
        <boxGeometry args={[0.09, 0.18, 0.055]} />
        <meshStandardMaterial color={standColor} metalness={0.14} roughness={0.6} />
      </mesh>

      {/* Support incliné */}
      <mesh position={[0, 0.07, 0.005]} rotation={[0.16, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.24, 0.026, 0.12]} />
        <meshStandardMaterial color={standColor} metalness={0.14} roughness={0.62} />
      </mesh>

      {/* Base plus fine et plus stable */}
      <mesh position={[0, 0.018, 0.01]} castShadow receiveShadow>
        <boxGeometry args={[0.36, 0.022, 0.17]} />
        <meshStandardMaterial color={standColor} metalness={0.12} roughness={0.66} />
      </mesh>
    </group>
  );
}
