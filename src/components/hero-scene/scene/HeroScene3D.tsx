import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import DeskScene from './DeskScene';
import { useResponsiveScene } from './useResponsiveScene';

export default function HeroScene3D() {
    const { isMobile, isTablet } = useResponsiveScene();

    const camera = isMobile
        ? { position: [5.9, 3.25, 9.0] as [number, number, number], fov: 30 }
        : isTablet
            ? { position: [4.8, 2.8, 7.0] as [number, number, number], fov: 31 }
            : { position: [4.0, 2.45, 6.0] as [number, number, number], fov: 27 };

    return (
        <div
            className="relative w-full h-full overflow-hidden"
            style={{
                background: 'linear-gradient(180deg, #06122f 0%, #020817 100%)',
            }}
        >
            {/* Halo bleu séparé du background */}
            <div
                className="pointer-events-none absolute inset-0"
                style={{
                    zIndex: 0,
                    background: isMobile
                        ? 'radial-gradient(circle at 62% 58%, rgba(59,130,246,0.55) 0%, rgba(37,99,235,0.30) 18%, rgba(30,64,175,0.14) 34%, rgba(2,6,23,0) 58%)'
                        : 'radial-gradient(circle at 68% 42%, rgba(59,130,246,0.40) 0%, rgba(37,99,235,0.22) 18%, rgba(30,64,175,0.10) 34%, rgba(2,6,23,0) 58%)',
                    transform: isMobile ? 'scale(1.15)' : 'scale(1)',
                    filter: isMobile ? 'blur(8px)' : 'blur(10px)',
                    opacity: isMobile ? 1 : 0.95,
                }}
            />

            <div className="relative z-10 w-full h-full">
                <Canvas
                    camera={camera}
                    gl={{
                        antialias: true,
                        alpha: true,
                        powerPreference: 'high-performance',
                    }}
                    shadows={!isMobile}
                    dpr={isMobile ? [1, 1.5] : [1, 2]}
                    style={{ background: 'transparent' }}
                >
                    <ambientLight intensity={0.22} color="#6477a8" />

                    <spotLight
                        position={[4.2, 4.8, 2.5]}
                        intensity={3.1}
                        angle={0.55}
                        penumbra={0.85}
                        distance={14}
                        decay={2}
                        color="#7dd3fc"
                        castShadow={!isMobile}
                        shadow-mapSize-width={isMobile ? 512 : 1024}
                        shadow-mapSize-height={isMobile ? 512 : 1024}
                        shadow-bias={-0.00008}
                    />

                    <pointLight
                        position={[1.6, 2.1, 2.2]}
                        intensity={0.95}
                        distance={6}
                        color="#ffd29a"
                    />

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

                    <Suspense fallback={null}>
                        <DeskScene isMobile={isMobile} isTablet={isTablet} />
                        <Environment preset="night" environmentIntensity={0.12} />
                    </Suspense>
                </Canvas>
            </div>
        </div>
    );
}