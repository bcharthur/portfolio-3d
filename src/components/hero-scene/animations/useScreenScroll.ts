import { MutableRefObject } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function useScreenScroll(ref: MutableRefObject<THREE.Group | null>, speed = 0.55) {
  useFrame(({ clock }) => {
    const group = ref.current;
    if (!group) return;

    const t = clock.getElapsedTime() * speed;
    const phase = (Math.sin(t) + 1) / 2;
    group.position.y = THREE.MathUtils.lerp(-0.06, 0.06, phase);
  });
}