import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";

type Vec3 = [number, number, number];

function Person({
  position,
  rotation = [0, 0, 0],
}: {
  position: Vec3;
  rotation?: Vec3;
}) {
  const bodyRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Mesh>(null);
  const leftUpperArmRef = useRef<THREE.Group>(null);
  const rightUpperArmRef = useRef<THREE.Group>(null);
  const leftForearmRef = useRef<THREE.Group>(null);
  const rightForearmRef = useRef<THREE.Group>(null);
  // Ref for the right hand/wrist group (holds mouse)
  const rightHandRef = useRef<THREE.Group>(null);
  // Ref for the mouse itself to move with hand
  const mouseGroupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    if (bodyRef.current) {
      bodyRef.current.position.y = position[1] + Math.sin(t * 2.3) * 0.018;
      bodyRef.current.rotation.z = Math.sin(t * 1.5) * 0.01;
    }

    if (headRef.current) {
      headRef.current.rotation.x = 0.06 + Math.sin(t * 1.7) * 0.01;
      headRef.current.rotation.y = Math.sin(t * 1.2) * 0.018;
    }

    // Left arm: types on keyboard — small rapid finger/wrist taps
    if (leftUpperArmRef.current) {
      leftUpperArmRef.current.rotation.x = -1.42 + Math.sin(t * 6.5) * 0.025;
      leftUpperArmRef.current.rotation.z = 0.22 + Math.sin(t * 4.2) * 0.01;
    }
    if (leftForearmRef.current) {
      // Forearm angled down toward keyboard, small up-down tapping motion
      leftForearmRef.current.rotation.x = -0.72 + Math.sin(t * 9.1) * 0.055;
      leftForearmRef.current.rotation.z = Math.sin(t * 7.3) * 0.018;
    }

    // Right arm: holds and moves mouse
    if (rightUpperArmRef.current) {
      // Slow lateral sweep simulating mouse movement
      rightUpperArmRef.current.rotation.x = -1.28 + Math.sin(t * 1.8) * 0.04;
      rightUpperArmRef.current.rotation.z = -0.22 + Math.cos(t * 2.1) * 0.03;
    }
    if (rightForearmRef.current) {
      rightForearmRef.current.rotation.x = -0.82 + Math.sin(t * 1.8) * 0.035;
    }

    // Right hand wrist subtle roll while mousing
    if (rightHandRef.current) {
      rightHandRef.current.rotation.z = Math.sin(t * 1.8) * 0.04;
    }

    // Move mouse in sync with right arm
    if (mouseGroupRef.current) {
      mouseGroupRef.current.position.x = Math.sin(t * 1.8) * 0.018;
      mouseGroupRef.current.position.z = Math.cos(t * 2.1) * 0.012;
    }
  });

  const skin = "#d7b187";
  const shirt = "#1d2438";
  const pants = "#0f1726";
  // Degradé hair: dark on top, slightly lighter sides
  const hairTop = "#0a0e17";
  const hairSide = "#1a1f2e"; // slightly lighter for fade effect

  return (
    <group ref={bodyRef} position={position} rotation={rotation}>
      {/* Legs */}
      <mesh position={[-0.16, 0.28, 0.05]} castShadow>
        <boxGeometry args={[0.22, 0.6, 0.22]} />
        <meshStandardMaterial color={pants} />
      </mesh>
      <mesh position={[0.16, 0.28, 0.05]} castShadow>
        <boxGeometry args={[0.22, 0.6, 0.22]} />
        <meshStandardMaterial color={pants} />
      </mesh>

      {/* Pelvis/hips */}
      <mesh position={[0, 0.72, 0.02]} castShadow>
        <boxGeometry args={[0.58, 0.34, 0.28]} />
        <meshStandardMaterial color={pants} />
      </mesh>

      {/* Torso */}
      <mesh position={[0, 1.14, -0.04]} castShadow>
        <boxGeometry args={[0.8, 0.86, 0.44]} />
        <meshStandardMaterial color={shirt} />
      </mesh>

      {/* Collar/back of shirt */}
      <mesh position={[0, 1.36, -0.24]} castShadow>
        <boxGeometry args={[0.76, 0.32, 0.1]} />
        <meshStandardMaterial color={shirt} />
      </mesh>

      {/* Neck */}
      <mesh position={[0, 1.6, -0.1]} castShadow>
        <boxGeometry args={[0.18, 0.22, 0.18]} />
        <meshStandardMaterial color={skin} />
      </mesh>

      {/* Head */}
      <mesh ref={headRef} position={[0, 1.84, -0.1]} castShadow>
        <boxGeometry args={[0.42, 0.48, 0.42]} />
        <meshStandardMaterial color={skin} />
      </mesh>

      {/* Ears */}
      <mesh position={[-0.23, 1.84, -0.1]} castShadow>
        <boxGeometry args={[0.06, 0.1, 0.08]} />
        <meshStandardMaterial color={skin} />
      </mesh>
      <mesh position={[0.23, 1.84, -0.1]} castShadow>
        <boxGeometry args={[0.06, 0.1, 0.08]} />
        <meshStandardMaterial color={skin} />
      </mesh>

      {/* === HAIR — short fade/dégradé cut === */}
      {/* Top flat layer — tight crop */}
      <mesh position={[0, 2.06, -0.1]} castShadow>
        <boxGeometry args={[0.42, 0.06, 0.42]} />
        <meshStandardMaterial color={hairTop} />
      </mesh>

      {/* Slight volume on top center */}
      <mesh position={[0, 2.1, -0.1]} castShadow>
        <boxGeometry args={[0.32, 0.04, 0.32]} />
        <meshStandardMaterial color={hairTop} />
      </mesh>

      {/* Front hairline — small overhang */}
      <mesh position={[0, 2.04, 0.1]} castShadow>
        <boxGeometry args={[0.38, 0.05, 0.06]} />
        <meshStandardMaterial color={hairTop} />
      </mesh>

      {/* Left side — faded (thinner, slightly lighter) */}
      <mesh position={[-0.22, 1.96, -0.1]} castShadow>
        <boxGeometry args={[0.04, 0.2, 0.36]} />
        <meshStandardMaterial color={hairSide} />
      </mesh>
      {/* Left side lower fade — very thin */}
      <mesh position={[-0.22, 1.82, -0.1]} castShadow>
        <boxGeometry args={[0.03, 0.12, 0.28]} />
        <meshStandardMaterial color={hairSide} />
      </mesh>

      {/* Right side — faded */}
      <mesh position={[0.22, 1.96, -0.1]} castShadow>
        <boxGeometry args={[0.04, 0.2, 0.36]} />
        <meshStandardMaterial color={hairSide} />
      </mesh>
      {/* Right side lower fade — very thin */}
      <mesh position={[0.22, 1.82, -0.1]} castShadow>
        <boxGeometry args={[0.03, 0.12, 0.28]} />
        <meshStandardMaterial color={hairSide} />
      </mesh>

      {/* Back of head hair */}
      <mesh position={[0, 1.94, -0.32]} castShadow>
        <boxGeometry args={[0.38, 0.24, 0.06]} />
        <meshStandardMaterial color={hairTop} />
      </mesh>

      {/* === LEFT ARM — typing on keyboard === */}
      <group
        ref={leftUpperArmRef}
        position={[-0.44, 1.32, 0.02]}
        rotation={[-1.42, 0, 0.22]}
      >
        <mesh position={[0, -0.2, 0]} castShadow>
          <boxGeometry args={[0.16, 0.46, 0.16]} />
          <meshStandardMaterial color={shirt} />
        </mesh>
        <group
          ref={leftForearmRef}
          position={[0, -0.42, 0.06]}
          rotation={[-0.72, 0, 0]}
        >
          <mesh position={[0, -0.18, 0]} castShadow>
            <boxGeometry args={[0.15, 0.4, 0.15]} />
            <meshStandardMaterial color={shirt} />
          </mesh>
          {/* Left hand on keyboard */}
          <mesh position={[0, -0.38, 0.02]} castShadow>
            <boxGeometry args={[0.14, 0.14, 0.16]} />
            <meshStandardMaterial color={skin} />
          </mesh>
          {/* Fingers splayed slightly over keys */}
          {[-0.05, -0.015, 0.02, 0.055].map((x, i) => (
            <mesh key={i} position={[x, -0.47, 0.04]} castShadow>
              <boxGeometry args={[0.025, 0.06, 0.04]} />
              <meshStandardMaterial color={skin} />
            </mesh>
          ))}
        </group>
      </group>

      {/* === RIGHT ARM — mouse === */}
      <group
        ref={rightUpperArmRef}
        position={[0.44, 1.32, 0.02]}
        rotation={[-1.28, 0, -0.22]}
      >
        <mesh position={[0, -0.2, 0]} castShadow>
          <boxGeometry args={[0.16, 0.46, 0.16]} />
          <meshStandardMaterial color={shirt} />
        </mesh>
        <group
          ref={rightForearmRef}
          position={[0, -0.42, 0.06]}
          rotation={[-0.82, 0, 0]}
        >
          <mesh position={[0, -0.18, 0]} castShadow>
            <boxGeometry args={[0.15, 0.4, 0.15]} />
            <meshStandardMaterial color={shirt} />
          </mesh>
          {/* Right hand holding mouse */}
          <group ref={rightHandRef} position={[0, -0.38, 0.02]}>
            <mesh castShadow>
              <boxGeometry args={[0.14, 0.14, 0.16]} />
              <meshStandardMaterial color={skin} />
            </mesh>
            {/* Fingers curled over mouse */}
            {[-0.045, -0.015, 0.018, 0.05].map((x, i) => (
              <mesh
                key={i}
                position={[x, -0.04, 0.1]}
                rotation={[0.5, 0, 0]}
                castShadow
              >
                <boxGeometry args={[0.025, 0.06, 0.035]} />
                <meshStandardMaterial color={skin} />
              </mesh>
            ))}
          </group>

          {/* Mouse attached to right hand — moves with arm */}
          <group ref={mouseGroupRef} position={[0, -0.46, 0.09]}>
            {/* Mouse body */}
            <mesh rotation={[0.25, 0, 0]} castShadow>
              <boxGeometry args={[0.09, 0.048, 0.135]} />
              <meshStandardMaterial
                color="#d8dbe2"
                roughness={0.42}
                metalness={0.08}
              />
            </mesh>
            {/* Mouse top curve */}
            <mesh position={[0, 0.028, -0.01]} rotation={[0.25, 0, 0]} castShadow>
              <boxGeometry args={[0.085, 0.018, 0.1]} />
              <meshStandardMaterial color="#e8ebf0" roughness={0.4} />
            </mesh>
            {/* Scroll wheel */}
            <mesh position={[0, 0.034, 0.01]} rotation={[0.25, 0, 0]} castShadow>
              <cylinderGeometry args={[0.01, 0.01, 0.032, 8]} />
              <meshStandardMaterial color="#888" roughness={0.6} />
            </mesh>
            {/* Left click */}
            <mesh position={[-0.022, 0.032, 0.022]} rotation={[0.25, 0, 0]}>
              <boxGeometry args={[0.036, 0.008, 0.07]} />
              <meshStandardMaterial color="#cacdd4" />
            </mesh>
            {/* Right click */}
            <mesh position={[0.022, 0.032, 0.022]} rotation={[0.25, 0, 0]}>
              <boxGeometry args={[0.036, 0.008, 0.07]} />
              <meshStandardMaterial color="#cacdd4" />
            </mesh>
          </group>
        </group>
      </group>
    </group>
  );
}

function Chair({
  position,
  rotation = [0, 0, 0],
}: {
  position: Vec3;
  rotation?: Vec3;
}) {
  const frame = "#80859a";
  const seat = "#f0efee";

  return (
    <group position={position} rotation={rotation}>
      <mesh position={[0, 0.66, 0.02]} castShadow>
        <boxGeometry args={[0.62, 0.09, 0.62]} />
        <meshStandardMaterial color={seat} roughness={0.85} />
      </mesh>

      <mesh position={[0, 1.18, -0.34]} castShadow>
        <boxGeometry args={[0.58, 0.96, 0.08]} />
        <meshStandardMaterial color={seat} roughness={0.85} />
      </mesh>

      <mesh position={[0, 0.33, -0.05]} rotation={[0.25, 0, 0]} castShadow>
        <boxGeometry args={[0.08, 0.62, 0.08]} />
        <meshStandardMaterial color={frame} metalness={0.55} roughness={0.35} />
      </mesh>

      <mesh position={[0.16, 0.15, 0.18]} rotation={[0, 0, 0.8]} castShadow>
        <boxGeometry args={[0.58, 0.06, 0.06]} />
        <meshStandardMaterial color={frame} metalness={0.55} roughness={0.35} />
      </mesh>
      <mesh position={[-0.16, 0.15, 0.18]} rotation={[0, 0, -0.8]} castShadow>
        <boxGeometry args={[0.58, 0.06, 0.06]} />
        <meshStandardMaterial color={frame} metalness={0.55} roughness={0.35} />
      </mesh>
      <mesh position={[0, 0.03, 0.42]} castShadow>
        <boxGeometry args={[0.54, 0.06, 0.06]} />
        <meshStandardMaterial color={frame} metalness={0.55} roughness={0.35} />
      </mesh>
    </group>
  );
}

function Desk({
  position,
  rotation = [0, 0, 0],
}: {
  position: Vec3;
  rotation?: Vec3;
}) {
  const top = "#f2f0ee";
  const wood = "#d0aa78";

  return (
    <group position={position} rotation={rotation}>
      {/* Main desk surface */}
      <mesh position={[0.2, 1.0, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.8, 0.08, 1.22]} />
        <meshStandardMaterial color={top} roughness={0.88} />
      </mesh>

      {/* Return / side section — creates L-shape / corner desk feel */}
      <mesh position={[-1.42, 1.0, -0.62]} castShadow receiveShadow>
        <boxGeometry args={[0.96, 0.08, 0.74]} />
        <meshStandardMaterial color={top} roughness={0.88} />
      </mesh>

      {/* Desk legs */}
      {[
        [-1.02, 0.48, -0.46] as Vec3,
        [1.35, 0.48, -0.46] as Vec3,
        [-1.02, 0.48, 0.48] as Vec3,
        [1.35, 0.48, 0.48] as Vec3,
        [-1.82, 0.48, -0.92] as Vec3,
        [-1.02, 0.48, -0.92] as Vec3,
      ].map((p, i) => (
        <mesh key={i} position={p} castShadow>
          <boxGeometry args={[0.1, 0.96, 0.1]} />
          <meshStandardMaterial color={wood} roughness={0.82} />
        </mesh>
      ))}
    </group>
  );
}

// Both monitors now share the same size for visual consistency
const MONITOR_W = 1.26;
const MONITOR_H = 0.9;
const MONITOR_DEPTH = 0.08;
const SCREEN_W = MONITOR_W - 0.14;
const SCREEN_H = MONITOR_H - 0.16;

function PrimaryMonitor({ position }: { position: Vec3 }) {
  const screenRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (screenRef.current) {
      const mat = screenRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 0.32 + Math.sin(t * 2.3) * 0.05;
    }
  });

  const halfH = MONITOR_H / 2;

  return (
    <group position={position}>
      {/* Bezel */}
      <mesh position={[0, halfH, 0]} castShadow>
        <boxGeometry args={[MONITOR_W, MONITOR_H, MONITOR_DEPTH]} />
        <meshStandardMaterial color="#2e2941" metalness={0.45} roughness={0.35} />
      </mesh>

      {/* Screen */}
      <mesh ref={screenRef} position={[0, halfH, MONITOR_DEPTH / 2 + 0.006]}>
        <boxGeometry args={[SCREEN_W, SCREEN_H, 0.01]} />
        <meshStandardMaterial
          color="#1b2437"
          emissive="#253b8c"
          emissiveIntensity={0.32}
        />
      </mesh>

      {/* Code lines */}
      {[
        { y: 0.82, w: 0.52, x: -0.1, c: "#d8b4fe" },
        { y: 0.72, w: 0.76, x: -0.02, c: "#fca5a5" },
        { y: 0.61, w: 0.66, x: -0.08, c: "#fde047" },
        { y: 0.5, w: 0.58, x: -0.1, c: "#86efac" },
        { y: 0.39, w: 0.82, x: 0, c: "#c084fc" },
        { y: 0.28, w: 0.46, x: -0.15, c: "#fbbf24" },
      ].map((line, i) => (
        <mesh key={i} position={[line.x, line.y, MONITOR_DEPTH / 2 + 0.013]}>
          <boxGeometry args={[line.w, 0.02, 0.001]} />
          <meshStandardMaterial
            color={line.c}
            emissive={line.c}
            emissiveIntensity={0.55}
          />
        </mesh>
      ))}

      {/* Stand */}
      <mesh position={[0, 0.13, -0.02]} castShadow>
        <boxGeometry args={[0.1, 0.2, 0.08]} />
        <meshStandardMaterial color="#443d5f" />
      </mesh>
      <mesh position={[0, 0.02, 0]} castShadow>
        <boxGeometry args={[0.36, 0.03, 0.18]} />
        <meshStandardMaterial color="#443d5f" />
      </mesh>
    </group>
  );
}

function SecondaryMonitor({
  position,
  rotation = [0, 0, 0],
}: {
  position: Vec3;
  rotation?: Vec3;
}) {
  const halfH = MONITOR_H / 2;

  return (
    <group position={position} rotation={rotation}>
      {/* Same bezel size as primary */}
      <mesh position={[0, halfH, 0]} castShadow>
        <boxGeometry args={[MONITOR_W, MONITOR_H, MONITOR_DEPTH]} />
        <meshStandardMaterial color="#3f3957" metalness={0.4} roughness={0.35} />
      </mesh>

      <mesh position={[0, halfH, MONITOR_DEPTH / 2 + 0.006]}>
        <boxGeometry args={[SCREEN_W, SCREEN_H, 0.01]} />
        <meshStandardMaterial
          color="#21283a"
          emissive="#293b8f"
          emissiveIntensity={0.22}
        />
      </mesh>

      {[
        [0.18, 0.02, 0.18],
        [0.08, -0.04, 0.22],
        [-0.02, -0.02, 0.14],
        [-0.12, 0.03, 0.2],
      ].map(([y, x, w], i) => (
        <mesh key={i} position={[x, halfH + y, MONITOR_DEPTH / 2 + 0.013]}>
          <boxGeometry args={[w, 0.025, 0.001]} />
          <meshStandardMaterial
            color="#9ca3af"
            emissive="#9ca3af"
            emissiveIntensity={0.25}
          />
        </mesh>
      ))}

      {/* Stand */}
      <mesh position={[0, 0.12, -0.02]} castShadow>
        <boxGeometry args={[0.08, 0.18, 0.08]} />
        <meshStandardMaterial color="#4a4461" />
      </mesh>
      <mesh position={[0, 0.02, 0]} castShadow>
        <boxGeometry args={[0.3, 0.03, 0.16]} />
        <meshStandardMaterial color="#4a4461" />
      </mesh>
    </group>
  );
}

function Keyboard({ position }: { position: Vec3 }) {
  return (
    <group position={position}>
      <mesh rotation={[-0.1, 0, 0]} castShadow>
        <boxGeometry args={[0.54, 0.03, 0.22]} />
        <meshStandardMaterial color="#dee1e6" roughness={0.75} />
      </mesh>
    </group>
  );
}

function Mug({ position }: { position: Vec3 }) {
  return (
    <group position={position}>
      <mesh castShadow>
        <cylinderGeometry args={[0.06, 0.05, 0.12, 16]} />
        <meshStandardMaterial color="#e88f73" roughness={0.62} />
      </mesh>
    </group>
  );
}

function PencilCup({ position }: { position: Vec3 }) {
  return (
    <group position={position}>
      <mesh castShadow>
        <cylinderGeometry args={[0.08, 0.08, 0.18, 16]} />
        <meshStandardMaterial color="#d1b28f" roughness={0.8} />
      </mesh>

      <mesh
        position={[-0.035, 0.14, 0]}
        rotation={[0.12, 0, 0.08]}
        castShadow
      >
        <boxGeometry args={[0.018, 0.24, 0.018]} />
        <meshStandardMaterial color="#7dd3fc" />
      </mesh>
      <mesh
        position={[0.015, 0.12, 0.01]}
        rotation={[-0.08, 0, -0.18]}
        castShadow
      >
        <boxGeometry args={[0.018, 0.21, 0.018]} />
        <meshStandardMaterial color="#fb7185" />
      </mesh>
      <mesh
        position={[0.045, 0.145, -0.008]}
        rotation={[0.1, 0, 0.14]}
        castShadow
      >
        <boxGeometry args={[0.018, 0.25, 0.018]} />
        <meshStandardMaterial color="#fbbf24" />
      </mesh>
    </group>
  );
}

function Plant({ position }: { position: Vec3 }) {
  return (
    <group position={position}>
      <mesh castShadow>
        <cylinderGeometry args={[0.21, 0.17, 0.3, 18]} />
        <meshStandardMaterial color="#d4c4b5" roughness={0.9} />
      </mesh>

      <mesh position={[0, -0.07, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.15, 0.08, 18]} />
        <meshStandardMaterial color="#7b4b27" roughness={1} />
      </mesh>

      {[
        [0, 0.28, 0, 0.15, 0, 0],
        [0.1, 0.23, 0.02, 0.18, 0, -0.4],
        [-0.09, 0.24, -0.03, 0.16, 0, 0.42],
        [0.04, 0.32, -0.05, 0.22, 0, -0.25],
        [-0.05, 0.33, 0.05, 0.22, 0, 0.24],
      ].map((leaf, i) => (
        <mesh
          key={i}
          position={[leaf[0], leaf[1], leaf[2]]}
          rotation={[leaf[3], leaf[4], leaf[5]] as Vec3}
          castShadow
        >
          <sphereGeometry args={[0.11, 14, 14]} />
          <meshStandardMaterial color="#92dc2d" roughness={0.88} />
        </mesh>
      ))}
    </group>
  );
}

function Rug({ position }: { position: Vec3 }) {
  return (
    <group position={position}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[3.4, 2.4]} />
        <meshStandardMaterial color="#e89c28" roughness={1} />
      </mesh>
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[2.7, 1.85]} />
        <meshStandardMaterial color="#f2df78" roughness={1} />
      </mesh>
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[1.95, 1.15]} />
        <meshStandardMaterial color="#e6d984" roughness={1} />
      </mesh>
    </group>
  );
}

function WallShelf({ position }: { position: Vec3 }) {
  return (
    <group position={position}>
      <mesh castShadow>
        <boxGeometry args={[0.75, 0.07, 0.22]} />
        <meshStandardMaterial color="#e6d4af" roughness={0.86} />
      </mesh>

      <mesh position={[-0.15, 0.18, 0]} castShadow>
        <boxGeometry args={[0.1, 0.34, 0.18]} />
        <meshStandardMaterial color="#dfe5ef" roughness={0.84} />
      </mesh>
      <mesh position={[0, 0.19, 0]} castShadow>
        <boxGeometry args={[0.14, 0.38, 0.18]} />
        <meshStandardMaterial color="#f6b341" roughness={0.84} />
      </mesh>

      <mesh position={[0.22, 0.11, 0]} castShadow>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#f7f5f0" roughness={0.94} />
      </mesh>
      <mesh position={[0.22, 0.21, 0]} castShadow>
        <sphereGeometry args={[0.065, 12, 12]} />
        <meshStandardMaterial color="#86d92c" roughness={0.9} />
      </mesh>
    </group>
  );
}

function WallBoard({ position }: { position: Vec3 }) {
  return (
    <group position={position}>
      <mesh castShadow>
        <boxGeometry args={[1.42, 0.88, 0.06]} />
        <meshStandardMaterial color="#e6d4b5" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0, 0.035]}>
        <boxGeometry args={[1.25, 0.72, 0.02]} />
        <meshStandardMaterial color="#bca18f" roughness={1} />
      </mesh>
      <mesh
        position={[-0.34, 0.16, 0.055]}
        rotation={[0, 0, 0.08]}
      >
        <boxGeometry args={[0.22, 0.28, 0.01]} />
        <meshStandardMaterial color="#cfe2fb" roughness={0.96} />
      </mesh>
      <mesh
        position={[0.38, -0.1, 0.055]}
        rotation={[0, 0, -0.12]}
      >
        <boxGeometry args={[0.24, 0.32, 0.01]} />
        <meshStandardMaterial color="#f8f4ef" roughness={0.96} />
      </mesh>
      <mesh position={[-0.42, 0.26, 0.07]}>
        <sphereGeometry args={[0.05, 12, 12]} />
        <meshStandardMaterial color="#ef6c7c" />
      </mesh>
      <mesh position={[0.31, -0.01, 0.07]}>
        <sphereGeometry args={[0.05, 12, 12]} />
        <meshStandardMaterial color="#ef6c7c" />
      </mesh>
    </group>
  );
}

/**
 * WallClock — fixed to show face-on (flat against the wall).
 * The cylinder axis is Z (depth), so the face points toward the viewer.
 */
function WallClock({ position }: { position: Vec3 }) {
  const hourRef = useRef<THREE.Mesh>(null);
  const minuteRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    // Slow continuous rotation for clock hands
    if (hourRef.current) {
      hourRef.current.rotation.z = -(t * 0.05); // one full turn every ~125s
    }
    if (minuteRef.current) {
      minuteRef.current.rotation.z = -(t * 0.6); // faster
    }
  });

  return (
    // Rotate group so cylinder (Y axis by default) aligns with Z wall-facing axis
    <group position={position} rotation={[Math.PI / 2, 0, 0]}>
      {/* Clock body — now face points along Z toward viewer */}
      <mesh castShadow>
        <cylinderGeometry args={[0.22, 0.22, 0.05, 32]} />
        <meshStandardMaterial color="#f2e6d7" roughness={0.9} />
      </mesh>

      {/* Clock face */}
      <mesh position={[0, 0.03, 0]}>
        <cylinderGeometry args={[0.18, 0.18, 0.01, 32]} />
        <meshStandardMaterial color="#fffaf4" roughness={0.96} />
      </mesh>

      {/* Hour markers */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const r = 0.14;
        return (
          <mesh
            key={i}
            position={[
              Math.sin(angle) * r,
              0.038,
              Math.cos(angle) * r,
            ]}
          >
            <boxGeometry args={[0.012, 0.006, 0.02]} />
            <meshStandardMaterial color="#555" />
          </mesh>
        );
      })}

      {/* Hour hand */}
      <group ref={hourRef} position={[0, 0.042, 0]}>
        <mesh position={[0, 0, -0.045]}>
          <boxGeometry args={[0.012, 0.007, 0.09]} />
          <meshStandardMaterial color="#1f1f1f" />
        </mesh>
      </group>

      {/* Minute hand */}
      <group ref={minuteRef} position={[0, 0.046, 0]}>
        <mesh position={[0, 0, -0.065]}>
          <boxGeometry args={[0.008, 0.007, 0.13]} />
          <meshStandardMaterial color="#333" />
        </mesh>
      </group>

      {/* Center pin */}
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[0.014, 0.014, 0.015, 12]} />
        <meshStandardMaterial color="#c0392b" />
      </mesh>
    </group>
  );
}

function DeskScene() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ pointer }) => {
    if (!groupRef.current) return;

    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      -0.18 + pointer.x * 0.06,
      0.035,
    );

    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      pointer.y * 0.012,
      0.035,
    );
  });

  return (
    <group ref={groupRef} position={[0.75, -1.5, 0.12]}>
      <Rug position={[0.15, 0, 0.58]} />

      {/* Desk rotated ~45° to simulate corner/angle placement */}
      <Desk position={[0, 0, 0]} rotation={[0, -0.42, 0]} />

      {/* Both monitors same size, angled symmetrically on the corner desk */}
      <SecondaryMonitor
        position={[-0.52, 1.02, -0.28]}
        rotation={[0, 0.52, 0]}
      />
      <PrimaryMonitor position={[0.32, 1.06, -0.18]} />

      <Keyboard position={[0.14, 1.04, 0.26]} />
      <Mug position={[1.04, 1.1, 0.18]} />
      <PencilCup position={[-0.7, 1.1, 0.04]} />

      <Chair position={[-0.05, 0, 1.08]} rotation={[0, Math.PI, 0]} />
      <Person position={[-0.05, 0.03, 0.88]} rotation={[0, Math.PI, 0]} />

      <WallShelf position={[-0.1, 2.48, -1.08]} />
      <WallBoard position={[1.16, 2.25, -1.05]} />
      {/* Clock positioned flat on the wall */}
      <WallClock position={[2.28, 2.28, -0.98]} />
      <Plant position={[2.18, 0.16, 1.02]} />
    </group>
  );
}

export default function LaptopScene() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [4.0, 2.45, 6.0], fov: 27 }}
        gl={{ antialias: true, alpha: true }}
        shadows
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.95} />
        <directionalLight position={[5, 8, 6]} intensity={1.15} castShadow />
        <pointLight position={[0, 2.8, 2]} intensity={0.34} color="#ffd8a8" />
        <pointLight
          position={[0.8, 2.2, -1.4]}
          intensity={0.3}
          color="#9db4ff"
        />

        <DeskScene />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
