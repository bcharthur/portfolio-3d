import HeroScene3D from "./hero-scene";

type LaptopSceneProps = {
    onReady?: () => void;
    active?: boolean;
};

export default function LaptopScene({ onReady, active = true }: LaptopSceneProps) {
    return <HeroScene3D onReady={onReady} active={active} />;
}
