import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const root = ReactDOM.createRoot(document.getElementById("root"));
const queryClient=new QueryClient();
root.render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <App />
     
    </BrowserRouter>
    </QueryClientProvider>
  </Provider>
);
