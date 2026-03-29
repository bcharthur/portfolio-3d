import { useRef } from 'react';
import * as THREE from 'three';
import { useSceneMotion } from '../animations/useSceneMotion';
import { useParallaxMouse } from '../animations/useParallaxMouse';
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
import Plant from '../environment/Plant/Plant.tsx';
import Desk from '@/components/hero-scene/desk/Desk.tsx';

type DeskSceneProps = {
    isMobile?: boolean;
    isTablet?: boolean;
};

export default function DeskScene({
    isMobile = false,
    isTablet = false,
}: DeskSceneProps) {
    const groupRef = useRef<THREE.Group>(null);
    const mouseRef = useParallaxMouse(isMobile);

    if (!isMobile) {
        useSceneMotion(groupRef, mouseRef, { isMobile, isTablet });
    }

    const basePosition: [number, number, number] = isMobile
        ? [-0.25, -0.6, 0.5]
        : isTablet
            ? [0.78, -1.58, 0]
            : [0.72, -1.5, 0];

    const baseRotation: [number, number, number] = isMobile
        ? [0, -0.08, 0]
        : [-0.02, -0.18, 0];

    const baseScale = isMobile ? 0.88 : isTablet ? 0.93 : 1;

    const staticMobilePosition: [number, number, number] = [-0.5, -2.5, 0];
    const staticMobileRotation: [number, number, number] = [0, -0.06, 0];

    return (
        <group
            ref={groupRef}
            position={isMobile ? staticMobilePosition : basePosition}
            rotation={isMobile ? staticMobileRotation : baseRotation}
            scale={baseScale}
        >
            <Rug position={[-0.2, 0, 0.2]} rotation={[0, 0, 0]} />

            <Desk position={[-0.8, -0.2, -1.6]} rotation={[0, 0, 0]} length={2} width={0.8} />
            <Desk
                position={[-0.6, -0.2, -1.6]}
                rotation={[0, Math.PI * 1.5, 0]}
                length={1.2}
                width={0.8}
                hideLegs={[0, 2]}
            />

            <EcranPrincipal position={[0.5, 0.7, -1.2]} rotation={[-0.2, 0, 0]} screenYOffset={0.3} />
            <EcranSecondaire position={[-0.7, 0.7, -1]} rotation={[-0.2, 0.3, 0.1]} screenYOffset={0.3} />

            <Keyboard position={[-0.2, 0.7, -0.9]} rotation={[0, 0, 0]} />
            <Mouse position={[0.3, 0.7, -0.9]} rotation={[0.3, 3, 0]} />
            <Mug position={[1, 0.7, -0.98]} rotation={[0, 0.5, 0]} />
            <PencilCup position={[-1.2, 0.7, -0.6]} rotation={[0, 0, 0]} />

            <Chair position={[0.1, 0, -0.3]} rotation={[0, -3, 0]} />

            <WallShelf position={[-1.3, 2.1, -1.3]} rotation={[0, 0, 0]} />
            <WallBoard position={[0.2, 2.4, -1.3]} rotation={[0, 0, 0]} />
            <WallClock position={[1.3, 2.0, -1.3]} />
            <Plant position={[1.5, 0.18, -1.5]} rotation={[0, 0, 0]} />
        </group>
    );
}
