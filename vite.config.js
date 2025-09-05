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
        name: "Mood Swing",
        short_name: "Mowing",
        description: "What's your feeling right now? Come write it here.",
        theme_color: "#78D5D7",
        background_color: "#B4EDD2",
        display: "standalone",
        start_url: "/",
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
            src: "/ss/s1.jpg",
            form_factor: "narrow",
            label: "Home page - Your mood dashboard",
          },
          {
            src: "/ss/s2.jpg",
            form_factor: "narrow",
            label: "Add new mood entry",
          },
          {
            src: "/ss/s3.jpg",
            form_factor: "narrow",
            label: "Mood history and analytics",
          },
          {
            src: "/ss/s4.jpg",
            form_factor: "narrow",
            label: "Profile and settings page",
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
            label: "View home page",
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
