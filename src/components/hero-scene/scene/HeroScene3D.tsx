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
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.95} />
        <directionalLight position={[5, 8, 6]} intensity={1.15} castShadow />
        <pointLight position={[0, 2.8, 2]} intensity={0.34} color="#ffd8a8" />
        <pointLight position={[0.8, 2.2, -1.4]} intensity={0.3} color="#9db4ff" />

        <DeskScene />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
