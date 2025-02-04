import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    base: "/integration-backoffice/",
    server: {
        proxy: {
            '/integrations': {
                target: 'https://yptra05z5l.execute-api.us-east-1.amazonaws.com/Prod',
                changeOrigin: true
            },
        },
    },
    define: {
        global: {},
    }
})
