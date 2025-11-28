import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./axiosBaseQuery";
import { FurnitureDTO } from "../types/Furniture";

export const furnitureApi = createApi({
  reducerPath: "furnitureApi",
  baseQuery: axiosBaseQuery({
    baseUrl: "http://localhost:8080/api_BS/furniture",
  }),
  tagTypes: ["Furniture"],
  endpoints: (builder) => ({
    getAllFurniture: builder.query<FurnitureDTO[], void>({
      query: () => ({
        url: "/all",
        method: "GET",
        withCredentials: true,
      }),
      providesTags: ["Furniture"],
    }),

    createFurniture: builder.mutation<
      { message: string },
      {
        furniture: FurnitureDTO;
        imageInit: File;
        imageEnd?: File;
        document?: File;
      }
    >({
      query: ({ furniture, imageInit, imageEnd, document }) => {
        const formData = new FormData();
        formData.append("data", JSON.stringify(furniture));
        formData.append("imageInit", imageInit);
        if (imageEnd) formData.append("imageEnd", imageEnd);
        if (document) formData.append("document", document);

        return {
          url: "/create",
          method: "POST",
          data: formData,
        };
      },
      invalidatesTags: ["Furniture"],
    }),
  }),
});

export const { useGetAllFurnitureQuery, useCreateFurnitureMutation } = furnitureApi;
