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
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/",
        icons: [
          {
            src: "/mood.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/mood.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
        screenshots: [
          {
            src: "/ss/s1.jpg",
            sizes: "390x844",
            type: "image/jpeg",
            form_factor: "narrow",
          },
          {
            src: "/ss/s2.jpg",
            sizes: "390x844",
            type: "image/jpeg",
            form_factor: "narrow",
          },
          {
            src: "/ss/s3.jpg",
            sizes: "390x844",
            type: "image/jpeg",
            form_factor: "narrow",
          },
          {
            src: "/ss/s4.jpg",
            sizes: "390x844",
            type: "image/jpeg",
            form_factor: "narrow",
          },
          {
            src: "/ss/addswing.png",
            sizes: "1280x720",
            type: "image/png",
            form_factor: "wide",
          },
          {
            src: "/ss/homeswing.png",
            sizes: "1280x720",
            type: "image/png",
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
