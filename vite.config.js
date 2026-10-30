import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: { allowedHosts: ['terminal.local'], proxy: { '/api': {target:'https://visual-quran.kalifs.workers.dev',changeOrigin:true}, '/media': {target:'https://visual-quran.kalifs.workers.dev',changeOrigin:true} } },
  build: { outDir: 'dist' }
});
