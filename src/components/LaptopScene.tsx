import HeroScene3D from "./hero-scene";

type LaptopSceneProps = {
    onReady?: () => void;
};

export default function LaptopScene({ onReady }: LaptopSceneProps) {
    return <HeroScene3D onReady={onReady} />;
}