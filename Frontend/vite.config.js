import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import compression from "vite-plugin-compression";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    compression({
      algorithm: "gzip",
      ext: ".gz",
      threshold: 10240,
      deleteOriginalAssets: false,
      filter: (file) => file.endsWith(".js") || file.endsWith(".css") || file.endsWith(".html"),
    }),
    compression({
      algorithm: "brotliCompress",
      ext: ".br",
      threshold: 10240,
      deleteOriginalAssets: false,
      filter: (file) => file.endsWith(".js") || file.endsWith(".css") || file.endsWith(".html"),
    }),
  ],
  resolve: {
    dedupe: ["react", "react-dom"],
  },
  build: {
    sourcemap: false,
    minify: "esbuild",
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/react/") || id.includes("node_modules/react-dom/")) {
            return "vendor-react";
          }
          if (id.includes("node_modules/react-router-dom/")) return "vendor-router";
          if (id.includes("node_modules/@reduxjs/toolkit/") || id.includes("node_modules/react-redux/")) return "vendor-redux";
          if (id.includes("node_modules/recharts/")) return "vendor-charts";
          if (id.includes("node_modules/axios/")) return "vendor-axios";
          if (id.includes("node_modules/react-toastify/")) return "vendor-toastify";
          if (id.includes("node_modules/react-spinners/")) return "vendor-spinners";
          if (id.includes("node_modules/lucide-react/")) return "vendor-icons-lucide";
          if (id.includes("node_modules/react-icons/")) return "vendor-icons-react";
          if (id.includes("node_modules/")) return "vendor";
        },
      },
    },
    chunkSizeWarningLimit: 800,
  },
});
