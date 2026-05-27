import { FurnitureRequest, FurnitureResponse } from "../types/Furniture";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface FurnitureMessage {
  message: string;
}

const cleanData = <T extends object>(data: T): Omit<T, "documentURL" | "imageInitURL" | "imageEndURL"> => {
  const rest = { ...data } as Record<string, unknown>;
  delete rest.documentURL;
  delete rest.imageInitURL;
  delete rest.imageEndURL;
  return rest as Omit<T, "documentURL" | "imageInitURL" | "imageEndURL">;
};

export const furnitureApi = createApi({
  reducerPath: "furnitureApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/furniture`,
    credentials: "include",
  }),
  tagTypes: ["Furniture"], // <-- declaras un tag
  endpoints: (builder) => ({
    getAllFurnitures: builder.query<FurnitureResponse[], void>({
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
        const cleanedData = cleanData(data);
        formData.append("data", JSON.stringify(cleanedData));
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

export const {
  useCreateFurnitureMutation,
  useUpdateFurnitureMutation,
  useGetAllFurnituresQuery,
} = furnitureApi;
