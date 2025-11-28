import { Furniture, FurnitureDTO, FurnitureRequest } from "../types/Furniture";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface FurnitureMessage {
  message: string;
}

export const furnitureApi = createApi({
  reducerPath: "furnitureApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api_BS/furniture",
    credentials: "include",
  }),
  tagTypes: ["Furniture"], // <-- declaras un tag
  endpoints: (builder) => ({
    getAllFurnitures: builder.query<Furniture[], void>({
      query: () => "/all",
      providesTags: ["Furniture"], // <-- el query "proporciona" este tag
    }),
    createFurniture: builder.mutation<
      FurnitureMessage,
      {
        data: Partial<FurnitureRequest>;
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
      invalidatesTags: ["Furniture"], // <-- invalidamos el tag, RTK refetch automáticamente
    }),
    updateFurniture: builder.mutation<
      FurnitureMessage,
      {
        id: number;
        data: Partial<FurnitureRequest>;
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
      invalidatesTags: ["Furniture"], // <-- invalidamos para que getAll se refetch
    }),
  }),
});


export const { useCreateFurnitureMutation, useUpdateFurnitureMutation, useGetAllFurnituresQuery } =
  furnitureApi;
