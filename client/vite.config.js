import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteCommonjs } from '@originjs/vite-plugin-commonjs'


// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react({
            namedExports: {
                'scheduler': ['unstable_runWithPriority', 'unstable_LowPriority']
            }
        }),
        // viteCommonjs({
        //     namedExports: {
        //         'node_modules/formik/node_modules/scheduler/index.js': ['unstable_runWithPriority'],
        //     }
        // })
    ]
})
