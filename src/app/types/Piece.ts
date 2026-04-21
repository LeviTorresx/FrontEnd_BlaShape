import { Color, ColorDTO } from "./Color";

export interface Piece {
  pieceId?: number;
  name: string;
  quantity: number;
  height: number;
  width: number;
  thickness: number;
  color: Color;
  materialName: string;
  rotationAllowed: boolean;
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

export function mapPieceToDTO(piece: Piece): PieceDTO {
  return {
    pieceId: piece.pieceId,
    name: "",
    quantity: piece.quantity,
    height: piece.height,
    width: piece.width,
    thickness: piece.thickness,
    materialName: piece.materialName,
    rotationAllowed: true,

    colorDTO: {
      name: piece.color.name,
      hex: piece.color.hex,
    },

    edgesDTO: {
      top: piece.edges.top,
      bottom: piece.edges.bottom,
      left: piece.edges.left,
      right: piece.edges.right,
    },
  };
}

export function mapPieceDTOToPiece(dto: PieceDTO): Piece {
  return {
    pieceId: dto.pieceId,
    name: "",
    quantity: dto.quantity,
    height: dto.height,
    width: dto.width,
    thickness: dto.thickness,
    materialName: dto.materialName,
    rotationAllowed: dto.rotationAllowed,
    color: {
      name: dto.colorDTO.name,
      hex: dto.colorDTO.hex,
    }, 
    edges: {
      top: dto.edgesDTO.top,
      bottom: dto.edgesDTO.bottom,
      left: dto.edgesDTO.left,
      right: dto.edgesDTO.right,
    },
  };
}
