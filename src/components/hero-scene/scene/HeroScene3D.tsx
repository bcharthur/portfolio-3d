import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import DeskScene from './DeskScene';
import { useResponsiveScene } from './useResponsiveScene';

export default function HeroScene3D() {
    const { isMobile, isTablet } = useResponsiveScene();

    const camera = isMobile
        ? { position: [5.9, 3.25, 9.0] as [number, number, number], fov: 25 }
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
                    powerPreference: isMobile ? "low-power" : "high-performance",
                }}
                shadows={!isMobile}
                dpr={isMobile ? 1 : [1, 2]}
                style={{ background: "transparent" }}
            >
                <ambientLight
                    intensity={isMobile ? 0.9 : 0.22}
                    color={isMobile ? "#b8d4ff" : "#6477a8"}
                />

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
                    position={[1.6, 2.1, 2.2]}
                    intensity={isMobile ? 1.55 : 0.95}
                    distance={isMobile ? 8 : 6}
                    color="#ffd29a"
                />

                {isMobile && (
                    <>
                        <pointLight
                            position={[-2.8, 3.2, 1.8]}
                            intensity={0.95}
                            distance={9}
                            color="#8fd3ff"
                        />
                        <directionalLight
                            position={[3.8, 4.8, 4.2]}
                            intensity={0.8}
                            color="#eef6ff"
                        />
                    </>
                )}

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