import { useMemo } from 'react';
import CodeScreenLines from './CodeScreenLines';
import {
  SCREEN_TEXTURE_H,
  SCREEN_TEXTURE_W,
  SCREEN_SURFACE_Y,
  SCREEN_SURFACE_Z,
} from './MonitorShell';

type LineDef = {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
};

function buildLines(): LineDef[] {
  const colors = ['#c77dff', '#7ee787', '#ffd866', '#f5a97f', '#78dce8', '#a6da95'];
  const widths = [0.24, 0.30, 0.20, 0.34, 0.18, 0.26, 0.15, 0.29, 0.21, 0.33];

  return widths.map((width, index) => ({
    x: -SCREEN_TEXTURE_W / 2 + 0.09 + width / 2,
    y: SCREEN_TEXTURE_H / 2 - 0.08 - index * 0.052,
    width,
    height: 0.013,
    color: colors[index % colors.length],
  }));
}

export default function ContentEcranSecondaire() {
  const lines = useMemo(() => buildLines(), []);

  return (
      <group position={[0, SCREEN_SURFACE_Y, SCREEN_SURFACE_Z + 0.002]}>
        <CodeScreenLines lines={lines} />
      </group>
  );
}