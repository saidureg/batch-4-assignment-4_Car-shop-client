import { baseApi } from "../../api/baseApi";

const carManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCar: builder.mutation({
      query: (body) => ({
        url: "/cars",
        method: "POST",
        body,
      }),
      invalidatesTags: ["cars"],
    }),
    updateCar: builder.mutation({
      query: ({ id, body }) => ({
        url: `/cars/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["cars"],
    }),
    deleteCar: builder.mutation({
      query: (id) => ({
        url: `/cars/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["cars"],
    }),
  }),
});

export const {
  useCreateCarMutation,
  useUpdateCarMutation,
  useDeleteCarMutation,
} = carManagementApi;
