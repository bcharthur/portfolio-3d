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
            bezelColor="#6f6a91"
            standColor="#5a5375"
            screenYOffset={screenYOffset}
        >
            <ScreenContent variant="main" />
        </MonitorShell>
    );
}