import { forwardRef } from 'react';
import * as THREE from 'three';
import { COLORS } from '../constants';

const Tete = forwardRef<THREE.Group>(function Tete(_, ref) {
  return (
    <group ref={ref} position={[0, 1.84, -0.1]}>
      <mesh castShadow>
        <boxGeometry args={[0.42, 0.48, 0.42]} />
        <meshStandardMaterial color={COLORS.skin} />
      </mesh>

      <mesh position={[-0.23, 0, 0]} castShadow>
        <boxGeometry args={[0.06, 0.1, 0.08]} />
        <meshStandardMaterial color={COLORS.skin} />
      </mesh>
      <mesh position={[0.23, 0, 0]} castShadow>
        <boxGeometry args={[0.06, 0.1, 0.08]} />
        <meshStandardMaterial color={COLORS.skin} />
      </mesh>

      <group name="Hair">
        <mesh position={[0, 0.22, 0]} castShadow>
          <boxGeometry args={[0.42, 0.06, 0.42]} />
          <meshStandardMaterial color={COLORS.hairTop} />
        </mesh>
        <mesh position={[0, 0.26, 0]} castShadow>
          <boxGeometry args={[0.32, 0.04, 0.32]} />
          <meshStandardMaterial color={COLORS.hairTop} />
        </mesh>
        <mesh position={[0, 0.2, 0.2]} castShadow>
          <boxGeometry args={[0.38, 0.05, 0.06]} />
          <meshStandardMaterial color={COLORS.hairTop} />
        </mesh>
        <mesh position={[-0.22, 0.12, 0]} castShadow>
          <boxGeometry args={[0.04, 0.2, 0.36]} />
          <meshStandardMaterial color={COLORS.hairSide} />
        </mesh>
        <mesh position={[-0.22, -0.02, 0]} castShadow>
          <boxGeometry args={[0.03, 0.12, 0.28]} />
          <meshStandardMaterial color={COLORS.hairSide} />
        </mesh>
        <mesh position={[0.22, 0.12, 0]} castShadow>
          <boxGeometry args={[0.04, 0.2, 0.36]} />
          <meshStandardMaterial color={COLORS.hairSide} />
        </mesh>
        <mesh position={[0.22, -0.02, 0]} castShadow>
          <boxGeometry args={[0.03, 0.12, 0.28]} />
          <meshStandardMaterial color={COLORS.hairSide} />
        </mesh>
        <mesh position={[0, 0.1, -0.22]} castShadow>
          <boxGeometry args={[0.38, 0.24, 0.06]} />
          <meshStandardMaterial color={COLORS.hairTop} />
        </mesh>
      </group>
    </group>
  );
});

export default Tete;
