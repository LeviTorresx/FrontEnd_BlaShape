import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { Material } from "../types/Material";
import { mock_MATERIALS } from "../mocks/mockMaterials";

export const mockMaterialApi = createApi({
  reducerPath: "mockMaterialApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Material"],
  endpoints: (builder) => ({
    getMaterials: builder.query<Material[], void>({
      queryFn: async () => ({ data: mock_MATERIALS }),
      providesTags: ["Material"],
    }),
  }),
});

export const { useGetMaterialsQuery } = mockMaterialApi;
