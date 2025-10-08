import { configureStore } from "@reduxjs/toolkit";
import { mockCustomersApi } from "../services/mockCustomersApi";

export const store = configureStore({
  reducer: {
    [mockCustomersApi.reducerPath]: mockCustomersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(mockCustomersApi.middleware),
});
