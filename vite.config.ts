import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            '/integrations': {
                target: 'https://u0iwmgjmx0.execute-api.us-east-1.amazonaws.com/Prod',
                changeOrigin: true
            },
        },
    },
    define: {
        global: {},
    }
})
