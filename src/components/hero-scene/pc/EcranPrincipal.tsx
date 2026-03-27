import { Common3DProps } from '../types';
import MonitorShell from './MonitorShell';
import ScreenContent from './ScreenContent';

type EcranProps = Common3DProps & {
    screenYOffset?: number;
};

export default function EcranPrincipal({
                                           position = [0, 0, 0],
                                           rotation = [0, 0, 0],
                                           screenYOffset = 0.08,
                                       }: EcranProps) {
    return (
        <MonitorShell
            position={position}
            rotation={rotation}
            bezelColor="#cfd4dc"
            standColor="#b8bec8"
            screenYOffset={screenYOffset}
        >
            <ScreenContent variant="main" />
        </MonitorShell>
    );
}