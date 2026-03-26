import { forwardRef } from 'react';
import * as THREE from 'three';
import { COLORS } from '../constants';

const MainDroite = forwardRef<THREE.Group>(function MainDroite(_, ref) {
  return (
    <group ref={ref} position={[-0.12, -0.4, 0.24]}>
      <mesh castShadow>
        <boxGeometry args={[0.14, 0.14, 0.16]} />
        <meshStandardMaterial color={COLORS.skin} />
      </mesh>
      {[-0.045, -0.015, 0.018, 0.05].map((x, i) => (
        <mesh key={i} position={[x, -0.02, 0.09]} rotation={[0.5, 0, 0]} castShadow>
          <boxGeometry args={[0.025, 0.06, 0.035]} />
          <meshStandardMaterial color={COLORS.skin} />
        </mesh>
      ))}
    </group>
  );
});

export default MainDroite;
