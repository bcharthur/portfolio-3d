"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
    OrbitControls,
    useGLTF,
    Environment,
    useAnimations,
} from "@react-three/drei";
import { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { HandIcon, type HandIconHandle } from "@/components/ui/HandIcon";

const modelPath = `${import.meta.env.BASE_URL}models/arthur.glb`;

type ArmBones = {
    upperArm?: THREE.Bone;
    foreArm?: THREE.Bone;
    hand?: THREE.Bone;
};

type LegBones = {
    hip?: THREE.Bone;
    upperLeg?: THREE.Bone;
    lowerLeg?: THREE.Bone;
};

function findRightArmBones(root: THREE.Object3D): ArmBones {
    const bones: ArmBones = {};

    root.traverse((obj) => {
        if (!(obj instanceof THREE.Bone)) return;
        const name = obj.name.toLowerCase();

        if (
            !bones.upperArm &&
            (
                name.includes("rightarm") ||
                name.includes("upperarm_r") ||
                name.includes("r_upperarm") ||
                name.includes("upperarmright") ||
                name.includes("rightupperarm")
            )
        ) {
            bones.upperArm = obj;
        }

        if (
            !bones.foreArm &&
            (
                name.includes("rightforearm") ||
                name.includes("forearm_r") ||
                name.includes("r_forearm") ||
                name.includes("lowerarm_r") ||
                name.includes("rightlowerarm")
            )
        ) {
            bones.foreArm = obj;
        }

        if (
            !bones.hand &&
            (
                name.includes("righthand") ||
                name.includes("hand_r") ||
                name.includes("r_hand")
            )
        ) {
            bones.hand = obj;
        }
    });

    return bones;
}

function findLeftArmBones(root: THREE.Object3D): ArmBones {
    const bones: ArmBones = {};

    root.traverse((obj) => {
        if (!(obj instanceof THREE.Bone)) return;
        const name = obj.name.toLowerCase();

        if (
            !bones.upperArm &&
            (
                name.includes("leftarm") ||
                name.includes("upperarm_l") ||
                name.includes("l_upperarm") ||
                name.includes("upperarmleft") ||
                name.includes("leftupperarm")
            )
        ) {
            bones.upperArm = obj;
        }

        if (
            !bones.foreArm &&
            (
                name.includes("leftforearm") ||
                name.includes("forearm_l") ||
                name.includes("l_forearm") ||
                name.includes("lowerarm_l") ||
                name.includes("leftlowerarm")
            )
        ) {
            bones.foreArm = obj;
        }

        if (
            !bones.hand &&
            (
                name.includes("lefthand") ||
                name.includes("hand_l") ||
                name.includes("l_hand")
            )
        ) {
            bones.hand = obj;
        }
    });

    return bones;
}

function findRightLegBones(root: THREE.Object3D): LegBones {
    const bones: LegBones = {};

    root.traverse((obj) => {
        if (!(obj instanceof THREE.Bone)) return;
        const name = obj.name.toLowerCase();

        if (
            !bones.upperLeg &&
            (
                name.includes("rightthigh") ||
                name.includes("thigh_r") ||
                name.includes("r_thigh") ||
                name.includes("upperleg_r") ||
                name.includes("rightupperleg")
            )
        ) {
            bones.upperLeg = obj;
        }

        if (
            !bones.lowerLeg &&
            (
                name.includes("rightshin") ||
                name.includes("shin_r") ||
                name.includes("r_shin") ||
                name.includes("lowerleg_r") ||
                name.includes("rightlowerleg") ||
                name.includes("rightcalf")
            )
        ) {
            bones.lowerLeg = obj;
        }
    });

    return bones;
}

function findLeftLegBones(root: THREE.Object3D): LegBones {
    const bones: LegBones = {};

    root.traverse((obj) => {
        if (!(obj instanceof THREE.Bone)) return;
        const name = obj.name.toLowerCase();

        if (
            !bones.upperLeg &&
            (
                name.includes("leftthigh") ||
                name.includes("thigh_l") ||
                name.includes("l_thigh") ||
                name.includes("upperleg_l") ||
                name.includes("leftupperleg")
            )
        ) {
            bones.upperLeg = obj;
        }

        if (
            !bones.lowerLeg &&
            (
                name.includes("leftshin") ||
                name.includes("shin_l") ||
                name.includes("l_shin") ||
                name.includes("lowerleg_l") ||
                name.includes("leftlowerleg") ||
                name.includes("leftcalf")
            )
        ) {
            bones.lowerLeg = obj;
        }
    });

    return bones;
}

type AnimState = "idle" | "waving" | "peace";

type CharacterModelProps = {
    sitting?: boolean;
};

function CharacterModel({ sitting = false }: CharacterModelProps) {
    const group = useRef<THREE.Group>(null);


    const { scene, animations } = useGLTF(modelPath);
    const { actions } = useAnimations(animations, group);
    const { size } = useThree();

    const bonesRef = useRef<ArmBones>({});
    const initialRotRef = useRef<{
        upperArm?: THREE.Euler;
        foreArm?: THREE.Euler;
        hand?: THREE.Euler;
    }>({});

    const leftBonesRef = useRef<ArmBones>({});
    const leftInitialRotRef = useRef<{
        upperArm?: THREE.Euler;
        foreArm?: THREE.Euler;
        hand?: THREE.Euler;
    }>({});

    const rightLegBonesRef = useRef<LegBones>({});
    const leftLegBonesRef = useRef<LegBones>({});

    const [animState, setAnimState] = useState<AnimState>("idle");
    const animStartRef = useRef(0);

    const isMobile = size.width < 640;
    const isTablet = size.width >= 640 && size.width < 1024;

    const modelScale = sitting
        ? isMobile
            ? 1.2
            : isTablet
                ? 1.0
                : 1.1
        : isMobile
            ? 1.8
            : isTablet
                ? 1.22
                : 1.34;

    const modelPosition: [number, number, number] = sitting
        ? [0.1, -0.5, 0]
        : isMobile
            ? [0.18, -2.8, 0]
            : isTablet
                ? [0.2, -1.8, 0]
                : [0.34, -2.02, 0];

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

        if (sitting) {
            rightLegBonesRef.current = findRightLegBones(scene);
            const { upperLeg: rUL, lowerLeg: rLL } = rightLegBonesRef.current;

            if (rUL) rUL.rotation.set(1.1, 0, 0);
            if (rLL) rLL.rotation.set(-1.3, 0, 0);

            leftLegBonesRef.current = findLeftLegBones(scene);
            const { upperLeg: lUL, lowerLeg: lLL } = leftLegBonesRef.current;

            if (lUL) lUL.rotation.set(1.1, 0, 0);
            if (lLL) lLL.rotation.set(-1.3, 0, 0);
        }

        // actions["idle_eyes"]?.reset().fadeIn(0.3).play();
    }, [scene, actions, sitting]);

    useEffect(() => {
        const onHello = () => {
            if (animState !== "idle") return;
            actions["allOpen_R"]?.reset().fadeIn(0.15).play();
            setAnimState("waving");
            animStartRef.current = performance.now() / 1000;
        };

        const onPeace = () => {
            if (animState !== "idle") return;
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
        const easeInOut = (x: number) =>
            x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;

        const t = performance.now() / 1000 - animStartRef.current;

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
    });

    return (
        <group ref={group}>
            <primitive
                object={scene}
                scale={modelScale}
                position={modelPosition}
                rotation={sitting ? [0.15, Math.PI / 30, 0] : [0, Math.PI / 30, 0]}
            />
        </group>
    );
}

useGLTF.preload(modelPath);

export default function AboutCharacter() {
    const handIconRef = useRef<HandIconHandle>(null);
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    useEffect(() => {
        const updateDeviceType = () => {
            const hasTouch =
                window.matchMedia("(hover: none), (pointer: coarse)").matches ||
                "ontouchstart" in window ||
                navigator.maxTouchPoints > 0;

            setIsTouchDevice(hasTouch);
        };

        updateDeviceType();
        window.addEventListener("resize", updateDeviceType);

        return () => {
            window.removeEventListener("resize", updateDeviceType);
        };
    }, []);

    const triggerHello = useCallback(() => {
        handIconRef.current?.startAnimation();
        window.dispatchEvent(new Event("character-hello"));

        window.setTimeout(() => {
            handIconRef.current?.stopAnimation();
        }, 900);
    }, []);

    const handleHelloClick = () => {
        triggerHello();
    };

    const handleModelMouseEnter = () => {
        if (isTouchDevice) return;
        triggerHello();
    };

    const handleModelClick = () => {
        if (!isTouchDevice) return;
        triggerHello();
    };

    return (
        <div className="relative w-full h-[360px] sm:h-[460px] md:h-[560px] lg:h-[700px] overflow-visible">
            <div
                className="absolute inset-y-0 -left-12 -right-12 sm:-left-16 sm:-right-16 lg:-left-24 lg:-right-10 overflow-visible cursor-pointer"
                onMouseEnter={handleModelMouseEnter}
                onClick={handleModelClick}
            >
                <Canvas
                    className="w-full h-full"
                    gl={{ alpha: true, antialias: true }}
                    camera={{
                        position: [2.0, 1.5, 3.0],
                        fov: 28,
                        near: 0.1,
                        far: 100,
                    }}
                >
                    <ambientLight intensity={0.22} color="#6477a8" />
                    <directionalLight position={[3, 4, 2]} intensity={1.5} />
                    <Environment preset="city" />

                    <CharacterModel sitting={true} />

                    <OrbitControls
                        target={[0.1, 0.3, 0]}
                        enableRotate={false}
                        enableZoom={false}
                        enablePan={false}
                    />
                </Canvas>
            </div>

            {/*<div className="absolute bottom-4 right-4 z-10 flex gap-2">*/}
            {/*    <button*/}
            {/*        type="button"*/}
            {/*        onClick={handleHelloClick}*/}
            {/*        aria-label="Dire bonjour"*/}
            {/*        className="group flex h-12 w-12 items-center justify-center rounded-full border border-black/10 bg-white/70 text-neutral-800 shadow-sm backdrop-blur transition-all duration-200 hover:scale-105 hover:bg-white active:scale-95"*/}
            {/*    >*/}
            {/*        <HandIcon*/}
            {/*            ref={handIconRef}*/}
            {/*            size={22}*/}
            {/*            className="text-neutral-800 transition-transform duration-200 group-hover:scale-110"*/}
            {/*        />*/}
            {/*    </button>*/}
            {/*</div>*/}
        </div>
    );
}