import { Common3DProps } from '../types';
import MonitorShellPrincipal from './MonitorShellPrincipal';
import TextureEcranPrincipale from './TextureEcranPrincipale';
import ContentEcranPrincipal from './ContentEcranPrincipal';

type EcranProps = Common3DProps & {
  screenYOffset?: number;
};

export default function EcranPrincipal({
                                         position = [0, 0, 0],
                                         rotation = [0, 0, 0],
                                         screenYOffset = 0.08,
                                       }: EcranProps) {
  return (
      <MonitorShellPrincipal
          position={position}
          rotation={rotation}
          bezelColor="#d7dce4"
          standColor="#b8bec8"
          screenYOffset={screenYOffset}
          texture={<TextureEcranPrincipale />}
          content={<ContentEcranPrincipal />}
      />
  );
}