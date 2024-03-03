import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const newsApiHeaders = {
  accept: "application/json",
  "X-API-KEY": import.meta.env.VITE_API_KEY,
};

const baseUrl = import.meta.env.VITE_BASE_URL;

const createRequest = (url: string) => ({
  url,
  headers: newsApiHeaders,
});

export const cryptoNewsApi = createApi({
  reducerPath: "cryptoNewsApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: (count) => createRequest(`/news?limit=${count}`),
    }),
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;
