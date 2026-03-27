import { Decal, useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useMemo, useRef } from 'react';
import { Common3DProps } from '../types';

type SteamParticle = {
    x: number;
    z: number;
    speed: number;
    offset: number;
    scale: number;
};

export default function Mug({
                                position = [0, 0, 0],
                                rotation = [0, 0, 0],
                            }: Common3DProps) {
    const logo = useTexture(`${import.meta.env.BASE_URL}textures/rootme-logo.png`)
    const steamGroupRef = useRef<THREE.Group>(null);

    logo.wrapS = THREE.ClampToEdgeWrapping;
    logo.wrapT = THREE.ClampToEdgeWrapping;
    logo.anisotropy = 8;

    const steamParticles = useMemo<SteamParticle[]>(
        () => [
            { x: -0.018, z: 0.0, speed: 0.55, offset: 0.0, scale: 0.028 },
            { x: 0.0, z: 0.012, speed: 0.62, offset: 0.9, scale: 0.032 },
            { x: 0.02, z: -0.008, speed: 0.58, offset: 1.8, scale: 0.027 },
            { x: -0.01, z: -0.014, speed: 0.66, offset: 2.5, scale: 0.026 },
            { x: 0.014, z: 0.006, speed: 0.52, offset: 3.1, scale: 0.03 },
        ],
        []
    );

    useFrame(({ clock }) => {
        if (!steamGroupRef.current) return;

        const t = clock.getElapsedTime();
        const children = steamGroupRef.current.children;

        children.forEach((child, i) => {
            const cfg = steamParticles[i];
            const cycle = (t * cfg.speed + cfg.offset) % 1;
            const y = 0.17 + cycle * 0.16;

            child.position.x = cfg.x + Math.sin(t * 1.4 + cfg.offset) * 0.01 * cycle;
            child.position.y = y;
            child.position.z = cfg.z + Math.cos(t * 1.1 + cfg.offset) * 0.006 * cycle;

            const s = cfg.scale * (0.7 + cycle * 1.1);
            child.scale.setScalar(s);

            const material = (child as THREE.Mesh).material as THREE.MeshStandardMaterial;
            material.opacity = Math.max(0, 0.16 * (1 - cycle));
        });
    });

    return (
        <group position={position} rotation={rotation} scale={1.12}>
            {/* Corps extérieur blanc */}
            <mesh castShadow receiveShadow position={[0, 0.07, 0]}>
                <cylinderGeometry args={[0.08, 0.075, 0.14, 64]} />
                <meshStandardMaterial
                    color="#ffffff"
                    roughness={0.28}
                    metalness={0.03}
                />

                {/* Logo */}
                <Decal
                    position={[0, 0.005, 0.1]}
                    rotation={[0, 0, 0]}
                    scale={[0.20, 0.12, 0.12]}
                >
                    <meshStandardMaterial
                        map={logo}
                        transparent
                        alphaTest={0.08}
                        polygonOffset
                        polygonOffsetFactor={-2}
                        toneMapped={false}
                        color="#111111"
                    />
                </Decal>
            </mesh>

            {/* Fond extérieur */}
            <mesh castShadow receiveShadow position={[0, 0.005, 0]}>
                <cylinderGeometry args={[0.055, 0.06, 0.01, 64]} />
                <meshStandardMaterial
                    color="#f3f3f3"
                    roughness={0.35}
                    metalness={0.02}
                />
            </mesh>

            {/* Paroi intérieure noire */}
            <mesh castShadow receiveShadow position={[0, 0.075, 0]}>
                <cylinderGeometry args={[0.068, 0.064, 0.12, 64, 1, true]} />
                <meshStandardMaterial
                    color="#111111"
                    roughness={0.22}
                    metalness={0.1}
                    side={THREE.DoubleSide}
                />
            </mesh>

            {/* Fond intérieur noir */}
            <mesh castShadow receiveShadow position={[0, 0.016, 0]}>
                <cylinderGeometry args={[0.064, 0.064, 0.008, 64]} />
                <meshStandardMaterial
                    color="#111111"
                    roughness={0.22}
                    metalness={0.1}
                />
            </mesh>

            {/* Café */}
            <mesh receiveShadow position={[0, 0.135, 0]}>
                <cylinderGeometry args={[0.066, 0.066, 0.012, 48]} />
                <meshStandardMaterial
                    color="#4b2e1f"
                    roughness={0.5}
                    metalness={0.02}
                />
            </mesh>

            {/* Léger reflet du café */}
            <mesh position={[0.012, 0.1245, 0.008]}>
                <cylinderGeometry args={[0.015, 0.015, 0.002, 24]} />
                <meshStandardMaterial
                    color="#6b4632"
                    roughness={0.2}
                    metalness={0.04}
                />
            </mesh>

            {/* Rebord noir */}
            <mesh
                castShadow
                receiveShadow
                position={[0, 0.14, 0]}
                rotation={[Math.PI / 2, 0, 0]}
            >
                <torusGeometry args={[0.074, 0.0075, 24, 96]} />
                <meshStandardMaterial
                    color="#111111"
                    roughness={0.24}
                    metalness={0.1}
                />
            </mesh>

            {/* Anse complète noire */}
            <mesh
                castShadow
                receiveShadow
                position={[0.08, 0.075, 0]}
                rotation={[0, 0, Math.PI / 2]}
            >
                <torusGeometry args={[0.05, 0.012, 24, 96, Math.PI * 2]} />
                <meshStandardMaterial
                    color="#111111"
                    roughness={0.24}
                    metalness={0.1}
                />
            </mesh>

            {/* Fumée légère */}
            <group ref={steamGroupRef}>
                {steamParticles.map((particle, i) => (
                    <mesh
                        key={i}
                        position={[particle.x, 0.18, particle.z]}
                        renderOrder={10}
                    >
                        <planeGeometry args={[1, 1.6]}/>
                        <meshStandardMaterial
                            color="#ffffff"
                            transparent
                            opacity={0.12}
                            roughness={1}
                            metalness={0}
                            depthWrite={false}
                        />
                    </mesh>
                ))}
            </group>
        </group>
    );
}