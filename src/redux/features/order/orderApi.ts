import { TOrder, TQueryParam, TResponseRedux } from "../../../types";
import { baseApi } from "../../api/baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/orders",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["orders"],
      transformResponse: (response: TResponseRedux<TOrder[]>) => {
        return {
          data: response.data,
        };
      },
    }),

    getOrderByUserId: builder.query({
      query: (id: string) => {
        return {
          url: `/orders/${id}`,
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<TOrder>) => {
        return {
          data: response.data,
        };
      },
    }),

    createOrder: builder.mutation({
      query: (body: any) => ({
        url: "/orders",
        method: "POST",
        body,
      }),
      invalidatesTags: ["orders"],
    }),
    updateOrder: builder.mutation({
      query: ({ id, body }: { id: string; body: any }) => ({
        url: `/orders/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["orders"],
    }),
    deleteOrder: builder.mutation({
      query: (id: string) => ({
        url: `/orders/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["orders"],
    }),
    verifyOrder: builder.query({
      query: (order_id: string) => ({
        url: "orders/verify",
        params: { order_id },
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetAllOrdersQuery,
  useGetOrderByUserIdQuery,
  useCreateOrderMutation,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
  useVerifyOrderQuery,
} = orderApi;
