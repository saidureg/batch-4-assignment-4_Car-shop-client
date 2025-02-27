import { BaseQueryApi } from "@reduxjs/toolkit/query";

export type TError = {
  success: boolean;
  message: string;
  statusCode: number;
  error: {
    path: string;
    message: string;
  }[];
  stack?: string;
};

// export type TMeta = {
//   limit: number;
//   page: number;
//   total: number;
//   totalPage: number;
// };

export type TResponse<T> = {
  data?: T;
  error?: TError;
  success: boolean;
  message: string;
  statusCode: number;
};

export type TResponseRedux<T> = TResponse<T> & BaseQueryApi;

export type TQueryParam = {
  name: string;
  value: boolean | React.Key;
};
