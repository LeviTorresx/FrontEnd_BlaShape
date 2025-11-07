import { Piece } from "@/app/types/Piece";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PeicesState {
  list: Piece[];
}

const initialState: PeicesState = {
  list: [],
};

const piecesSlice = createSlice({
  name: "pieces",
  initialState,
  reducers: {
    addPiece: (state, action: PayloadAction<Piece>) => {
      const newPiece = {
        ...action.payload,
        pieceId: state.list.length + 1,
      };
      state.list.push(newPiece);
    },

    removePiece: (state, action: PayloadAction<number>) => {
      state.list = state.list.filter((p) => p.pieceId !== action.payload);
    },
  },
});


export const {addPiece, removePiece} = piecesSlice.actions;
export default piecesSlice.reducer;