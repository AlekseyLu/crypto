import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const marketDataApiHeaders = {
  accept: "application/json",
  "X-API-KEY": import.meta.env.VITE_API_KEY,
};

const baseUrl = import.meta.env.VITE_BASE_URL;

const createRequest = (url: string) => ({
  url,
  headers: marketDataApiHeaders,
});

export const marketDataApi = createApi({
  reducerPath: "marketDataApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getMarketData: builder.query({
      query: () => createRequest("/markets"),
    }),
  }),
});

export const { useGetMarketDataQuery } = marketDataApi;
