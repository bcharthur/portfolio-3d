import { useEffect } from "react";
import { useProgress } from "@react-three/drei";

type SceneLoaderProps = {
    onReady: () => void;
    onProgress: (value: number) => void;
};

export default function SceneLoader({
                                        onReady,
                                        onProgress,
                                    }: SceneLoaderProps) {
    const { progress, active } = useProgress();

    useEffect(() => {
        onProgress(progress);
    }, [progress, onProgress]);

    useEffect(() => {
        if (!active && progress >= 100) {
            const timeout = setTimeout(() => {
                onReady();
            }, 250);

            return () => clearTimeout(timeout);
        }
    }, [active, progress, onReady]);

    return null;
}