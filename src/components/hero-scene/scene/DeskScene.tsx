import { useRef } from 'react';
import * as THREE from 'three';
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
      <Desk1 position={[-0.7, 0, -1.4]} rotation={[0, 0, 0]} />
      <Desk2 position={[-1.3, 0, -0.1]} rotation={[0, 1.5, 0]} />

      <EcranPrincipal position={[0.5, 0.9, -1.3]} rotation={[0, 0, 0]} />
      <EcranSecondaire position={[-0.8, 0.9, -1]} rotation={[0, 0.5, 0]} />

      <Keyboard position={[0, 0.90, -0.2]} rotation={[0, 0, 0]} />
      <Mouse position={[0.5, 0.90, -0.2]} rotation={[0.3, 3, 0]} />
      <Mug position={[1, 0.90, -0.1]} rotation={[0, 0, 0]} />
      <PencilCup position={[-1.2, 0.90, -0.6]} rotation={[0, 0, 0]} />

      <Chair position={[0.10, 0, 0.6]} rotation={[0, -2.7, 0]} />

      <WallShelf position={[-1.3, 2.1, -1.3]} rotation={[0, 0, 0]} />
      <WallBoard position={[0.2, 2.4, -1.3]} rotation={[0, 0, 0]} />
      <WallClock position={[1.8, 2.0, -1.3]} />
      <Plant position={[1.4, 0.1, -1.2]} rotation={[0, 0, 0]} />
    </group>
  );
}
