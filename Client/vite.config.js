import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  env: {
    hostUrl: import.meta.env.VITE_HOST_URL || "http://localhost:3000", // Asigna el valor predeterminado según sea necesario
  },
});
