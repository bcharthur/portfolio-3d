import { RoundedBox } from '@react-three/drei';
import {
    SCREEN_TEXTURE_W,
    SCREEN_TEXTURE_H,
    SCREEN_SURFACE_Y,
    SCREEN_SURFACE_Z,
} from './monitorConstants';

export default function TextureEcranPrincipale() {
    return (
        <group position={[0, SCREEN_SURFACE_Y, SCREEN_SURFACE_Z]}>
            <RoundedBox args={[SCREEN_TEXTURE_W, SCREEN_TEXTURE_H, 0.002]}
                        radius={0.001}
                        smoothness={4}>
                <meshStandardMaterial
                    color="#2b313a"
                    roughness={1}
                    metalness={0} />
            </RoundedBox>
        </group>
    );
}