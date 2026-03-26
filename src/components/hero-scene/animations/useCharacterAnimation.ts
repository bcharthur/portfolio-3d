import { MutableRefObject } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Vec3 } from '../types';

export type CharacterAnimationRefs = {
  rootRef: MutableRefObject<THREE.Group | null>;
  headRef: MutableRefObject<THREE.Group | null>;
  leftUpperArmRef: MutableRefObject<THREE.Group | null>;
  leftForearmRef: MutableRefObject<THREE.Group | null>;
  leftHandRef: MutableRefObject<THREE.Group | null>;
  rightUpperArmRef: MutableRefObject<THREE.Group | null>;
  rightForearmRef: MutableRefObject<THREE.Group | null>;
  rightHandRef: MutableRefObject<THREE.Group | null>;
  mouseRef: MutableRefObject<THREE.Group | null>;
};

export function useCharacterAnimation(refs: CharacterAnimationRefs, basePosition: Vec3) {
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    if (refs.rootRef.current) {
      refs.rootRef.current.position.y = basePosition[1] + Math.sin(t * 2.2) * 0.014;
      refs.rootRef.current.rotation.z = Math.sin(t * 1.4) * 0.008;
    }

    if (refs.headRef.current) {
      refs.headRef.current.rotation.x = 0.04 + Math.sin(t * 1.3) * 0.01;
      refs.headRef.current.rotation.y = Math.sin(t * 0.9) * 0.22;
    }

    // Left arm from the character perspective: typing on keyboard.
    if (refs.leftUpperArmRef.current) {
      refs.leftUpperArmRef.current.rotation.x = -0.92 + Math.sin(t * 5.2) * 0.03;
      refs.leftUpperArmRef.current.rotation.z = 0.12 + Math.sin(t * 3.1) * 0.02;
    }
    if (refs.leftForearmRef.current) {
      refs.leftForearmRef.current.rotation.x = -1.04 + Math.sin(t * 8.4) * 0.05;
      refs.leftForearmRef.current.rotation.z = Math.sin(t * 6.8) * 0.018;
    }
    if (refs.leftHandRef.current) {
      refs.leftHandRef.current.rotation.x = 0.1 + Math.sin(t * 9.4) * 0.08;
      refs.leftHandRef.current.position.z = 0.18 + Math.sin(t * 6.6) * 0.01;
    }

    // Right arm from the character perspective: mouse usage.
    if (refs.rightUpperArmRef.current) {
      refs.rightUpperArmRef.current.rotation.x = -0.84 + Math.sin(t * 1.7) * 0.03;
      refs.rightUpperArmRef.current.rotation.z = -0.15 + Math.cos(t * 1.9) * 0.03;
    }
    if (refs.rightForearmRef.current) {
      refs.rightForearmRef.current.rotation.x = -0.98 + Math.sin(t * 1.7) * 0.04;
      refs.rightForearmRef.current.rotation.z = -Math.cos(t * 1.7) * 0.018;
    }
    if (refs.rightHandRef.current) {
      refs.rightHandRef.current.rotation.z = -Math.sin(t * 1.7) * 0.08;
      refs.rightHandRef.current.rotation.x = 0.08 + Math.cos(t * 1.7) * 0.035;
    }
    if (refs.mouseRef.current) {
      refs.mouseRef.current.position.x = Math.sin(t * 1.7) * 0.03;
      refs.mouseRef.current.position.z = 0.03 + Math.cos(t * 1.9) * 0.02;
    }
  });
}
