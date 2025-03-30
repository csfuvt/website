import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { TanStackRouterVite } from '@tanstack/router-vite-plugin';
import '../website/src/i18n';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), TanStackRouterVite()],
  base: '/',
  server: {
    port: 3000, // Set the port to 3000
    host: '0.0.0.0', // Expose the server on all network interfaces
  },
});
