import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@components": "/src/components",
      "@composables": "/src/composables",
      "@utils": "/src/utils",
      "@types": "/src/types",
    },
  },
});
