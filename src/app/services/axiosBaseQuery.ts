import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { BaseQueryFn } from "@reduxjs/toolkit/query/react";

interface AxiosBaseQueryArgs {
  url: string;
  method: AxiosRequestConfig["method"];
  data?: AxiosRequestConfig["data"];
  params?: AxiosRequestConfig["params"];
}

interface AxiosBaseQueryError {
  status?: number;
  data?: unknown;
}

export const axiosBaseQuery =
  ({ baseUrl }: { baseUrl: string } = { baseUrl: "" }): BaseQueryFn<
    AxiosBaseQueryArgs,
    unknown,
    AxiosBaseQueryError
  > =>
  async ({ url, method, data, params }) => {
    try {
      const result = await axios({
        url: baseUrl + url,
        method,
        data,
        params,
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      return { data: result.data };
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;

      return {
        error: {
          status: axiosError.response?.status,
          data: axiosError.response?.data || {
            message: axiosError.message,
          },
        },
      };
    }
  };
