import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoApiHeaders = {
  accept: "application/json",
  "X-API-KEY": import.meta.env.VITE_API_KEY,
};

const baseUrl = import.meta.env.VITE_BASE_URL;

const createRequest = (url: string) => ({ url, headers: cryptoApiHeaders });

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryproCoins: builder.query({
      query: (count) => createRequest(`/coins?limit=${count}`),
    }),
    getCoinDetails: builder.query({
      query: (id) => createRequest(`/coins/${id}`),
    }),
    getCoinDetailsTimestamp: builder.query({
      query: ({ id, timestamp }) =>
        createRequest(`coins/${id}/charts?period=${timestamp}`),
    }),
  }),
});

export const {
  useGetCryproCoinsQuery,
  useGetCoinDetailsQuery,
  useGetCoinDetailsTimestampQuery,
} = cryptoApi;
