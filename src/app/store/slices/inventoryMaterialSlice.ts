import { createSlice } from "@reduxjs/toolkit";
import { InventoryMaterial } from "@/app/types/InventoryMaterial";
import { mockInventoryMaterialApi } from "@/app/services/mockInventoryMaterialApi";
import { mock_INVENTORY_MATERIALS } from "@/app/mocks/mockInventoryMaterials";

interface MaterialState {
  list: InventoryMaterial[];
}

const initialState: MaterialState = {
  list: mock_INVENTORY_MATERIALS,
};

const materialSlice = createSlice({
  name: "inventoryMaterials",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      mockInventoryMaterialApi.endpoints.getInventoryMaterials.matchFulfilled,
      (state, { payload }) => {
        state.list = payload;
      }
    );
  },
});

export default materialSlice.reducer;
