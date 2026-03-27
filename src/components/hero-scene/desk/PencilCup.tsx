import { Common3DProps } from '../types';
import PotACrayon from './PotACrayon';
import Crayon1 from './Crayon1';
import Crayon2 from './Crayon2';

export default function PencilCup({
                                      position = [0, 0, 0],
                                      rotation = [0, 0, 0],
                                  }: Common3DProps) {
    return (
        <group position={position} rotation={rotation}>
            <PotACrayon />

            <Crayon1
                position={[-0.018, 0.02, 0.002]}
                rotation={[0, 0, 0.16]}
            />

            <Crayon2
                position={[0.02, 0.02, 0.008]}
                rotation={[0, 0, -0.18]}
            />
        </group>
    );
}