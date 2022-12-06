import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    server: {
        port: 5001,//自定义端口号
        proxy: {
            // "/yunji": {
            //     target: "https://www.fastmock.site/mock/426a43d16dff6915190c15fc00f3fdca/",
            //     changeOrigin: true,
            // },
            "/imgserver-api/upload": {
                target: "http://127.0.0.1:8084/",
                changeOrigin: true,
            },
            "/imgserver-api/select": {
                target: "http://127.0.0.1:8084/",
                changeOrigin: true,
            },
            "/yunji-api": {
                target: "http://127.0.0.1:8081/",
                changeOrigin: true,
            },
            "/face-api": {
                target: "http://127.0.0.1:8082/",
                changeOrigin: true,

            },

        },
    },

    resolve: {
        // 配置路径别名
        alias: {
            '@': path.resolve(__dirname, './src'),
        }
    },
})
