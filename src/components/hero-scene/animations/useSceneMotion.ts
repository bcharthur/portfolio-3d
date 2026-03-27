import { MutableRefObject } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

type MouseRef = MutableRefObject<{ x: number; y: number }>;

export function useSceneMotion(
    ref: MutableRefObject<THREE.Group | null>,
    mouse: MouseRef
) {
  useFrame(() => {
    if (!ref.current) return;

    const x = mouse.current.x;
    const y = mouse.current.y;

    const targetRotY = -0.18 + x * 0.07;
    const targetRotX = -0.02 + y * 0.025;
    const targetPosX = 0.72 + x * 0.08;
    const targetPosY = -1.5 + y * 0.035;

    ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, targetRotY, 0.04);
    ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, targetRotX, 0.04);

    ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, targetPosX, 0.03);
    ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, targetPosY, 0.03);
  });
}