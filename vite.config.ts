import {fileURLToPath, URL} from "node:url";

import {quasar, transformAssetUrls} from "@quasar/vite-plugin";
import vue from "@vitejs/plugin-vue";
import {defineConfig} from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig({
    test: {
        environment: "jsdom",
    },
    plugins: [
        vue({
            template: {transformAssetUrls},
        }),

        quasar({
            sassVariables: "@/styles/quasar-variables.scss",
        }),
    ],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
});
