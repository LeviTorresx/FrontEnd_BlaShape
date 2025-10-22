import { createSlice } from "@reduxjs/toolkit";
import { Customer } from "@/app/types/Customer";
import { customerApi } from "@/app/services/customersApi";

interface CustomerState {
  list: Customer[];
}

const initialState: CustomerState = {
  list: [],
};

const customerSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      customerApi.endpoints.getCustomers.matchFulfilled,
      (state, { payload }) => {
        state.list = payload;
      }
    );
  },
});

export default customerSlice.reducer;
