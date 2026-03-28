import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import DeskScene from './DeskScene';
import { useResponsiveScene } from './useResponsiveScene';

export default function HeroScene3D() {
    const { isMobile, isTablet } = useResponsiveScene();

    const camera = isMobile
        ? { position: [5.8, 3.2, 8.8] as [number, number, number], fov: 38 }
        : isTablet
            ? { position: [4.8, 2.8, 7.0] as [number, number, number], fov: 31 }
            : { position: [4.0, 2.45, 6.0] as [number, number, number], fov: 27 };

    return (
        <div className="w-full h-full">
            <Canvas
                camera={camera}
                gl={{
                    antialias: !isMobile,
                    alpha: true,
                    powerPreference: isMobile ? 'low-power' : 'high-performance',
                }}
                shadows={!isMobile}
                dpr={isMobile ? 1 : [1, 2]}
                frameloop={isMobile ? 'demand' : 'always'}
                style={{ background: 'transparent' }}
            >
                <ambientLight intensity={isMobile ? 0.35 : 0.22} color="#6477a8" />

                {!isMobile && (
                    <spotLight
                        position={[4.2, 4.8, 2.5]}
                        intensity={3.1}
                        angle={0.55}
                        penumbra={0.85}
                        distance={14}
                        decay={2}
                        color="#7dd3fc"
                        castShadow
                        shadow-mapSize-width={1024}
                        shadow-mapSize-height={1024}
                        shadow-bias={-0.00008}
                    />
                )}

                <pointLight
                    position={[1.3, 1.8, 1.4]}
                    intensity={isMobile ? 0.75 : 0.95}
                    distance={6}
                    color="#ffb86b"
                />

                {!isMobile && (
                    <>
                        <pointLight
                            position={[-2.5, 3.0, -2.8]}
                            intensity={0.38}
                            distance={10}
                            color="#60a5fa"
                        />

                        <directionalLight
                            position={[2.8, 2.6, 3.5]}
                            intensity={0.55}
                            color="#f3f7ff"
                        />
                    </>
                )}

                <Suspense fallback={null}>
                    <DeskScene isMobile={isMobile} isTablet={isTablet} />
                    {!isMobile && <Environment preset="night" environmentIntensity={0.12} />}
                </Suspense>
            </Canvas>
        </div>
    );
}
