type LineDef = {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
};

type CodeScreenLinesProps = {
  lines: LineDef[];
};

export default function CodeScreenLines({ lines }: CodeScreenLinesProps) {
  return (
      <group position={[0, 0, 0.006]} renderOrder={2}>
        {lines.map((line, i) => (
            <mesh key={i} position={[line.x, line.y, 0]} renderOrder={2}>
              <planeGeometry args={[line.width, line.height]} />
              <meshBasicMaterial
                  color={line.color}
                  toneMapped={false}
                  depthWrite={false}
              />
            </mesh>
        ))}
      </group>
  );
}