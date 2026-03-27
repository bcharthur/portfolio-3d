import { Common3DProps } from '../types';
import MonitorShell from './MonitorShell';
import ScreenContent from './ScreenContent';

export default function EcranPrincipal({
                                           position = [0, 0, 0],
                                           rotation = [0, 0, 0],
                                       }: Common3DProps) {
    return (
        <MonitorShell
            position={position}
            rotation={rotation}
            bezelColor="#2e2941"
            standColor="#443d5f"
        >
            <ScreenContent
                emissive="#253b8c"
                emissiveIntensity={0.32}
            />
        </MonitorShell>
    );
}