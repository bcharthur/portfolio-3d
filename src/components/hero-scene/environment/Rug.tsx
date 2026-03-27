import { Common3DProps } from '../types';
import * as THREE from 'three';
import { useMemo } from 'react';

function createRoundedRectShape(width: number, height: number, radius: number) {
    const w = width / 2;
    const h = height / 2;
    const r = Math.min(radius, w, h);

    const shape = new THREE.Shape();

    shape.moveTo(-w + r, -h);
    shape.lineTo(w - r, -h);
    shape.quadraticCurveTo(w, -h, w, -h + r);
    shape.lineTo(w, h - r);
    shape.quadraticCurveTo(w, h, w - r, h);
    shape.lineTo(-w + r, h);
    shape.quadraticCurveTo(-w, h, -w, h - r);
    shape.lineTo(-w, -h + r);
    shape.quadraticCurveTo(-w, -h, -w + r, -h);

    return shape;
}

function RugLayer({
                      width,
                      height,
                      radius,
                      color,
                      y = 0,
                  }: {
    width: number;
    height: number;
    radius: number;
    color: string;
    y?: number;
}) {
    const geometry = useMemo(() => {
        const shape = createRoundedRectShape(width, height, radius);
        return new THREE.ShapeGeometry(shape, 24);
    }, [width, height, radius]);

    return (
        <mesh
            geometry={geometry}
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, y, 0]}
            receiveShadow
        >
            <meshStandardMaterial color={color} roughness={1} />
        </mesh>
    );
}

export default function Rug({
                                position = [0, 0, 0],
                                rotation = [0, 0, 0],
                            }: Common3DProps) {
    return (
        <group position={position} rotation={rotation}>
            {/* Base du tapis */}
            <RugLayer
                width={3.45}
                height={2.45}
                radius={0.22}
                color="#e8a52f"
                y={0}
            />

            {/* Bande extérieure claire */}
            <RugLayer
                width={2.75}
                height={1.9}
                radius={0.18}
                color="#f0dd79"
                y={0.002}
            />

            {/* Centre */}
            <RugLayer
                width={1.95}
                height={1.15}
                radius={0.14}
                color="#e9e5b1"
                y={0.004}
            />
        </group>
    );
}