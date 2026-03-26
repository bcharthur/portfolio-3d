import { ReactNode } from 'react';
import { Common3DProps } from '../types';

export const MONITOR_W = 1.18;
export const MONITOR_H = 0.9;
export const MONITOR_DEPTH = 0.08;
export const SCREEN_W = MONITOR_W - 0.14;
export const SCREEN_H = MONITOR_H - 0.16;

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
      <mesh position={[0, halfH, 0]} castShadow>
        <boxGeometry args={[MONITOR_W, MONITOR_H, MONITOR_DEPTH]} />
        <meshStandardMaterial color={bezelColor} metalness={0.45} roughness={0.35} />
      </mesh>

      {children}

      <mesh position={[0, 0.13, -0.02]} castShadow>
        <boxGeometry args={[0.1, 0.2, 0.08]} />
        <meshStandardMaterial color={standColor} />
      </mesh>
      <mesh position={[0, 0.02, 0]} castShadow>
        <boxGeometry args={[0.34, 0.03, 0.18]} />
        <meshStandardMaterial color={standColor} />
      </mesh>
    </group>
  );
}
