import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const exchangesApiHeaders = {
  accept: "application/json",
  "X-API-KEY": import.meta.env.VITE_API_KEY,
};

const baseUrl = import.meta.env.VITE_BASE_URL;

const createRequest = (url: string) => ({
  url,
  headers: exchangesApiHeaders,
});

export const exchangesApi = createApi({
  reducerPath: "exchangesApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getExchanges: builder.query({
      query: () => createRequest("/tickers/exchanges"),
    }),
  }),
});

export const { useGetExchangesQuery } = exchangesApi;
