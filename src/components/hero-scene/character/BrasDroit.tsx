import type { MutableRefObject } from 'react';
import * as THREE from 'three';
import { COLORS } from '../constants';
import MainDroite from './MainDroite';
import Mouse from '../pc/Mouse';

export type BrasDroitProps = {
  upperArmRef: MutableRefObject<THREE.Group | null>;
  forearmRef: MutableRefObject<THREE.Group | null>;
  handRef: MutableRefObject<THREE.Group | null>;
  mouseRef: MutableRefObject<THREE.Group | null>;
};

export default function BrasDroit({ upperArmRef, forearmRef, handRef, mouseRef }: BrasDroitProps) {
  return (
    <group ref={upperArmRef} position={[-0.3, 1.18, 0.08]} rotation={[-0.84, 0, -0.14]}>
      <mesh position={[0, -0.2, 0]} castShadow>
        <boxGeometry args={[0.16, 0.46, 0.16]} />
        <meshStandardMaterial color={COLORS.shirt} />
      </mesh>

      <group ref={forearmRef} position={[0, -0.38, 0.12]} rotation={[-1.08, 0, 0]}>
        <mesh position={[0, -0.18, 0]} castShadow>
          <boxGeometry args={[0.15, 0.4, 0.15]} />
          <meshStandardMaterial color={COLORS.shirt} />
        </mesh>

        <MainDroite ref={handRef} />
        <Mouse ref={mouseRef} position={[-0.14, -0.48, 0.33]} />
      </group>
    </group>
  );
}
