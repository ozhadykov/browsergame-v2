import { defineConfig } from 'vite';
import PluginInspect from "vite-plugin-inspect";
import eslint from 'vite-plugin-eslint';


export default defineConfig({
  plugins: [
    PluginInspect(),
    eslint()
  ]
})