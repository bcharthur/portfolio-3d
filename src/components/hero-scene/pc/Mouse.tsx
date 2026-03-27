import { forwardRef } from 'react';
import * as THREE from 'three';
import { RoundedBox } from '@react-three/drei';
import { Common3DProps } from '../types';

const Mouse = forwardRef<THREE.Group, Common3DProps>(function Mouse(
    { position = [0, 0, 0], rotation = [0, 0, 0] },
    ref,
) {
    return (
        <group ref={ref} position={position} rotation={rotation}>
            {/* Corps principal */}
            <RoundedBox
                args={[0.10, 0.05, 0.145]}
                radius={0.02}
                smoothness={6}
                rotation={[0.18, 0, 0]}
                castShadow
                receiveShadow
            >
                <meshStandardMaterial color="#cfd4dc" roughness={0.38} metalness={0.08} />
            </RoundedBox>

            {/* Fente centrale avant */}
            <mesh position={[0, 0.018, 0.012]} rotation={[0.18, 0, 0]}>
                <boxGeometry args={[0.008, 0.003, 0.065]} />
                <meshStandardMaterial color="#a7afbb" roughness={0.5} metalness={0.02} />
            </mesh>

            {/* Petite séparation en haut pour marquer les deux boutons */}
            <mesh position={[0, 0.0185, 0.04]} rotation={[0.18, 0, 0]}>
                <boxGeometry args={[0.006, 0.0025, 0.028]} />
                <meshStandardMaterial color="#101113" roughness={0.5} metalness={0.02} />
            </mesh>

            {/* Roulette */}
            <mesh position={[0, 0.021, 0.02]} rotation={[0.18, 0, 0]}>
                <cylinderGeometry args={[0.008, 0.008, 0.018, 18]} />
                <meshStandardMaterial color="#8f97a3" roughness={0.55} metalness={0.12} />
            </mesh>
        </group>
    );
});

export default Mouse;