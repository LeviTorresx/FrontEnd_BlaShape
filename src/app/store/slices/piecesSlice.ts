import { Piece } from "@/app/types/Piece";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PeicesState {
  list: Piece[];
}

const initialState: PeicesState = {
  list: [],
};

export function mergePieces(pieces: Piece[]): Piece[] {
  const merged: Piece[] = [];

  for (const p of pieces) {
    const existing = merged.find(
      (m) => m.width === p.width && m.height === p.height
    );

    if (existing) {
      existing.quantity += Number(p.quantity);
    } else {
      merged.push({ ...p });
    }
  }

  return merged;
}

const piecesSlice = createSlice({
  name: "pieces",
  initialState,
  reducers: {
    addPiece: (state, action: PayloadAction<Piece>) => {
      const newPiece = {
        ...action.payload,
        pieceId: state.list.length + 1,
      };

      state.list = mergePieces([...state.list, newPiece]);
    },

    setPieces(state, action: PayloadAction<Piece[]>) {
      state.list = action.payload;
    },

    removePiece: (state, action: PayloadAction<number>) => {
      state.list = state.list.filter((p) => p.pieceId !== action.payload);
    },

    editPiece: (state, action: PayloadAction<Piece>) => {
      const updated = action.payload;

      // reemplazar la pieza editada
      const updatedList = state.list.map((p) =>
        p.pieceId === updated.pieceId ? updated : p
      );

      // fusionar por medidas
      state.list = mergePieces(updatedList);
    },

    rotatePiece: (state, action: PayloadAction<number>) => {
      state.list = state.list.map((p) => {
        if (p.pieceId === action.payload) {
          return {
            ...p,
            width: p.height,
            height: p.width,
          };
        }
        return p;
      });
    },
    clearPieces: (state) => {
      state.list = [];
    },
  },
});

export const {
  addPiece,
  removePiece,
  editPiece,
  rotatePiece,
  setPieces,
  clearPieces,
} = piecesSlice.actions;
export default piecesSlice.reducer;
