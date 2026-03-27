import { MutableRefObject } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

type MouseRef = MutableRefObject<{ x: number; y: number }>;

type MotionOptions = {
  isMobile?: boolean;
  isTablet?: boolean;
};

export function useSceneMotion(
    ref: MutableRefObject<THREE.Group | null>,
    mouse: MouseRef,
    { isMobile = false, isTablet = false }: MotionOptions = {}
) {
  useFrame(() => {
    if (!ref.current) return;

    const x = mouse.current.x;
    const y = mouse.current.y;

    const baseRotY = isMobile ? -0.04 : -0.18;
    const baseRotX = isMobile ? 0 : -0.02;

    const basePosX = isMobile ? -0.20 : isTablet ? 0.78 : 0.72;
    const basePosY = isMobile ? -2.3 : isTablet ? -1.58 : -1.5;

    const rotFactorY = isMobile ? 0.05 : isTablet ? 0.07 : 0.1;
    const rotFactorX = isMobile ? 0.02 : isTablet ? 0.03 : 0.04;

    const posFactorX = isMobile ? 0.06 : isTablet ? 0.08 : 0.12;
    const posFactorY = isMobile ? 0.03 : isTablet ? 0.035 : 0.05;

    const targetRotY = baseRotY + x * rotFactorY;
    const targetRotX = baseRotX + y * rotFactorX;
    const targetPosX = basePosX + x * posFactorX;
    const targetPosY = basePosY + y * posFactorY;

    ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, targetRotY, 0.04);
    ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, targetRotX, 0.04);
    ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, targetPosX, 0.03);
    ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, targetPosY, 0.03);
  });
}