export interface Piece {
  pieceId?: number;
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

export type gruopedPieces = {
  key: string;
  materialname: string;
  colorName: string;
  ColorHex: string;
  thickness: number;
  pieces: Piece[];
};

