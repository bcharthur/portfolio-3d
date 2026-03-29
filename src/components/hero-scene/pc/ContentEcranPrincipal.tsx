import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import {
  SCREEN_TEXTURE_H,
  SCREEN_TEXTURE_W,
  SCREEN_SURFACE_Y,
  SCREEN_SURFACE_Z,
} from './monitorConstants';

export default function ContentEcranPrincipal() {
    const texture = useLoader(
        THREE.TextureLoader,
        `${import.meta.env.BASE_URL}images/kali.jpg`
    );

  // texture.flipY = false;

  return (
      <group position={[0, SCREEN_SURFACE_Y, SCREEN_SURFACE_Z + 0.003]}>
        <mesh>
          <planeGeometry args={[SCREEN_TEXTURE_W - 0.02, SCREEN_TEXTURE_H - 0.02]} />
          <meshBasicMaterial map={texture} toneMapped={false} />
        </mesh>
      </group>
  );
}