export type Item = {
  width: number;
  height: number;
  rotated?: boolean;
  x?: number;
  y?: number;
  color: { hex: string };
  id?: string | number;
  edges?: {
    top?: boolean;
    bottom?: boolean;
    left?: boolean;
    right?: boolean;
  };
};

