import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import Rug from "./environment/Rug";
import Desk from "./desk/Desk";
import EcranSecondaire from "./pc/EcranSecondaire";
import EcranPrincipal from "./pc/EcranPrincipal";
import Keyboard from "./pc/Keyboard";
import Mug from "./desk/Mug";
import PencilCup from "./desk/PencilCup";
import Chair from "./desk/Chair";
import Person from "./character/Person";
import WallShelf from "./environment/WallShelf";
import WallBoard from "./environment/WallBoard";
import WallClock from "./environment/WallClock";
import Plant from "./environment/Plant";

export default function DeskScene() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ pointer }) => {
    if (!groupRef.current) return;

    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      -0.28 + pointer.x * 0.05,
      0.04,
    );

    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      -0.04 + pointer.y * 0.015,
      0.04,
    );
  });

  return (
    <group ref={groupRef} position={[1.2, -1.76, 0.25]} rotation={[0, -0.28, 0]}>
      <Rug position={[0.2, 0, 1.12]} />

      <Desk position={[0.98, 0, -0.22]} rotation={[0, -0.76, 0]} />

      <EcranSecondaire position={[-0.38, 1.02, -0.2]} rotation={[0, 0.56, 0]} />
      <EcranPrincipal position={[0.22, 1.02, -0.04]} rotation={[0, 0.08, 0]} />
      <Keyboard position={[0.18, 1.03, 0.44]} rotation={[-0.02, 0.08, 0]} />

      <Mug position={[1.28, 1.03, 0.35]} />
      <PencilCup position={[-0.96, 1.03, 0.08]} />

      <Chair position={[-0.14, 0, 1.23]} rotation={[0, Math.PI - 0.22, 0]} />
      <Person position={[0.08, 0.02, 1.0]} rotation={[0, Math.PI - 0.22, 0]} />

      <WallShelf position={[-0.12, 2.5, -1.2]} />
      <WallBoard position={[1.6, 2.18, -1.08]} />
      <WallClock position={[2.8, 2.22, -1.02]} />
      <Plant position={[2.62, 0.16, 1.1]} />
    </group>
  );
}
