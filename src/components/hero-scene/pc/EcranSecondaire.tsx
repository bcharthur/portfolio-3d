import { Common3DProps } from '../types';
import MonitorShell from './MonitorShell';
import TextureEcranSecondaire from './TextureEcranSecondaire';
import ContentEcranSecondaire from './ContentEcranSecondaire';

type EcranProps = Common3DProps & {
  screenYOffset?: number;
};

export default function EcranSecondaire({
                                          position = [0, 0, 0],
                                          rotation = [0, 0, 0],
                                          screenYOffset = 0.08,
                                        }: EcranProps) {
  return (
      <MonitorShell
          position={position}
          rotation={rotation}
          bezelColor="#d7dce4"
          innerFrameColor="#a7afbb"
          standColor="#b8bec8"
          screenYOffset={screenYOffset}
          texture={<TextureEcranSecondaire />}
          content={<ContentEcranSecondaire />}
      />
  );
}