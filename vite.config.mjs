import { defineConfig } from 'vite'
import laravel from 'laravel-vite-plugin'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.jsx'],
            refresh: true,
        }),
        react(),
    ],
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    lodash: ['lodash'],
                    daisyui: ['daisyui'],
                    dayjs: ['dayjs'],
                    sonner: ['sonner'],
                    reactapexcharts: ['react-apexcharts'],
                    'react-tailwindcss-datepicker': [
                        'react-tailwindcss-datepicker',
                    ],
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
