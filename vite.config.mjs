import { defineConfig } from 'vite'
import laravel from 'laravel-vite-plugin'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.jsx'],
            refresh: true,
        }),
        react(),
        tailwindcss(),
    ],
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    lodash: ['lodash'],
                    dayjs: ['dayjs'],
                    sonner: ['sonner'],
                    reactapexcharts: ['react-apexcharts'],
                    'react-json-pretty': ['react-json-pretty'],
                },
            },
        },
        chunkSizeWarningLimit: '571kB',
    },
    server: {
        hmr: { host: 'localhost' },
    },
})
