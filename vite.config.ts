import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'PopoverJs',
      fileName: (format) => `popover-js.${format}.js`
    },
    rollupOptions: {
      // Ensure external dependencies are not bundled into the library
      external: [],
      output: {
        globals: {}
      }
    }
  }
});
