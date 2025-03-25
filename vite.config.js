import { defineConfig } from "vite";
import WorkerPlugin from "vite-plugin-worker";
import { quasar } from "@quasar/vite-plugin";

export default defineConfig({
  base: process.env.VITE_CAPACITOR ? '/' : '/price/',
  plugins: [
    WorkerPlugin(), // <== Плагин для поддержки воркеров
    quasar({ sassVariables: "src/quasar-variables.sass" }),
  ],
  optimizeDeps: {
    exclude: ['pdfjs-dist'], // Если нужно исключить библиотеки для оптимизации
  },
  build: {
    rollupOptions: {
      external: ['pdf.worker.mjs'], // Убедитесь, что ваш worker не будет включен в bundle
      output: {
        assetFileNames: process.env.VITE_CAPACITOR ? '[name][ext]' : 'price/[name][ext]',
      },
    },
  },
});
