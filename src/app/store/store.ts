import { configureStore } from "@reduxjs/toolkit";
import { mockCustomersApi } from "../services/mockCustomersApi";
import { mockFurnituresApi } from "../services/mockFurnituresApi";
import { mockAlertsApi } from "../services/mockAlertsApi";
import { mockWorkshopApi } from "../services/mockWorkshopApi";

export const store = configureStore({
  reducer: {
    [mockCustomersApi.reducerPath]: mockCustomersApi.reducer,
    [mockFurnituresApi.reducerPath]: mockFurnituresApi.reducer,
    [mockAlertsApi.reducerPath]: mockAlertsApi.reducer,
    [mockWorkshopApi.reducerPath]: mockWorkshopApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      mockCustomersApi.middleware,
      mockFurnituresApi.middleware,
      mockAlertsApi.middleware,
      mockWorkshopApi.middleware
    ),
});
