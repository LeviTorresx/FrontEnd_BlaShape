import { createSlice } from "@reduxjs/toolkit";
import { cuttingApi } from "@/app/services/cuttingApi";
import { SheetPreviewDTO } from "@/app/types/SheetPreview";


interface CuttingState {
  previews: SheetPreviewDTO[];
}

const initialState: CuttingState = {
  previews: [],
};

const cuttingSlice = createSlice({
  name: "cutting",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      cuttingApi.endpoints.generatePreviews.matchFulfilled,
      (state, { payload }) => {
        state.previews = payload;
      }
    );
  },
});

export default cuttingSlice.reducer;