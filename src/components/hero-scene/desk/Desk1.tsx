import { COLORS, DEFAULT_ROTATION } from '../constants';
import { Common3DProps } from '../types';

export default function Desk1({
  position = [0, 0, 0],
  rotation = DEFAULT_ROTATION,
}: Common3DProps) {
  const DESK_LENGTH = 2;
  const DESK_WIDTH = 1.08;
  const DESK_THICKNESS = 0.08;

  const LEG_WIDTH = 0.1;
  const LEG_HEIGHT = 0.72;
  const LEG_DEPTH = 0.1;

  const TABLE_TOP_Y = 0.80;
  const LEG_Y = TABLE_TOP_Y - DESK_THICKNESS / 2 - LEG_HEIGHT / 2;

  const LEG_OFFSET_X = 0.18;
  const LEG_OFFSET_Z = 0.18;
  const DESK_Z_START = -0.2;

  const topPosition: [number, number, number] = [
    DESK_LENGTH / 2,
    TABLE_TOP_Y,
    DESK_Z_START + DESK_WIDTH / 2,
  ];

  const legPositions: [number, number, number][] = [
    [LEG_OFFSET_X, LEG_Y, DESK_Z_START + LEG_OFFSET_Z],
    [DESK_LENGTH - LEG_OFFSET_X, LEG_Y, DESK_Z_START + LEG_OFFSET_Z],
    [LEG_OFFSET_X, LEG_Y, DESK_Z_START + DESK_WIDTH - LEG_OFFSET_Z],
    [DESK_LENGTH - LEG_OFFSET_X, LEG_Y, DESK_Z_START + DESK_WIDTH - LEG_OFFSET_Z],
  ];

  return (
    <group position={position} rotation={rotation}>
      <mesh position={topPosition} castShadow receiveShadow>
        <boxGeometry args={[DESK_LENGTH, DESK_THICKNESS, DESK_WIDTH]} />
        <meshStandardMaterial color={COLORS.deskTop} roughness={0.88} />
      </mesh>

      {legPositions.map((legPosition, i) => (
        <mesh key={i} position={legPosition} castShadow receiveShadow>
          <boxGeometry args={[LEG_WIDTH, LEG_HEIGHT, LEG_DEPTH]} />
          <meshStandardMaterial color={COLORS.deskLeg} roughness={0.82} />
        </mesh>
      ))}
    </group>
  );
}
