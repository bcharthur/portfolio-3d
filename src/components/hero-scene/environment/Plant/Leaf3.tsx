import LeafBase from './LeafBase.tsx';
import { LeafProps } from './Plant.types.ts';

export default function Leaf3(props: LeafProps) {
  return (
    <LeafBase
      {...props}
      color="#6fd116"
      tilt={0.05}
      length={0.31}
      width={0.09}
      bend={0.08}
    />
  );
}
