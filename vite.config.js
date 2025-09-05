import { fileURLToPath, URL } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "auto",
      includeAssets: ["favicon.ico"],
      manifest: {
        name: "Mood Swwing",
        short_name: "Mowing",
        description: "web optimaze something jus get it though",
        theme_color: "#1BE7FF",
        icons: [
          {
            src: "/mood.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/mood.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
        screenshots: [
          {
            src: "/ss/s1.png",
            form_factor: "narrow",
          },
          {
            src: "/ss/s2.png",
            form_factor: "narrow",
          },
          {
            src: "/ss/s3.png",
            form_factor: "narrow",
          },
          {
            src: "/ss/s4.png",
            form_factor: "narrow",
          },
          {
            src: "/ss/addswing.png",
            form_factor: "wide",
          },
          {
            src: "/ss/homeswing.png",
            form_factor: "wide",
          },
        ],
      },
      workbox: {
        skipWaiting: true,
        clientsClaim: true,
      },
      devOptions: {
        enabled: true,
      },
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    open: true,
  },
  build: {
    minify: "esbuild",
  },
});
