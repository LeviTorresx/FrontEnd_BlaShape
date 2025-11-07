import { createSlice } from "@reduxjs/toolkit";
import { Material } from "@/app/types/Material";
import { mockMaterialApi } from "@/app/services/mockMaterialApi";
import { mock_MATERIALS } from "@/app/mocks/mockMaterials";

interface MaterialState {
  list: Material[];
}

const initialState: MaterialState = {
  list: mock_MATERIALS,
};

const materialSlice = createSlice({
  name: "materials",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      mockMaterialApi.endpoints.getMaterials.matchFulfilled,
      (state, { payload }) => {
        state.list = payload;
      }
    );
  },
});

export default materialSlice.reducer;
