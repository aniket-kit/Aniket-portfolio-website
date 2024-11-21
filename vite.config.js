import { defineConfig } from 'vite';
import glsl from 'vite-plugin-glsl';
import { resolve } from 'path';

// Export Vite configuration using defineConfig for better typing support
export default defineConfig(({ mode }) => {
  // Common settings for both development and production
  const commonConfig = {
    plugins: [glsl()],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),  // Example alias for cleaner imports
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/styles/global.scss";`,  // Example global SCSS
        },
      },
    },
  };

  if (mode === 'development') {
    // Development-specific settings
    return {
      ...commonConfig,
      server: {
        open: true,  // Automatically open the browser on server start
        port: 4000,
        proxy: {
          '/api': 'http://localhost:4000',  // Example API proxy for development
        },
      },
      define: {
        __DEV__: true,  // Custom global constants for development mode
      },
    };
  } else {
    
    // Production-specific settings
    return {
      ...commonConfig,
      build: {
        chunkSizeWarningLimit: 1000,
        outDir: 'dist',  // Output directory for the build
        sourcemap: false,  // Disable source maps in production for smaller builds
        rollupOptions: {
          output: {
            // Remove vendor splitting as it's more relevant for large frameworks
          },
        },
      },
      define: {
        __DEV__: false,  // Custom global constants for production mode
      },
    };
  }
});