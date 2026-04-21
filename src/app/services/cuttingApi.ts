import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./axiosBaseQuery";
import { SheetPreviewDTO } from "../types/SheetPreview";
import { PreviewRequestDTO } from "../types/PreviewRequest";

interface CuttingResponse {
  message: string;
}

export const cuttingApi = createApi({
  reducerPath: "cuttingApi",
  baseQuery: axiosBaseQuery({
    baseUrl: "http://localhost:8080/api_BS/cutting",
  }),
    tagTypes: ["Cutting"],
    endpoints: (builder) => ({ 
        generatePreviews: builder.mutation<SheetPreviewDTO[], PreviewRequestDTO>({
            query: (previewRequest) => ({
                url: "/cutting_plan/preview_svgs",
                method: "POST",
                data: previewRequest
            }),
            invalidatesTags: ["Cutting"],
        })
     }),
});

export const { useGeneratePreviewsMutation } = cuttingApi;