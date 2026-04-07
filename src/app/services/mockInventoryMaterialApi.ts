import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { InventoryMaterial } from "../types/InventoryMaterial";
import { mock_INVENTORY_MATERIALS } from "../mocks/mockInventoryMaterials";

export const mockInventoryMaterialApi = createApi({
  reducerPath: "mockInventoryMaterialApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["InventoryMaterial"],
  endpoints: (builder) => ({
    getInventoryMaterials: builder.query<InventoryMaterial[], void>({
      queryFn: async () => ({ data: mock_INVENTORY_MATERIALS }),
      providesTags: ["InventoryMaterial"],
    }),
  }),
});

export const { useGetInventoryMaterialsQuery } = mockInventoryMaterialApi;
