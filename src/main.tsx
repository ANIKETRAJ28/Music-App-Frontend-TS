import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Provider } from "react-redux";
import store from "./store/store.ts";
import { TooltipProvider } from "@radix-ui/react-tooltip";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <TooltipProvider>
          <App />
        </TooltipProvider>
        <Toaster />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
