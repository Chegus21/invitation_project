import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/invitation_project/', // 👈 este valor debe coincidir
  plugins: [react()],
});