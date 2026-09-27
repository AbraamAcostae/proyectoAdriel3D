import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    target: 'es2020',
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      output: {
        manualChunks: {
          'three-vendor': ['three', 'three-mesh-bvh'],
          'ui-vendor': ['gsap', 'lil-gui', 'stats.js']
        }
      }
    }
  }
});
