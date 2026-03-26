import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import DeskScene from "./DeskScene";

export default function LaptopScene() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [5.15, 2.9, 7.2], fov: 24 }}
        gl={{ antialias: true, alpha: true }}
        shadows
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={1.05} />
        <directionalLight position={[5, 8, 5]} intensity={1.25} castShadow />
        <pointLight position={[1.5, 2.4, 2.4]} intensity={0.28} color="#ffd8a8" />
        <pointLight position={[-0.6, 2.3, -1.2]} intensity={0.24} color="#9db4ff" />

        <DeskScene />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
