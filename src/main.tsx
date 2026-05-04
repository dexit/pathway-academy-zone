import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { ThemeProvider } from "./components/ThemeProvider.tsx";
import { logVitals } from "./lib/vitals.ts";
import { initIframeEmbed } from "./lib/iframe-embed.ts";
import "./index.css";

// Service worker disabled — was caching stale HTML pointing at old hashed
// assets, causing blank pages after deploys. Unregister any existing SW.
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.getRegistrations?.().then((regs) => {
    regs.forEach((r) => r.unregister());
  }).catch(() => { /* non-fatal */ });
}

logVitals()
initIframeEmbed()

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <App />
  </ThemeProvider>
);