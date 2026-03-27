import { RoundedBox } from '@react-three/drei';
import {
    SCREEN_TEXTURE_W,
    SCREEN_TEXTURE_H,
    SCREEN_SURFACE_Y,
    SCREEN_SURFACE_Z,
} from './MonitorShell';

export default function TextureEcranSecondaire() {
    return (
        <group position={[0, SCREEN_SURFACE_Y, SCREEN_SURFACE_Z]}>
            <RoundedBox args={[SCREEN_TEXTURE_W, SCREEN_TEXTURE_H, 0.002]} radius={0.02} smoothness={4}>
                <meshStandardMaterial color="#343b46" roughness={1} metalness={0} />
            </RoundedBox>
        </group>
    );
}