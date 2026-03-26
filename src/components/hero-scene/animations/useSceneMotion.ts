import { MutableRefObject } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function useSceneMotion(ref: MutableRefObject<THREE.Group | null>) {
  useFrame(({ pointer }) => {
    if (!ref.current) return;

    ref.current.rotation.y = THREE.MathUtils.lerp(
      ref.current.rotation.y,
      -0.16 + pointer.x * 0.06,
      0.035,
    );

    ref.current.rotation.x = THREE.MathUtils.lerp(
      ref.current.rotation.x,
      pointer.y * 0.012,
      0.035,
    );
  });
}
