import { useRef } from 'react';
import * as THREE from 'three';
import { useSceneMotion } from '../animations/useSceneMotion';
import Rug from '../environment/Rug';
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
import Desk from "@/components/hero-scene/desk/Desk.tsx";

export default function DeskScene() {
  const groupRef = useRef<THREE.Group>(null);
  useSceneMotion(groupRef);

  return (
    <group ref={groupRef} position={[0.72, -1.5, 0.14]}>
      <Rug position={[-0.2, 0, 0.2]} rotation={[0, 0, 0]} />
        {/* Bureau Principal (Face à l'écran) */}
        <Desk
            position={[-0.8, -0.2, -1.6]}
            rotation={[0, 0, 0]}
            length={2}
            width={0.8}
        />

        {/* Bureau Secondaire (Retour côté gauche) */}
        <Desk
            position={[-0.6, -0.2, -1.6]}
            rotation={[0, Math.PI *1.5, 0]} // Angle parfait de 90 degrés
            length={1.2}
            width={0.8}
            hideLegs={[0, 2]} // On cache les pieds pour éviter les collisions avec le bureau principal
        />

        <EcranPrincipal
            position={[0.5, 0.7, -1.1]}
            rotation={[-0.2, 0, 0]}
            screenYOffset={0.3} // <--- L'écran monte, le pied reste à y=0.8
        />

        {/* Montons le secondaire un peu moins, 0.15 unités */}
        <EcranSecondaire
            position={[-0.8, 0.8, -0.9]}
            rotation={[-0.2, 0.5, 0.1]}
            screenYOffset={0.15} // <--- L'écran monte, le pied reste à y=0.8
        />

      <Keyboard position={[0, 0.7, -0.9]} rotation={[0, 0, 0]} />
      <Mouse position={[0.5, 0.7, -0.9]} rotation={[0.3, 3, 0]} />
      <Mug position={[0.88, 0.7, -0.98]} rotation={[0, 0.5, 0]} />
      <PencilCup position={[-1.2, 0.7, -0.6]} rotation={[0, 0, 0]} />

      <Chair position={[0.10, 0, -0.3]} rotation={[0, -3, 0]} />

      <WallShelf position={[-1.3, 2.1, -1.3]} rotation={[0, 0, 0]} />
      <WallBoard position={[0.2, 2.4, -1.3]} rotation={[0, 0, 0]} />
      <WallClock position={[1.8, 2.0, -1.3]} />
      <Plant position={[1.5, 0.1, -1.5]} rotation={[0, 0, 0]} />
    </group>
  );
}
