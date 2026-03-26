import { useRef } from 'react';
import * as THREE from 'three';
import { DESK_LAYOUT } from '../constants';
import { useSceneMotion } from '../animations/useSceneMotion';
import Rug from '../environment/Rug';
import Desk from '../desk/Desk';
import EcranPrincipal from '../pc/EcranPrincipal';
import EcranSecondaire from '../pc/EcranSecondaire';
import Keyboard from '../pc/Keyboard';
import Mug from '../desk/Mug';
import PencilCup from '../desk/PencilCup';
import Chair from '../desk/Chair';
import Personnage from '../character/Personnage';
import WallShelf from '../environment/WallShelf';
import WallBoard from '../environment/WallBoard';
import WallClock from '../environment/WallClock';
import Plant from '../environment/Plant';

export default function DeskScene() {
  const groupRef = useRef<THREE.Group>(null);
  useSceneMotion(groupRef);

  return (
    <group ref={groupRef} position={[0.72, -1.5, 0.14]}>
      <Rug position={[0.15, 0, 0.58]} />
      <Desk position={DESK_LAYOUT.deskPosition} />

      <EcranPrincipal position={DESK_LAYOUT.frontMonitorPosition} />
      <EcranSecondaire position={DESK_LAYOUT.leftMonitorPosition} rotation={DESK_LAYOUT.leftMonitorRotation} />

      <Keyboard position={DESK_LAYOUT.keyboardPosition} />
      <Mug position={DESK_LAYOUT.mugPosition} />
      <PencilCup position={DESK_LAYOUT.pencilCupPosition} />

      <Chair position={DESK_LAYOUT.chairPosition} rotation={[0, Math.PI, 0]} />
      <Personnage position={DESK_LAYOUT.personPosition} rotation={[0, Math.PI, 0]} />

      <WallShelf position={[-0.1, 2.48, -1.08]} />
      <WallBoard position={[1.16, 2.25, -1.05]} />
      <WallClock position={[2.28, 2.28, -0.98]} />
      <Plant position={[2.18, 0.16, 1.02]} />
    </group>
  );
}
