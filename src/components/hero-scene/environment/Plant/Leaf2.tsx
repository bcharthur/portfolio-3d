import LeafBase from './LeafBase.tsx';
import { LeafProps } from './Plant.types.ts';

export default function Leaf2(props: LeafProps) {
  return (
    <LeafBase
      {...props}
      color="#8be01f"
      tilt={-0.08}
      length={0.24}
      width={0.078}
      bend={-0.22}
    />
  );
}
