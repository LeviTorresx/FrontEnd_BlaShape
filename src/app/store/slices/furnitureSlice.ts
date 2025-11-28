import { createSlice } from "@reduxjs/toolkit";
import { Furniture } from "@/app/types/Furniture";
import { furnitureApi } from "@/app/services/furnitureApi";

interface FurnitureState {
  list: Furniture[];
}

const initialState: FurnitureState = {
  list: [],
};

const furnitureSlice = createSlice({
  name: "furnitures",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      furnitureApi.endpoints.getAllFurnitures.matchFulfilled,
      (state, { payload }) => {
        state.list = payload;
      }
    );
  },
});

export default furnitureSlice.reducer;
