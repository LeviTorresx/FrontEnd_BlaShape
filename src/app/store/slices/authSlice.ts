import { Carpenter } from "@/app/types/Carpenter";
import { Workshop } from "@/app/types/Workshop";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  user: Carpenter | null;
}

const isAuthenticated: AuthState = {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: isAuthenticated,
  reducers: {
    setAuthState: (state: AuthState, action: PayloadAction<AuthState>) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.user = action.payload.user;
    },
    clearAuthState: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
    setUserWorkshop: (state, action: PayloadAction<Workshop>) => {
      if (state.user) {
        state.user.workshop = action.payload;
      }
    },
  },
});

export const { setAuthState, clearAuthState, setUserWorkshop } =
  authSlice.actions;
export const authReducer = authSlice.reducer;
