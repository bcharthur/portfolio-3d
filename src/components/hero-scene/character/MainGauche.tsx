import { forwardRef } from 'react';
import * as THREE from 'three';
import { COLORS } from '../constants';

const MainGauche = forwardRef<THREE.Group>(function MainGauche(_, ref) {
  return (
    <group ref={ref} position={[-0.03, -0.4, 0.18]}>
      <mesh castShadow>
        <boxGeometry args={[0.14, 0.14, 0.16]} />
        <meshStandardMaterial color={COLORS.skin} />
      </mesh>
      {[-0.05, -0.015, 0.02, 0.055].map((x, i) => (
        <mesh key={i} position={[x, -0.08, 0.02]} rotation={[0.4, 0, 0]} castShadow>
          <boxGeometry args={[0.025, 0.06, 0.04]} />
          <meshStandardMaterial color={COLORS.skin} />
        </mesh>
      ))}
    </group>
  );
});

export default MainGauche;
