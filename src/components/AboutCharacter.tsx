import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment, useAnimations } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

type ArmBones = {
    upperArm?: THREE.Bone;
    foreArm?: THREE.Bone;
    hand?: THREE.Bone;
};

function findRightArmBones(root: THREE.Object3D): ArmBones {
    const bones: ArmBones = {};
    root.traverse((obj) => {
        if (!(obj instanceof THREE.Bone)) return;
        const name = obj.name.toLowerCase();
        if (!bones.upperArm && (
            name.includes("rightarm") || name.includes("upperarm_r") ||
            name.includes("r_upperarm") || name.includes("upperarmright") ||
            name.includes("rightupperarm")
        )) bones.upperArm = obj;
        if (!bones.foreArm && (
            name.includes("rightforearm") || name.includes("forearm_r") ||
            name.includes("r_forearm") || name.includes("lowerarm_r") ||
            name.includes("rightlowerarm")
        )) bones.foreArm = obj;
        if (!bones.hand && (
            name.includes("righthand") || name.includes("hand_r") ||
            name.includes("r_hand")
        )) bones.hand = obj;
    });
    return bones;
}

function findLeftArmBones(root: THREE.Object3D): ArmBones {
    const bones: ArmBones = {};
    root.traverse((obj) => {
        if (!(obj instanceof THREE.Bone)) return;
        const name = obj.name.toLowerCase();
        if (!bones.upperArm && (
            name.includes("leftarm") || name.includes("upperarm_l") ||
            name.includes("l_upperarm") || name.includes("upperarmleft") ||
            name.includes("leftupperarm")
        )) bones.upperArm = obj;
        if (!bones.foreArm && (
            name.includes("leftforearm") || name.includes("forearm_l") ||
            name.includes("l_forearm") || name.includes("lowerarm_l") ||
            name.includes("leftlowerarm")
        )) bones.foreArm = obj;
        if (!bones.hand && (
            name.includes("lefthand") || name.includes("hand_l") ||
            name.includes("l_hand")
        )) bones.hand = obj;
    });
    return bones;
}

type AnimState = "idle" | "waving" | "peace";

function CharacterModel() {
    const group = useRef<THREE.Group>(null);
    const { scene, animations } = useGLTF("/models/arthur.glb");
    const { actions } = useAnimations(animations, group);

    const bonesRef = useRef<ArmBones>({});
    const initialRotRef = useRef<{ upperArm?: THREE.Euler; foreArm?: THREE.Euler; hand?: THREE.Euler; }>({});
    const leftBonesRef = useRef<ArmBones>({});
    const leftInitialRotRef = useRef<{ upperArm?: THREE.Euler; foreArm?: THREE.Euler; hand?: THREE.Euler; }>({});

    const [animState, setAnimState] = useState<AnimState>("idle");
    const animStartRef = useRef(0);

    useEffect(() => {
        bonesRef.current = findRightArmBones(scene);
        const { upperArm, foreArm, hand } = bonesRef.current;
        if (upperArm) upperArm.rotation.set(1.2, 0, 0.15);
        if (foreArm) foreArm.rotation.set(0, 0, -0.5);
        if (hand) hand.rotation.set(0.3, 0, 0);
        initialRotRef.current = {
            upperArm: upperArm?.rotation.clone(),
            foreArm: foreArm?.rotation.clone(),
            hand: hand?.rotation.clone(),
        };

        leftBonesRef.current = findLeftArmBones(scene);
        const { upperArm: lUA, foreArm: lFA, hand: lH } = leftBonesRef.current;
        if (lUA) lUA.rotation.set(1.2, 0, -0.15);
        if (lFA) lFA.rotation.set(0, 0, 0.5);
        if (lH) lH.rotation.set(0.3, 0, 0);
        leftInitialRotRef.current = {
            upperArm: lUA?.rotation.clone(),
            foreArm: lFA?.rotation.clone(),
            hand: lH?.rotation.clone(),
        };

        actions["idle_eyes"]?.reset().fadeIn(0.3).play();
    }, [scene, actions]);

    useEffect(() => {
        const onHello = () => {
            if (animState !== "idle") return;
            actions["allOpen_R"]?.reset().fadeIn(0.15).play();
            setAnimState("waving");
            animStartRef.current = performance.now() / 1000;
        };
        const onPeace = () => {
            if (animState !== "idle") return;
            // V = index tendu + majeur tendu + annulaire/auriculaire repliés + pouce replié
            actions["mrpDown_R"]?.reset().fadeIn(0.15).play();
            actions["thumbDown_R"]?.reset().fadeIn(0.15).play();
            setAnimState("peace");
            animStartRef.current = performance.now() / 1000;
        };

        window.addEventListener("character-hello", onHello);
        window.addEventListener("character-peace", onPeace);
        return () => {
            window.removeEventListener("character-hello", onHello);
            window.removeEventListener("character-peace", onPeace);
        };
    }, [actions, animState]);

    useFrame(() => {
        const { upperArm, foreArm, hand } = bonesRef.current;
        const initial = initialRotRef.current;
        const { upperArm: lUA, foreArm: lFA, hand: lH } = leftBonesRef.current;
        const li = leftInitialRotRef.current;

        if (!upperArm || !foreArm || !hand) return;
        if (!initial.upperArm || !initial.foreArm || !initial.hand) return;

        // Bras gauche — toujours au repos
        if (lUA && lFA && lH && li.upperArm && li.foreArm && li.hand) {
            lUA.rotation.x = THREE.MathUtils.lerp(lUA.rotation.x, li.upperArm.x, 0.12);
            lUA.rotation.y = THREE.MathUtils.lerp(lUA.rotation.y, li.upperArm.y, 0.12);
            lUA.rotation.z = THREE.MathUtils.lerp(lUA.rotation.z, li.upperArm.z, 0.12);
            lFA.rotation.x = THREE.MathUtils.lerp(lFA.rotation.x, li.foreArm.x, 0.12);
            lFA.rotation.y = THREE.MathUtils.lerp(lFA.rotation.y, li.foreArm.y, 0.12);
            lFA.rotation.z = THREE.MathUtils.lerp(lFA.rotation.z, li.foreArm.z, 0.12);
            lH.rotation.x = THREE.MathUtils.lerp(lH.rotation.x, li.hand.x, 0.12);
            lH.rotation.y = THREE.MathUtils.lerp(lH.rotation.y, li.hand.y, 0.12);
            lH.rotation.z = THREE.MathUtils.lerp(lH.rotation.z, li.hand.z, 0.12);
        }

        // Retour au repos
        if (animState === "idle") {
            upperArm.rotation.x = THREE.MathUtils.lerp(upperArm.rotation.x, initial.upperArm.x, 0.08);
            upperArm.rotation.y = THREE.MathUtils.lerp(upperArm.rotation.y, initial.upperArm.y, 0.08);
            upperArm.rotation.z = THREE.MathUtils.lerp(upperArm.rotation.z, initial.upperArm.z, 0.08);
            foreArm.rotation.x = THREE.MathUtils.lerp(foreArm.rotation.x, initial.foreArm.x, 0.08);
            foreArm.rotation.y = THREE.MathUtils.lerp(foreArm.rotation.y, initial.foreArm.y, 0.08);
            foreArm.rotation.z = THREE.MathUtils.lerp(foreArm.rotation.z, initial.foreArm.z, 0.08);
            hand.rotation.x = THREE.MathUtils.lerp(hand.rotation.x, initial.hand.x, 0.08);
            hand.rotation.y = THREE.MathUtils.lerp(hand.rotation.y, initial.hand.y, 0.08);
            hand.rotation.z = THREE.MathUtils.lerp(hand.rotation.z, initial.hand.z, 0.08);
            return;
        }

        const easeOut = (x: number) => 1 - Math.pow(1 - x, 3);
        const easeInOut = (x: number) => x < 0.5 ? 4*x*x*x : 1 - Math.pow(-2*x+2, 3)/2;

        const t = performance.now() / 1000 - animStartRef.current;

        // ════════════════════════════════════════
        // ANIMATION : COUCOU
        // ════════════════════════════════════════
        if (animState === "waving") {
            const totalDuration = 3.2;
            if (t >= totalDuration) {
                setAnimState("idle");
                actions["allOpen_R"]?.fadeOut(0.3);
                return;
            }

            const liftProgress = Math.min(t / 0.45, 1);
            const lift = easeOut(liftProgress);
            const foreArmProgress = Math.min(Math.max((t - 0.15) / 0.35, 0), 1);
            const foreArmLift = easeOut(foreArmProgress);
            const waveActive = Math.min(Math.max((t - 0.4) / 0.2, 0), 1);
            const wave = Math.sin(t * 9) * 0.42 * waveActive;
            const downProgress = Math.min(Math.max((t - 2.4) / 0.8, 0), 1);
            const down = easeInOut(downProgress);
            const liftFinal = lift * (1 - down);
            const foreArmFinal = foreArmLift * (1 - down);

            upperArm.rotation.x = initial.upperArm.x - 1.05 * liftFinal;
            upperArm.rotation.y = initial.upperArm.y - 0.2 * liftFinal;
            upperArm.rotation.z = initial.upperArm.z - 0.5 * liftFinal;
            foreArm.rotation.x = initial.foreArm.x - 1.5 * foreArmFinal;
            foreArm.rotation.y = initial.foreArm.y + 1.2 * foreArmFinal;
            foreArm.rotation.z = initial.foreArm.z + wave * 0.6;
            hand.rotation.x = initial.hand.x - 0.15 * foreArmFinal;
            hand.rotation.y = initial.hand.y + wave * 0.2;
            hand.rotation.z = initial.hand.z + wave * 0.35;
        }

        // ════════════════════════════════════════
        // ANIMATION : PEACE ✌️
        // ════════════════════════════════════════
        // if (animState === "peace") {
        //     const totalDuration = 3.0;
        //     if (t >= totalDuration) {
        //         setAnimState("idle");
        //         actions["mrpDown_R"]?.fadeOut(0.3);
        //         actions["thumbDown_R"]?.fadeOut(0.3);
        //         return;
        //     }
        //
        //     // Montée du bras — même logique que coucou mais bras légèrement plus centré
        //     const liftProgress = Math.min(t / 0.5, 1);
        //     const lift = easeOut(liftProgress);
        //     const foreArmProgress = Math.min(Math.max((t - 0.2) / 0.4, 0), 1);
        //     const foreArmLift = easeOut(foreArmProgress);
        //
        //     // Légère rotation de présentation de la main (pas de wave)
        //     const presentProgress = Math.min(Math.max((t - 0.5) / 0.3, 0), 1);
        //     const present = easeOut(presentProgress);
        //
        //     // Descente douce
        //     const downProgress = Math.min(Math.max((t - 2.2) / 0.8, 0), 1);
        //     const down = easeInOut(downProgress);
        //     const liftFinal = lift * (1 - down);
        //     const foreArmFinal = foreArmLift * (1 - down);
        //     const presentFinal = present * (1 - down);
        //
        //     // Bras monte droit devant, légèrement moins haut que le coucou
        //     upperArm.rotation.x = initial.upperArm.x - 0.95 * liftFinal;
        //     upperArm.rotation.y = initial.upperArm.y - 0.35 * liftFinal; // plus centré vers caméra
        //     upperArm.rotation.z = initial.upperArm.z - 0.4 * liftFinal;
        //
        //     // Avant-bras se dresse à 90°
        //     foreArm.rotation.x = initial.foreArm.x - 1.5 * foreArmFinal;
        //     foreArm.rotation.y = initial.foreArm.y + 1.2 * foreArmFinal;
        //     foreArm.rotation.z = initial.foreArm.z;
        //
        //     // Main orientée face caméra, légère inclinaison de présentation
        //     hand.rotation.x = initial.hand.x - 0.2 * foreArmFinal;
        //     hand.rotation.y = initial.hand.y - 0.3 * presentFinal; // tourne la paume vers l'avant
        //     hand.rotation.z = initial.hand.z + 0.1 * presentFinal;
        // }
    });

    return (
        <group ref={group}>
            <primitive
                object={scene}
                scale={1.5}
                position={[0, -2, 0]}
                rotation={[0, Math.PI / 6, 0]}
            />
        </group>
    );
}

useGLTF.preload("/models/arthur.glb");

export default function AboutCharacter() {
    return (
        <div className="w-full h-[320px] md:h-[420px] lg:h-[500px] relative">
            <Canvas camera={{ position: [0.5, 1.2, 3.2], fov: 30 }}>
                <ambientLight intensity={1.2} />
                <directionalLight position={[3, 4, 2]} intensity={1.8} />
                <Environment preset="city" />
                <CharacterModel />
                <OrbitControls enableZoom={false} enablePan={false} />
            </Canvas>

            <div className="absolute bottom-4 left-4 flex gap-2">
                <button
                    onClick={() => window.dispatchEvent(new Event("character-hello"))}
                    className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white backdrop-blur"
                >
                    👋
                </button>
                {/*<button*/}
                {/*    onClick={() => window.dispatchEvent(new Event("character-peace"))}*/}
                {/*    className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white backdrop-blur"*/}
                {/*>*/}
                {/*    ✌️ Peace*/}
                {/*</button>*/}
            </div>
        </div>
    );
}