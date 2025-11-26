export type Item = {
  width: number;
  height: number;
  rotated?: boolean;
  x?: number;
  y?: number;
  color: { hex: string, name?: string };
  id?: string | number;
  edges?: {
    top?: boolean;
    bottom?: boolean;
    left?: boolean;
    right?: boolean;
  };
};

export type GroupedItems = {
  key: string;
  colorHex: string;
  colorName: string;
  items: Item[];
};