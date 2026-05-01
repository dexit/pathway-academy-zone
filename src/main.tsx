import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { ThemeProvider } from "./components/ThemeProvider.tsx";
import { logVitals } from "./lib/vitals.ts";
import { initIframeEmbed } from "./lib/iframe-embed.ts";
import "./index.css";

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js", { scope: "/" })
      .catch(() => { /* SW registration failure is non-fatal */ })
  })
}

logVitals()
initIframeEmbed()

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <App />
  </ThemeProvider>
);