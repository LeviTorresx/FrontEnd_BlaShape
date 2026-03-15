// src/app/services/authApi.ts
import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./axiosBaseQuery";
import { Carpenter, CarpenterDTO } from "../types/Carpenter";

interface LoginRequest {
  email: string;
  password: string;
}

interface AuthResponse {
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

    send2FA: builder.mutation<string, void>({
      query: () => ({
        url: "/send-2fa",
        method: "POST",
      }),
    }),

    verify2FA: builder.mutation<string, string>({
      query: (code) => ({
        url: `/verify-2fa?code=${code}`,
        method: "POST",
      }),
    }),

    resetPassword: builder.mutation<string, string>({
      query: (newPassword) => ({
        url: `/reset-password?newPassword=${newPassword}`,
        method: "POST",
      }),
    }),

    verifyResetCode: builder.mutation<string, { email: string; code: string }>({
      query: (body) => ({
        url: "/verify-reset-code",
        method: "POST",
        data: body,
      }),
    }),

    forgotPassword: builder.mutation<string, string>({
      query: (email) => ({
        url: "/forgot-password",
        method: "POST",
        data: { email },
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
  useSend2FAMutation,
  useVerify2FAMutation,
  useResetPasswordMutation,
  useVerifyResetCodeMutation,
  useForgotPasswordMutation,
  useGetProfileQuery,
  useLazyGetProfileQuery,
  useLogoutMutation,
  useRegisterMutation,
  useEditProfileMutation,
} = authApi;
