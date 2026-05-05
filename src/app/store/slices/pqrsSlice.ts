import { createSlice } from "@reduxjs/toolkit";
import { pqrsApi } from "@/app/services/pqrsApi";
import { Pqrs } from "@/app/types/Pqrs";

interface PqrsState {
  list: Pqrs[];
}

const initialState: PqrsState = { list: [] };

const pqrsSlice = createSlice({
  name: "pqrs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      pqrsApi.endpoints.getPqrsByCarpenter.matchFulfilled,
      (state, { payload }) => {
        state.list = payload;
      }
    );
  },
});

export default pqrsSlice.reducer;