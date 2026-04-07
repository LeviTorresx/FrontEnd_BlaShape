import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import { authApi } from "../services/authApi";
import { authReducer } from "./slices/authSlice";
import furnitureReducer from "./slices/furnitureSlice";
import { workshopApi } from "../services/workshopApi";
import { customerApi } from "../services/customersApi";
import customerReducer from "./slices/customerSlice";
import materialReducer from "./slices/materialSlice";
import piecesReducer from "./slices/piecesSlice";
import { mockMaterialApi } from "../services/mockMaterialApi";
import { furnitureApi } from "../services/furnitureApi";
import { monetizationApi, stripeApi } from "../services/paymentApi";
import subscriptionReducer from "./slices/subscriptionSlice";

const persistConfig = {
  key: "auth",
  storage,
  whitelist: ["user", "isAuthenticated"],
};

const rootReducer = combineReducers({
  auth: persistReducer(persistConfig, authReducer),

  [authApi.reducerPath]: authApi.reducer,
  [workshopApi.reducerPath]: workshopApi.reducer,
  [customerApi.reducerPath]: customerApi.reducer,
  [furnitureApi.reducerPath]: furnitureApi.reducer,
  [mockMaterialApi.reducerPath]: mockMaterialApi.reducer,
  [monetizationApi.reducerPath]: monetizationApi.reducer,
  [stripeApi.reducerPath]: stripeApi.reducer,

  customers: customerReducer,
  materials: materialReducer,
  pieces: piecesReducer,
  furnitures: furnitureReducer,
  subscription: subscriptionReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      authApi.middleware,
      workshopApi.middleware,
      customerApi.middleware,
      furnitureApi.middleware,
      monetizationApi.middleware,
      stripeApi.middleware,
      mockMaterialApi.middleware
    ),
});

export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
