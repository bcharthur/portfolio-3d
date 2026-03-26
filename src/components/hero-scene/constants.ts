import { Vec3 } from './types';

export const COLORS = {
  skin: '#d7b187',
  shirt: '#1d2438',
  pants: '#0f1726',
  hairTop: '#0a0e17',
  hairSide: '#1a1f2e',
  deskTop: '#f2f0ee',
  deskLeg: '#d0aa78',
  chairSeat: '#f0efee',
  chairFrame: '#80859a',
  monitorMain: '#2e2941',
  monitorAlt: '#3f3957',
};

export const DEFAULT_ROTATION: Vec3 = [0, 0, 0];

export const DESK_LAYOUT = {
  deskPosition: [-1, 0, -0.1] as Vec3,
  frontMonitorPosition: [0.5, 1.04, -0.4] as Vec3,
  leftMonitorPosition: [-0.8, 1.04, -0.16] as Vec3,
  leftMonitorRotation: [0, 0.5, 0] as Vec3,
  keyboardPosition: [0.96, 1.04, 0.3] as Vec3,
  mousePosition: [1.46, 1.04, 0.28] as Vec3,
  mugPosition: [1.92, 1.1, 0.34] as Vec3,
  pencilCupPosition: [0.28, 1.1, 0.18] as Vec3,
  chairPosition: [0.22, 0, 0.98] as Vec3,
  personPosition: [0.28, 0.03, 0.88] as Vec3,
};
