import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

import { loadEnv } from 'vite';

const env = loadEnv('', process.cwd(), '');

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': env,
  },
});