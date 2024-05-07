import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default ({mode}) => {
  process.env = {...process.env, ...loadEnv(mode, process.cwd())};

  return defineConfig({
    plugins: [react()],
    base: "/",
    server: {
      port: parseInt(process.env.VITE_PORT),
      proxy: {
        "/api": {
          target: process.env.VITE_URI,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, "/api")
        }
      }
    }
  })
}
