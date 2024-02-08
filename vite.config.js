import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    WEATHER_API: JSON.stringify("https://api.open-meteo.com/v1"),
  },
});
