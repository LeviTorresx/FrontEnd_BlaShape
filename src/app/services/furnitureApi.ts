import { Furniture, FurnitureDTO } from "../types/Furniture";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface FurnitureMessage {
  message: string;
}

export const furnitureApi = createApi({
  reducerPath: "furnitureApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api_BS/furniture",
  }), // Ajusta tu base URL
  endpoints: (builder) => ({
    getAllFurnitures: builder.query<Furniture[], void>({
      query: () => ({
        url: "/all",
        method: "GET",
        credentials: 'include'
      }),
    }),
    createFurniture: builder.mutation<
      FurnitureMessage,
      {
        data: any; // tu objeto furniture sin archivos
        imageInit: File;
        imageEnd?: File;
        document?: File;
      }
    >({
      query: ({ data, imageInit, imageEnd, document }) => {
        const formData = new FormData();
        formData.append("data", JSON.stringify(data));
        formData.append("imageInit", imageInit);
        if (imageEnd) formData.append("imageEnd", imageEnd);
        if (document) formData.append("document", document);

        return {
          url: "/create",
          method: "POST",
          body: formData,
        };
      },
    }),
    updateFurniture: builder.mutation<
      FurnitureMessage,
      {
        id: number;
        data: any;
        imageInit?: File;
        imageEnd?: File;
        document?: File;
      }
    >({
      query: ({ id, data, imageInit, imageEnd, document }) => {
        const formData = new FormData();
        formData.append("data", JSON.stringify(data));
        if (imageInit) formData.append("imageInit", imageInit);
        if (imageEnd) formData.append("imageEnd", imageEnd);
        if (document) formData.append("document", document);

        return {
          url: `/edit/${id}`,
          method: "PUT",
          body: formData,
        };
      },
    }),
  }),
});

export const { useCreateFurnitureMutation, useUpdateFurnitureMutation, useGetAllFurnituresQuery } =
  furnitureApi;
