import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";

import { mockCustomersApi } from "../services/mockCustomersApi";
import { mockFurnituresApi } from "../services/mockFurnituresApi";
import { mockAlertsApi } from "../services/mockAlertsApi";
import { mockWorkshopApi } from "../services/mockWorkshopApi";
import { authApi } from "../services/authApi";
import { authReducer } from "./slices/authSlice";


const persistConfig = {
  key: "auth",
  storage,
  whitelist: ["user", "isAuthenticated"],
};


const rootReducer = combineReducers({
  auth: persistReducer(persistConfig, authReducer),

 
  [authApi.reducerPath]: authApi.reducer,
  [mockCustomersApi.reducerPath]: mockCustomersApi.reducer,
  [mockFurnituresApi.reducerPath]: mockFurnituresApi.reducer,
  [mockAlertsApi.reducerPath]: mockAlertsApi.reducer,
  [mockWorkshopApi.reducerPath]: mockWorkshopApi.reducer,
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
      mockCustomersApi.middleware,
      mockFurnituresApi.middleware,
      mockAlertsApi.middleware,
      mockWorkshopApi.middleware
    ),
});


export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
