import { Common3DProps } from '../types';
import MonitorShell from './MonitorShell';
import ScreenContent from './ScreenContent';

export default function EcranSecondaire({ position = [0, 0, 0], rotation = [0, 0, 0] }: Common3DProps) {
  return (
    <MonitorShell position={position} rotation={rotation} bezelColor="#3f3957" standColor="#4a4461">
      <ScreenContent
        emissive="#293b8f"
        emissiveIntensity={0.24}
        lines={[
          { y: 0.36, width: 0.32, x: 0.08, color: '#9ca3af' },
          { y: 0.28, width: 0.44, x: -0.02, color: '#cbd5e1' },
          { y: 0.16, width: 0.24, x: -0.12, color: '#94a3b8' },
          { y: 0.04, width: 0.38, x: 0.05, color: '#e5e7eb' },
          { y: -0.08, width: 0.3, x: -0.06, color: '#9ca3af' },
        ]}
      />
    </MonitorShell>
  );
}
