import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { ThemeProvider } from "./components/ThemeProvider.tsx";
import { logVitals } from "./lib/vitals.ts";
import { initIframeEmbed } from "./lib/iframe-embed.ts";
import "./index.css";

console.log("[v0] main.tsx loading...");
console.log("[v0] document.location:", window.location.href);
console.log("[v0] document.baseURI:", document.baseURI);

// Service worker disabled — was caching stale HTML pointing at old hashed
// assets, causing blank pages after deploys. Unregister any existing SW.
if ("serviceWorker" in navigator) {
  console.log("[v0] Unregistering service workers...");
  navigator.serviceWorker.getRegistrations?.().then((regs) => {
    console.log("[v0] Found", regs.length, "service workers");
    regs.forEach((r) => r.unregister());
  }).catch((err) => {
    console.log("[v0] SW unregister error:", err.message);
  });
}

console.log("[v0] Finding root element...");
const rootElement = document.getElementById("root");
console.log("[v0] Root element found:", !!rootElement);
console.log("[v0] Root element:", rootElement);

if (!rootElement) {
  console.error("[v0] CRITICAL: Could not find #root element in DOM!");
  console.error("[v0] Available elements:", document.body.innerHTML);
}

console.log("[v0] Calling logVitals()...");
logVitals();

console.log("[v0] Calling initIframeEmbed()...");
initIframeEmbed();

console.log("[v0] Creating React root...");
const root = createRoot(rootElement!);

console.log("[v0] Rendering App...");
root.render(
  <ThemeProvider>
    <App />
  </ThemeProvider>
);

console.log("[v0] App rendered successfully!");
