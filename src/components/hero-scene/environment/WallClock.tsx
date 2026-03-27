import { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Common3DProps } from '../types';

export default function WallClock({ position = [0, 0, 0] }: Common3DProps) {
    const hourRef = useRef<THREE.Group>(null);
    const minuteRef = useRef<THREE.Group>(null);
    const secondRef = useRef<THREE.Group>(null);

    useFrame(() => {
        const now = new Date();

        const hours = now.getHours() % 12;
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        const milliseconds = now.getMilliseconds();

        const smoothSeconds = seconds + milliseconds / 1000;
        const smoothMinutes = minutes + smoothSeconds / 60;
        const smoothHours = hours + smoothMinutes / 60;

        if (hourRef.current) {
            hourRef.current.rotation.z = -((smoothHours / 12) * Math.PI * 2);
        }

        if (minuteRef.current) {
            minuteRef.current.rotation.z = -((smoothMinutes / 60) * Math.PI * 2);
        }

        if (secondRef.current) {
            secondRef.current.rotation.z = -((smoothSeconds / 60) * Math.PI * 2);
        }
    });

    return (
        <group position={position}>
            <mesh castShadow receiveShadow rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.22, 0.22, 0.05, 32]} />
                <meshStandardMaterial color="#f2e6d7" roughness={0.9} />
            </mesh>

            <mesh position={[0, 0, 0.026]}>
                <circleGeometry args={[0.18, 32]} />
                <meshStandardMaterial color="#fffaf4" roughness={0.96} />
            </mesh>

            {Array.from({ length: 12 }).map((_, i) => {
                const angle = (i / 12) * Math.PI * 2;
                const r = 0.14;

                return (
                    <mesh
                        key={i}
                        position={[
                            Math.sin(angle) * r,
                            Math.cos(angle) * r,
                            0.03,
                        ]}
                        rotation={[0, 0, -angle]}
                    >
                        <boxGeometry args={[0.012, i % 3 === 0 ? 0.03 : 0.02, 0.008]} />
                        <meshStandardMaterial color="#555" />
                    </mesh>
                );
            })}

            <group ref={hourRef} position={[0, 0, 0.035]}>
                <mesh position={[0, 0.045 / 2, 0]}>
                    <boxGeometry args={[0.014, 0.09, 0.01]} />
                    <meshStandardMaterial color="#1f1f1f" />
                </mesh>
            </group>

            <group ref={minuteRef} position={[0, 0, 0.04]}>
                <mesh position={[0, 0.065 / 2, 0]}>
                    <boxGeometry args={[0.008, 0.13, 0.008]} />
                    <meshStandardMaterial color="#333" />
                </mesh>
            </group>

            <group ref={secondRef} position={[0, 0, 0.045]}>
                <mesh position={[0, 0.08 / 2, 0]}>
                    <boxGeometry args={[0.004, 0.16, 0.004]} />
                    <meshStandardMaterial color="#c0392b" />
                </mesh>
            </group>

            <mesh position={[0, 0, 0.05]}>
                <cylinderGeometry args={[0.014, 0.014, 0.015, 12]} />
                <meshStandardMaterial color="#c0392b" />
            </mesh>
        </group>
    );
}