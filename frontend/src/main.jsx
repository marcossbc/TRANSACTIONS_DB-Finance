import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import {   QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner.jsx";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
      staleTime: 60 * 1000,
      
    }
  }
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
    <Toaster position="top-center"/>
      <App />
    </BrowserRouter>
    <ReactQueryDevtools initialIsOpen={false} position = "bottom-right"/>
  </QueryClientProvider>
);
