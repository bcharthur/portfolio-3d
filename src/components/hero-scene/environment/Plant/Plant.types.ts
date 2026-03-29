export type Common3DProps = {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
};

export type LeafProps = {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  color?: string;
  tilt?: number;
  length?: number;
  width?: number;
  bend?: number;
};
