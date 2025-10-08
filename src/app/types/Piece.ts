export interface Piece {
  pieceId: number;
  quantity: number;
  height: number;
  width: number;
  thickness: number;
  colorName: string;
  ColorHex: string;
  materialName: string;
  edges: {
    top: boolean;
    bottom: boolean;
    left: boolean;
    right: boolean;
  };
}
