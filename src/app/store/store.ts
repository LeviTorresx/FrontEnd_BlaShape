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
import inventoryMaterialReducer from "./slices/inventoryMaterialSlice";
import piecesReducer from "./slices/piecesSlice";
import { mockInventoryMaterialApi } from "../services/mockInventoryMaterialApi";
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
  [mockInventoryMaterialApi.reducerPath]: mockInventoryMaterialApi.reducer,
  [monetizationApi.reducerPath]: monetizationApi.reducer,
  [stripeApi.reducerPath]: stripeApi.reducer,

  customers: customerReducer,
  inventoryMaterials: inventoryMaterialReducer,
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
      mockInventoryMaterialApi.middleware
    ),
});

export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
