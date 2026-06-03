import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: '/Warisha-AI-Portfolio/',
  plugins: [react()],
  server: {
    // allow localtunnel (loca.lt) hosts so external tunnels can access dev server
    allowedHosts: [".loca.lt", "localhost"],
  },
});
