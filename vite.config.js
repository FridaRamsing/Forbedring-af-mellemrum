import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import pkg from "./package.json" with { type: "json" };

function productionCsp() {
  return {
    name: "mellemrum-production-csp",
    apply: "build",
    transformIndexHtml() {
      return [
        {
          tag: "meta",
          attrs: {
            "http-equiv": "Content-Security-Policy",
            content:
              "default-src 'self'; base-uri 'self'; object-src 'none'; script-src 'self'; style-src 'self'; img-src 'self' data: https:; connect-src 'self' https://*.supabase.co; form-action 'self'"
          },
          injectTo: "head"
        }
      ];
    }
  };
}

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  return {
    plugins: [react(), productionCsp()],
    base: command === "serve" ? "/" : pkg.base
  };
});
