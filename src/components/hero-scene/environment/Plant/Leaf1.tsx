import LeafBase from './LeafBase.tsx';
import { LeafProps } from './Plant.types.ts';

export default function Leaf1(props: LeafProps) {
  return (
    <LeafBase
      {...props}
      color="#79d91b"
      tilt={0.15}
      length={0.28}
      width={0.085}
      bend={0.24}
    />
  );
}
