import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  optimizeDeps: {
    include: ['jwt-decode'],
},
define:{
  global:"window",
},
  plugins: [react()],
  variants:{
    extends:{
      scrollbar:['hidden']
    },
  },
})




