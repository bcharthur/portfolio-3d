import { RefObject, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Mouse({
  mouseGroupRef,
}: {
  mouseGroupRef: RefObject<THREE.Group | null>;
}) {
  const leftButtonRef = useRef<THREE.Mesh>(null);
  const rightButtonRef = useRef<THREE.Mesh>(null);
  const wheelRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const click = Math.max(0, Math.sin(t * 4.8 + 0.8));

    if (leftButtonRef.current) {
      leftButtonRef.current.position.y = 0.031 - click * 0.008;
    }

    if (rightButtonRef.current) {
      rightButtonRef.current.position.y = 0.031 - click * 0.003;
    }

    if (wheelRef.current) {
      wheelRef.current.rotation.x = t * 6.4;
    }
  });

  return (
    <group ref={mouseGroupRef} position={[0.015, -0.1, 0.02]}>
      <mesh rotation={[0.08, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.115, 0.046, 0.165]} />
        <meshStandardMaterial color="#d4d7df" roughness={0.36} metalness={0.08} />
      </mesh>

      <mesh position={[0, 0.014, -0.004]} rotation={[0.08, 0, 0]} castShadow>
        <boxGeometry args={[0.098, 0.014, 0.114]} />
        <meshStandardMaterial color="#eef2f7" roughness={0.28} />
      </mesh>

      <mesh ref={leftButtonRef} position={[-0.026, 0.031, 0.028]} rotation={[0.08, 0, 0]} castShadow>
        <boxGeometry args={[0.034, 0.008, 0.074]} />
        <meshStandardMaterial color="#c9ced7" />
      </mesh>

      <mesh ref={rightButtonRef} position={[0.026, 0.031, 0.028]} rotation={[0.08, 0, 0]} castShadow>
        <boxGeometry args={[0.034, 0.008, 0.074]} />
        <meshStandardMaterial color="#c9ced7" />
      </mesh>

      <mesh ref={wheelRef} position={[0, 0.034, 0.012]} rotation={[0.08, 0, 0]} castShadow>
        <cylinderGeometry args={[0.009, 0.009, 0.03, 10]} />
        <meshStandardMaterial color="#777d87" roughness={0.56} />
      </mesh>
    </group>
  );
}
