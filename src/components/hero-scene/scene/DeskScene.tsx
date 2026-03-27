import { useRef } from 'react';
import * as THREE from 'three';
import { DESK_LAYOUT } from '../constants';
import { useSceneMotion } from '../animations/useSceneMotion';
import Rug from '../environment/Rug';
import Desk1 from '../desk/Desk1.tsx';
import Desk2 from '../desk/Desk2.tsx';
import EcranPrincipal from '../pc/EcranPrincipal';
import EcranSecondaire from '../pc/EcranSecondaire';
import Keyboard from '../pc/Keyboard';
import Mug from '../desk/Mug';
import PencilCup from '../desk/PencilCup';
import Chair from '../desk/Chair';
import Mouse from '../pc/Mouse';
import WallShelf from '../environment/WallShelf';
import WallBoard from '../environment/WallBoard';
import WallClock from '../environment/WallClock';
import Plant from '../environment/Plant';

export default function DeskScene() {
  const groupRef = useRef<THREE.Group>(null);
  useSceneMotion(groupRef);

  return (
    <group ref={groupRef} position={[0.72, -1.5, 0.14]}>
      <Rug position={[-0.6, 0, 0.58]} rotation={[0, 0, 0]} />
      <Desk1 position={[-1, 0, -0.1]} rotation={[0, 0, 0]} />
      <Desk2 position={[-1.9, 0, 1.8]} rotation={[0, 1.5, 0]} />

      <EcranPrincipal position={[0, 1.04, -0.4]} rotation={[0, 0, 0]} />
      <EcranSecondaire position={[-1.3, 1.04, -0]} rotation={[0, 0.6, 0]} />

      <Keyboard position={[0.3, 1.2, 0.5]} rotation={[0, 0, 0]} />
      <Mouse position={[0.9, 1.2, 0.5]} rotation={[0, 3, 0]} />
      <Mug position={[-1.3, 1.2, 1]} rotation={[0, 0, 0]} />
      <PencilCup position={[-1.3, 1.2, 1.5]} rotation={[0, 0, 0]} />

      <Chair position={[0.22, 0, 0.98]} rotation={[0, Math.PI, 0]} />
      {/* <FbxCharacter position={[0.28, 0.4, 1.06]} rotation={[0, Math.PI, 0]} /> */}

      <WallShelf position={[-0.7, 2.48, -0.98]} rotation={[0, 0, 0]} />
      <WallBoard position={[0.8, 2.25, -0.98]} rotation={[0, 0, 0]} />
      <WallClock position={[2.2, 2.28, -0.98]} />
      <Plant position={[1.1, 0.1, -0.98]} rotation={[0, 0, 0]} />
    </group>
  );
}
