import type { MutableRefObject } from 'react';
import * as THREE from 'three';
import { COLORS } from '../constants';
import MainGauche from './MainGauche';

export type BrasGaucheProps = {
  upperArmRef: MutableRefObject<THREE.Group | null>;
  forearmRef: MutableRefObject<THREE.Group | null>;
  handRef: MutableRefObject<THREE.Group | null>;
};

export default function BrasGauche({ upperArmRef, forearmRef, handRef }: BrasGaucheProps) {
  return (
    <group ref={upperArmRef} position={[0.28, 1.2, 0.14]} rotation={[-0.92, 0, 0.12]}>
      <mesh position={[0, -0.2, 0]} castShadow>
        <boxGeometry args={[0.16, 0.46, 0.16]} />
        <meshStandardMaterial color={COLORS.shirt} />
      </mesh>

      <group ref={forearmRef} position={[0, -0.38, 0.1]} rotation={[-1.22, 0, 0]}>
        <mesh position={[0, -0.18, 0]} castShadow>
          <boxGeometry args={[0.15, 0.4, 0.15]} />
          <meshStandardMaterial color={COLORS.shirt} />
        </mesh>
        <MainGauche ref={handRef} />
      </group>
    </group>
  );
}
