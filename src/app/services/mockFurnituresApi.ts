import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { Furniture } from "../types/Furniture";
import { mock_FURNITURES as MOCK_SOURCE } from "../mocks/mockfurnitures";

let mock_FURNITURES: Furniture[] = [...MOCK_SOURCE];

const autoIds = (array: Furniture[]) =>
  array.length > 0 ? Math.max(...array.map((f) => f.furnitureId)) + 1 : 1;

export const mockFurnituresApi = createApi({
  reducerPath: "mockFurnituresApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Furnitures"],
  endpoints: (builder) => ({
    getFurniture: builder.query<Furniture[], void>({
      queryFn: async () => ({ data: mock_FURNITURES }),
      providesTags: ["Furnitures"],
    }),

    getFurnitureById: builder.query<Furniture | undefined, number>({
      queryFn: async (id) => {
        const furniture = mock_FURNITURES.find((f) => f.furnitureId === id);
        if (furniture) return { data: furniture };
        return {
          error: { status: 404, data: `Mueble con id ${id} no encontrado` },
        };
      },
      providesTags: ["Furnitures"],
    }),

    addFurniture: builder.mutation<Furniture, Partial<Furniture>>({
      queryFn: async (newFruniture) => {
        try {
          const nextId = autoIds(mock_FURNITURES);
          const furniture: Furniture = {
            ...newFruniture,
            furnitureId: nextId,
          } as Furniture;

          mock_FURNITURES = [...mock_FURNITURES, furniture];
          return { data: furniture };
        } catch (error) {
          return {
            error: {
              status: 500,
              data:
                "Ocurrió un error al agregar el mueble: " +
                (error as Error).message,
            },
          };
        }
      },
      invalidatesTags: ["Furnitures"],
    }),

    updateFurniture: builder.mutation<Furniture, Furniture>({
      queryFn: async (updateFurniture) => {
        try {
          const exits = mock_FURNITURES.some(
            (f) => f.furnitureId === updateFurniture.furnitureId
          );

          if (!exits) {
            return { error: { status: 404, data: "Mueble no encontrado" } };
          }

          mock_FURNITURES = mock_FURNITURES.map((f) =>
            f.furnitureId === updateFurniture.furnitureId
              ? { ...f, ...updateFurniture }
              : f
          );

          const updated = mock_FURNITURES.find(
            (f) => f.furnitureId === updateFurniture.furnitureId
          )!;
          return { data: updated };
        } catch (error) {
          return {
            error: {
              status: 500,
              data:
                "Error al actualizar el cliente: " + (error as Error).message,
            },
          };
        }
      },
      invalidatesTags: ["Furnitures"],
    }),
  }),
});

export const {
  useGetFurnitureQuery,
  useAddFurnitureMutation,
  useUpdateFurnitureMutation,
  useGetFurnitureByIdQuery,
} = mockFurnituresApi;
