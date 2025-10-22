// src/app/services/authApi.ts
import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./axiosBaseQuery";
import { Carpenter, CarpenterDTO } from "../types/Carpenter";

interface LoginRequest {
  email: string;
  password: string;
}

interface AuthResponse {
  isAuthenticated: boolean;
  message: string;
}

interface ProfileResponse {
  carpenter: Carpenter;
  message: string;
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: axiosBaseQuery({ baseUrl: "http://localhost:8080/api_BS/auth" }),
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (body) => ({
        url: "/login",
        method: "POST",
        data: body,
      }),
    }),

    editProfile: builder.mutation<ProfileResponse, Carpenter>({
      query: (body) => ({
        url: `/update-profile/${body.carpenterId}`,
        method: "PUT",
        data: body,
      }),
    }),

    register: builder.mutation<AuthResponse, CarpenterDTO>({
      query: (body) => ({
        url: "/register",
        method: "POST",
        data: body,
      }),
    }),

    getProfile: builder.query<Carpenter, void>({
      query: () => ({
        url: "/me",
        method: "GET",
      }),
    }),

    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useGetProfileQuery,
  useLazyGetProfileQuery,
  useLogoutMutation,
  useRegisterMutation,
  useEditProfileMutation,
} = authApi;
