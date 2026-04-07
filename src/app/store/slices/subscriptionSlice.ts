import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Subscription } from "@/app/types/Subscription";
import { paymentApi } from "@/app/services/paymentApi";

interface SubscriptionState {
  current: Subscription | null;
}

const initialState: SubscriptionState = {
  current: null,
};

const subscriptionSlice = createSlice({
  name: "subscription",
  initialState,
  reducers: {
    setSubscription: (state, action: PayloadAction<Subscription>) => {
      state.current = action.payload;
    },
    clearSubscription: (state) => {
      state.current = null;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      paymentApi.endpoints.getCurrentSubscription.matchFulfilled,
      (state, { payload }) => {
        state.current = payload;
      }
    );
  },
});

export const { setSubscription, clearSubscription } = subscriptionSlice.actions;
export default subscriptionSlice.reducer;