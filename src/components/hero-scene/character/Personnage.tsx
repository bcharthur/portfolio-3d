import { useRef } from 'react';
import * as THREE from 'three';
import { DEFAULT_ROTATION } from '../constants';
import { useCharacterAnimation } from '../animations/useCharacterAnimation';
import { Common3DProps } from '../types';
import Corps from './Corps';
import Tete from './Tete';
import BrasGauche from './BrasGauche';
import BrasDroit from './BrasDroit';

export default function Personnage({ position = [0, 0, 0], rotation = DEFAULT_ROTATION }: Common3DProps) {
  const rootRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const leftUpperArmRef = useRef<THREE.Group>(null);
  const leftForearmRef = useRef<THREE.Group>(null);
  const leftHandRef = useRef<THREE.Group>(null);
  const rightUpperArmRef = useRef<THREE.Group>(null);
  const rightForearmRef = useRef<THREE.Group>(null);
  const rightHandRef = useRef<THREE.Group>(null);
  const mouseRef = useRef<THREE.Group>(null);

  useCharacterAnimation(
    {
      rootRef,
      headRef,
      leftUpperArmRef,
      leftForearmRef,
      leftHandRef,
      rightUpperArmRef,
      rightForearmRef,
      rightHandRef,
      mouseRef,
    },
    position,
  );

  return (
    <group ref={rootRef} position={position} rotation={rotation}>
      <Corps />
      <Tete ref={headRef} />
      <BrasGauche upperArmRef={leftUpperArmRef} forearmRef={leftForearmRef} handRef={leftHandRef} />
      <BrasDroit
        upperArmRef={rightUpperArmRef}
        forearmRef={rightForearmRef}
        handRef={rightHandRef}
        mouseRef={mouseRef}
      />
    </group>
  );
}
