"use client";

import { useEffect } from "react";
import { useGetProfileQuery, useLogoutMutation } from "../services/authApi";
import { useAppDispatch, useAppSelector } from "./useRedux";
import { clearAuthState, setAuthState } from "../store/slices/authSlice";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);


  const {
    data: profileData,
    error,
    isLoading,
    isSuccess,
  } = useGetProfileQuery(undefined, {
    skip: isAuthenticated, 
  });

 
  useEffect(() => {
    if (isSuccess && profileData) {
      dispatch(setAuthState({ user: profileData, isAuthenticated: true }));
    }
  }, [isSuccess, profileData, dispatch]);


  useEffect(() => {
    if (error && "status" in error && error.status === 401) {
      dispatch(clearAuthState());
    }
  }, [error, dispatch]);

  const [logoutMutation] = useLogoutMutation();
  const logout = async () => {
    try {
      await logoutMutation().unwrap();
    } catch (err) {
      console.error("Error al cerrar sesión:", err);
    } finally {
      dispatch(clearAuthState());
    }
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    logout,
  };
};
