import { Common3DProps } from '../types';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

export default function WallShelf({ position = [0, 0, 0], rotation = [0, 0, 0] }: Common3DProps) {

    // Matériau pages blanches (tranche supérieure des livres)
    const pagesMat = <meshStandardMaterial color="#f9f9f7" roughness={0.5} />;

    // Nervures cactus via une texture procédurale canvas
    const cactusTexture = (() => {
        const canvas = document.createElement('canvas');
        canvas.width = 128; canvas.height = 256;
        const ctx = canvas.getContext('2d')!;
        ctx.fillStyle = '#86d92c';
        ctx.fillRect(0, 0, 128, 256);
        // Nervure centrale
        ctx.strokeStyle = '#9de840';
        ctx.lineWidth = 2;
        ctx.globalAlpha = 0.55;
        ctx.beginPath(); ctx.moveTo(64, 256); ctx.lineTo(64, 0); ctx.stroke();
        // Nervures latérales
        ctx.lineWidth = 1.2;
        ctx.globalAlpha = 0.4;
        for (let i = 0; i < 5; i++) {
            const y = 40 + i * 46;
            ctx.beginPath(); ctx.moveTo(64, y); ctx.quadraticCurveTo(30, y - 18, 20, y - 32); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(64, y); ctx.quadraticCurveTo(98, y - 18, 108, y - 32); ctx.stroke();
        }
        // Points épines
        ctx.fillStyle = '#5a9e18';
        ctx.globalAlpha = 0.7;
        [[64, 8], [20, 36], [108, 36], [30, 90], [98, 90], [22, 160], [106, 160]].forEach(([x, y]) => {
            ctx.beginPath(); ctx.arc(x, y, 3, 0, Math.PI * 2); ctx.fill();
        });
        return new THREE.CanvasTexture(canvas);
    })();

    return (
        <group position={position} rotation={rotation}>

            {/* Étagère */}
            <RoundedBox args={[0.75, 0.07, 0.22]} radius={0.015} smoothness={4} castShadow receiveShadow>
                <meshStandardMaterial color="#e6d4af" roughness={0.86} />
            </RoundedBox>

            {/* ── LIVRE GRIS (petit, h=0.30) ── */}
            <group position={[-0.16, 0.19, 0]}>
                {/* Corps couverture */}
                <RoundedBox args={[0.09, 0.30, 0.17]} radius={0.018} smoothness={4} castShadow>
                    <meshStandardMaterial color="#dfe5ef" roughness={0.84} />
                </RoundedBox>
                {/* Tranche supérieure (pages blanches) */}
                <RoundedBox position={[0, 0.155, 0]} args={[0.073, 0.012, 0.148]} radius={0.003} smoothness={2}>
                    {pagesMat}
                </RoundedBox>
                {/* Reliure (tranche gauche, légèrement plus sombre) */}
                <RoundedBox position={[-0.048, 0, 0]} args={[0.008, 0.30, 0.17]} radius={0.003} smoothness={2}>
                    <meshStandardMaterial color="#b8c4d4" roughness={0.9} />
                </RoundedBox>
            </group>

            {/* ── LIVRE ORANGE (grand, h=0.40) ── */}
            <group position={[0.02, 0.235, 0]}>
                {/* Corps couverture */}
                <RoundedBox args={[0.13, 0.40, 0.17]} radius={0.022} smoothness={4} castShadow>
                    <meshStandardMaterial color="#f6b341" roughness={0.84} />
                </RoundedBox>
                {/* Tranche supérieure (pages blanches) */}
                <RoundedBox position={[0, 0.205, 0]} args={[0.108, 0.013, 0.148]} radius={0.003} smoothness={2}>
                    {pagesMat}
                </RoundedBox>
                {/* Reliure */}
                <RoundedBox position={[-0.068, 0, 0]} args={[0.008, 0.40, 0.17]} radius={0.003} smoothness={2}>
                    <meshStandardMaterial color="#d4921e" roughness={0.9} />
                </RoundedBox>
            </group>

            {/* ── POT ── */}
            <mesh position={[0.22, 0.12, 0]} scale={[1, 0.85, 1]} castShadow>
                <sphereGeometry args={[0.11, 32, 32]} />
                <meshStandardMaterial color="#f7f5f0" roughness={0.94} />
            </mesh>

            {/* ── CACTUS (clay, nervures via texture) ── */}
            <group position={[0.22, 0.23, 0]}>
                {/* Corps principal */}
                <mesh position={[0, 0.06, 0]} castShadow>
                    <capsuleGeometry args={[0.045, 0.08, 16, 32]} />
                    <meshStandardMaterial map={cactusTexture} roughness={0.75} />
                </mesh>
                {/* Ramification gauche */}
                <mesh position={[0.045, 0.03, 0]} rotation={[0, 0, -Math.PI / 5]} castShadow>
                    <capsuleGeometry args={[0.025, 0.04, 16, 24]} />
                    <meshStandardMaterial map={cactusTexture} roughness={0.75} />
                </mesh>
            </group>

        </group>
    );
}