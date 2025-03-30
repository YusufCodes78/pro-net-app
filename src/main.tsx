import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { AppProvider } from "./contexts/app-context";

createRoot(document.getElementById("root")!).render(
  <AppProvider>
    <App />
  </AppProvider>
);
