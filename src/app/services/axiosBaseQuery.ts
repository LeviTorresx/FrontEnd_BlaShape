import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { BaseQueryFn } from "@reduxjs/toolkit/query/react";

interface AxiosBaseQueryArgs {
  url: string;
  method: AxiosRequestConfig["method"];
  data?: AxiosRequestConfig["data"];
  params?: AxiosRequestConfig["params"];
  headers?: AxiosRequestConfig["headers"];
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
  async ({ url, method, data, params, headers }) => {
    try {
      const result = await axios({
        url: baseUrl + url,
        method,
        data,
        params,
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
      });

      let responseData = result.data;

      // Normalización automática de { message }
      if (
        responseData &&
        typeof responseData === "object" &&
        "message" in responseData &&
        Object.keys(responseData).length === 1
      ) {
        responseData = responseData.message;
      }

      return { data: responseData };
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;

      return {
        error: {
          status: axiosError.response?.status,
          data:
            axiosError.response?.data ?? {
              message: axiosError.message,
            },
        },
      };
    }
  };
  