import { useEffect, useMemo } from 'react';
import * as THREE from 'three';
import {
  SCREEN_TEXTURE_H,
  SCREEN_TEXTURE_W,
  SCREEN_SURFACE_Y,
  SCREEN_SURFACE_Z,
} from './monitorConstants';

export default function ContentEcranSecondaire() {
  const video = useMemo(() => {
    const el = document.createElement('video');
    el.src = '/videos/videoplayback.mp4';
    el.crossOrigin = 'anonymous';
    el.loop = true;
    el.muted = true;
    el.playsInline = true;
    el.autoplay = true;
    return el;
  }, []);

  const videoTexture = useMemo(() => {
    const texture = new THREE.VideoTexture(video);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.format = THREE.RGBAFormat;
    return texture;
  }, [video]);

  useEffect(() => {
    video.play().catch(() => {
      console.warn('Lecture automatique bloquée par le navigateur.');
    });

    return () => {
      video.pause();
      video.src = '';
      video.load();
    };
  }, [video]);

  return (
      <group position={[0, SCREEN_SURFACE_Y, SCREEN_SURFACE_Z + 0.003]}>
        <mesh>
          <planeGeometry args={[SCREEN_TEXTURE_W - 0.02, SCREEN_TEXTURE_H - 0.02]} />
          <meshBasicMaterial map={videoTexture} toneMapped={false} />
        </mesh>
      </group>
  );
}