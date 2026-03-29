import Pot from './Pot.tsx';
import Leaf1 from './Leaf1.tsx';
import Leaf2 from './Leaf2.tsx';
import Leaf3 from './Leaf3.tsx';
import { Common3DProps } from './Plant.types.ts';

export default function Plant({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
}: Common3DProps) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      <Pot />

      {/* cluster leaves from the soil, spread and readable */}
      <Leaf1 position={[0.05, 0.075, -0.015]} rotation={[0.12, -0.18, 0.62]} scale={1.05} />
      <Leaf2 position={[-0.045, 0.075, 0.015]} rotation={[0.06, 0.22, -0.72]} scale={0.98} />
      <Leaf3 position={[0.0, 0.08, 0.025]} rotation={[-0.08, 0.05, 0.02]} scale={1.1} />

      {/* small back leaf to avoid the "3 stems only" look */}
      <Leaf2 position={[0.015, 0.07, -0.04]} rotation={[0.25, -0.4, 0.18]} scale={0.78} />
    </group>
  );
}
