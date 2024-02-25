import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: ["resources/css/app.css", "resources/js/app.jsx"],
            refresh: true,
        }),
        react(),
    ],
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    lodash: ['lodash'],
                    preline: ['preline'],
                    flowbite: ['flowbite', 'flowbite-react'],
                    moment: ['moment'],
                    reactdatepicker: ['react-datepicker'],
                    reacttoastify: ['react-toastify'],
                }
            }
        }
    }
});
