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
            bezelColor="#6c6686"
            standColor="#595271"
        >
            <ScreenContent />
        </MonitorShell>
    );
}