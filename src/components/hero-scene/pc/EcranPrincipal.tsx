import { Common3DProps } from '../types';
import MonitorShell from './MonitorShell';
import ScreenContent from './ScreenContent';

export default function EcranPrincipal({ position = [0, 0, 0], rotation = [0, 0, 0] }: Common3DProps) {
  return (
    <MonitorShell position={position} rotation={rotation} bezelColor="#2e2941" standColor="#443d5f">
      <ScreenContent
        emissive="#253b8c"
        emissiveIntensity={0.32}
        lines={[
          { y: 0.38, width: 0.52, x: -0.1, color: '#d8b4fe' },
          { y: 0.28, width: 0.76, x: -0.02, color: '#fca5a5' },
          { y: 0.17, width: 0.66, x: -0.08, color: '#fde047' },
          { y: 0.06, width: 0.58, x: -0.1, color: '#86efac' },
          { y: -0.05, width: 0.82, x: 0, color: '#c084fc' },
          { y: -0.16, width: 0.46, x: -0.15, color: '#fbbf24' },
        ]}
      />
    </MonitorShell>
  );
}
