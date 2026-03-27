import { Common3DProps } from '../types';
import MonitorShell from './MonitorShell';
import ScreenContent from './ScreenContent';

export default function EcranSecondaire({
                                            position = [0, 0, 0],
                                            rotation = [0, 0, 0],
                                        }: Common3DProps) {
    return (
        <MonitorShell
            position={position}
            rotation={rotation}
            bezelColor="#3f3957"
            standColor="#4a4461"
        >
            <ScreenContent
                emissive="#293b8f"
                emissiveIntensity={0.24}
            />
        </MonitorShell>
    );
}