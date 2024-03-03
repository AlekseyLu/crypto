import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { cryptoApi } from "./slices/cryptoApi";
import { cryptoNewsApi } from "./slices/newsApi";
import { marketDataApi } from "./slices/marketDataApi";
import { exchangesApi } from "./slices/exchangesApi";

export const store = configureStore({
  reducer: {
    [cryptoApi.reducerPath]: cryptoApi.reducer,
    [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
    [marketDataApi.reducerPath]: marketDataApi.reducer,
    [exchangesApi.reducerPath]: exchangesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      cryptoApi.middleware,
      cryptoNewsApi.middleware,
      marketDataApi.middleware,
      exchangesApi.middleware
    ),
});

setupListeners(store.dispatch);
