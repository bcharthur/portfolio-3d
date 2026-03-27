import { Common3DProps } from '../types';
import MonitorShellSecondaire from './MonitorShellSecondaire';
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
      <MonitorShellSecondaire
          position={position}
          rotation={rotation}
          bezelColor="#d7dce4"
          standColor="#b8bec8"
          screenYOffset={screenYOffset}
          texture={<TextureEcranSecondaire />}
          content={<ContentEcranSecondaire />}
      />
  );
}