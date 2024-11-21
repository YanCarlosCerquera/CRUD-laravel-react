import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import fs from "fs/promises";
import path from 'path';




// https://vitejs.dev/config/
// can process .js containing .JSX
export default defineConfig({
  resolve: {
    alias: {
      src: resolve(__dirname, "src"),
      plugins: resolve(__dirname, "plugins"),
      // '@mui/core': '@mui/core',
      // '@mui/system': '@mui/system',
      // '@mui/utils': '@mui/utils',
      // '@mui/private-theming': '@mui/private-theming',

      // import module without showing relative path of components
      // 'imageUpload': path.resolve(__dirname, './src/components/upload-images/imageUpload'), // or
      // imageUpload: path.resolve(__dirname, 'src/components/upload-images/imageUpload'),
      // muiStyleCustomization: path.resolve(__dirname, 'src/components/mui-customizations/styleCustomization')
      utilities: path.resolve(__dirname, 'src/utilities'),
      static: path.resolve(__dirname, 'src/static'),
      router: path.resolve(__dirname, 'src/router'),
      pages: path.resolve(__dirname, 'src/pages'),
      errors: path.resolve(__dirname, 'src/errors'),
      messages: path.resolve(__dirname, 'src/messages'),
      components: path.resolve(__dirname, 'src/components'),
      charts: path.resolve(__dirname, 'src/charts'),
      auths: path.resolve(__dirname, 'src/auths'),
      assets: path.resolve(__dirname, 'src/assets'),
    },
  },
  esbuild: {
    loader: "jsx",
    include: /src\/.*\.jsx?$/,
    exclude: [],
  },
  optimizeDeps: {
    esbuildOptions: {
      plugins: [
        {
          name: "load-js-files-as-jsx",
          setup(build) {
            build.onLoad({ filter: /src\\.*\.js$/ }, async (args) => ({
              loader: "jsx",
              contents: await fs.readFile(args.path, "utf8"),
            }));
          },
        },
      ],
    },
  },
  plugins: [react()],
});
