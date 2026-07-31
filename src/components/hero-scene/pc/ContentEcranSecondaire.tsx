import { useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { getHeroVideoUrl } from '@/lib/media';
import {
  SCREEN_TEXTURE_H,
  SCREEN_TEXTURE_W,
  SCREEN_SURFACE_Y,
  SCREEN_SURFACE_Z,
} from './monitorConstants';

export default function ContentEcranSecondaire() {
  const video = useMemo(() => {
    const el = document.createElement('video');
    el.src = getHeroVideoUrl();
    el.crossOrigin = 'anonymous';
    el.loop = true;
    el.muted = true;
    el.defaultMuted = true;
    el.playsInline = true;
    el.preload = 'auto';
    el.autoplay = true;
    // Safari refuses to decode/play <video> elements that aren't attached to
    // the DOM. Attach it, but keep it fully out of the visible layout.
    el.style.position = 'fixed';
    el.style.width = '1px';
    el.style.height = '1px';
    el.style.opacity = '0';
    el.style.pointerEvents = 'none';
    el.setAttribute('muted', '');
    el.setAttribute('playsinline', '');
    el.setAttribute('webkit-playsinline', '');
    el.tabIndex = -1;
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
    document.body.appendChild(video);

    const tryPlay = () => {
      video.play().catch(() => {
        console.warn('Lecture automatique bloquée par le navigateur.');
      });
    };

    tryPlay();

    // Safari sometimes still refuses the initial programmatic play() (Low
    // Power Mode, strict autoplay settings): retry on the first gesture.
    const onFirstInteraction = () => tryPlay();
    window.addEventListener('pointerdown', onFirstInteraction, { once: true });
    window.addEventListener('touchstart', onFirstInteraction, { once: true });
    window.addEventListener('keydown', onFirstInteraction, { once: true });

    // Backgrounded tabs gain nothing from a decoder running behind a scene
    // that isn't even being rendered — stop wasting CPU/battery on it.
    const onVisibilityChange = () => {
      if (document.hidden) {
        video.pause();
      } else {
        tryPlay();
      }
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      window.removeEventListener('pointerdown', onFirstInteraction);
      window.removeEventListener('touchstart', onFirstInteraction);
      window.removeEventListener('keydown', onFirstInteraction);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      video.pause();
      video.src = '';
      video.load();
      video.remove();
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
