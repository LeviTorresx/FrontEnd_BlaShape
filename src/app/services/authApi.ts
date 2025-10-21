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

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: axiosBaseQuery({ baseUrl: "http://localhost:8080/api_BS" }),
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        data: body,
      }),
    }),

    register: builder.mutation<AuthResponse, CarpenterDTO>({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        data: body,
      }),
    }),

    getProfile: builder.query<Carpenter, void>({
      query: () => ({
        url: "/auth/me",
        method: "GET",
      }),
    }),

    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useGetProfileQuery,
  useLogoutMutation,
  useRegisterMutation,
} = authApi;
