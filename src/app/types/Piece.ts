import { Color, ColorDTO } from "./Color";

export interface Piece {
  pieceId?: number;
  quantity: number;
  height: number;
  width: number;
  thickness: number;
  color: Color
  materialName: string;
  edges: {
    top: boolean;
    bottom: boolean;
    left: boolean;
    right: boolean;
  };
}

export interface PieceDTO {
  pieceId?: number;
  name: string;
  quantity: number;
  height: number;
  width: number;
  thickness: number;
  colorDTO: ColorDTO;
  materialName: string;
  rotationAllowed: boolean;
  edgesDTO: {
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

