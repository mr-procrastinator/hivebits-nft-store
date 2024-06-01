import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from "vite-plugin-svgr"

// https://vitejs.dev/config/

export default defineConfig({
  plugins: [react(), 
    svgr({
    // svgr options: https://react-svgr.com/docs/options/
    svgrOptions: { exportType: "default", ref: true, svgo: false, titleProp: true },
     include: "**/*.svg",
    })
  ],
  build: {
    outDir: 'build'
  },
  // @ts-ignore
  base: process.env.GH_PAGES ? '/demo-dapp-with-react-ui/' : './',
  server: {
    // host: '0.0.0.0', // This allows access from your local network
    // port: 3000,      // Specify the port you want to use
    fs: {
      allow: ['../sdk', './'],
    },
  },
})
