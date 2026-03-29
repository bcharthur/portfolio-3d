
import Pot from "./Pot.tsx";
import Leaf1 from "./Leaf1.tsx";
import Leaf2 from "./Leaf2.tsx";
import Leaf3 from "./Leaf3.tsx";
import {Common3DProps} from "@/components/hero-scene/types.ts";

export default function Plant({
                                  position = [0, 0, 0],
                                  rotation = [0, 0, 0],
                              }: Common3DProps) {
    return (
        <group position={position} rotation={rotation} scale={0.95}>
            <Pot />

            <Leaf1
                position={[0.02, 0.09, -0.01]}
                rotation={[0.02, 0.08, 0.02]}
                scale={1.15}
            />

            <Leaf2
                position={[0.1, 0.07, 0.02]}
                rotation={[-0.1, -0.8, -0.2]}
                scale={1.05}
            />

            <Leaf3
                position={[0.06, 0.06, 0.09]}
                rotation={[0.45, -0.2, 0.45]}
                scale={0.95}
            />

        </group>
    );
}