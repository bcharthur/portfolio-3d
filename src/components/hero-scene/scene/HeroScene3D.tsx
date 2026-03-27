import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import DeskScene from './DeskScene';

export default function HeroScene3D() {
    return (
        <div className="w-full h-full">
            <Canvas
                camera={{ position: [4.0, 2.45, 6.0], fov: 27 }}
                gl={{ antialias: true, alpha: true }}
                shadows
                dpr={[1, 2]}
                style={{ background: 'transparent' }}
            >
                {/* Ambiance générale un peu remontée */}
                <ambientLight intensity={0.22} color="#6477a8" />

                {/* Lumière principale froide venant du haut/droite */}
                <spotLight
                    position={[4.2, 4.8, 2.5]}
                    intensity={5}
                    angle={0.55}
                    penumbra={0.85}
                    distance={14}
                    decay={2}
                    color="#7dd3fc"
                    castShadow
                    shadow-mapSize-width={2048}
                    shadow-mapSize-height={2048}
                    shadow-bias={-0.00008}
                />

                {/* Lumière chaude locale sur le bureau */}
                <pointLight
                    position={[1.3, 1.8, 1.4]}
                    intensity={0.95}
                    distance={6}
                    color="#ffb86b"
                />

                {/* Contre-jour / contour */}
                <pointLight
                    position={[-2.5, 3.0, -2.8]}
                    intensity={0.38}
                    distance={10}
                    color="#60a5fa"
                />

                {/* Lumière douce frontale pour éclaircir les objets */}
                <directionalLight
                    position={[2.8, 2.6, 3.5]}
                    intensity={0.55}
                    color="#f3f7ff"
                />

                <Suspense fallback={null}>
                    <DeskScene />
                    <Environment preset="night" environmentIntensity={0.12} />
                </Suspense>
            </Canvas>
        </div>
    );
}