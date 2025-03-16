import { TCar, TQueryParam, TResponseRedux } from "../../../types";
import { baseApi } from "../../api/baseApi";

const carApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCars: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/cars",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["cars"],
      transformResponse: (response: TResponseRedux<TCar[]>) => {
        return {
          data: response.data,
        };
      },
    }),

    getCarById: builder.query({
      query: (id: string) => {
        return {
          url: `/cars/${id}`,
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<TCar>) => {
        return {
          data: response.data,
        };
      },
    }),
  }),
});

export const { useGetAllCarsQuery, useGetCarByIdQuery } = carApi;
