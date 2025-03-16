import { TQueryParam, TResponseRedux, TUser } from "../../../types";

import { baseApi } from "../../api/baseApi";

const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/users",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["users"],
      transformResponse: (response: TResponseRedux<TUser[]>) => {
        return {
          data: response.data,
        };
      },
    }),

    blockUser: builder.mutation({
      query: (id: string) => ({
        url: `/admin/${id}/block`,
        method: "PATCH",
      }),
      invalidatesTags: ["users"],
    }),

    deleteUser: builder.mutation({
      query: (id: string) => ({
        url: `/admin/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["users"],
    }),

    changePassword: builder.mutation({
      query: (data) => ({
        url: "/auth/change-password",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["users"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useChangePasswordMutation,
  useBlockUserMutation,
  useDeleteUserMutation,
} = userManagementApi;
