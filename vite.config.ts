import type { UserConfig, ConfigEnv } from 'vite'
import { loadEnv } from 'vite'
import { resolve } from 'path'
// import { generateModifyVars } from './build/generate/generateModifyVars'
import { createProxy } from './build/vite/proxy'
import { wrapperEnv } from './build/utils'
import { createVitePlugins } from './build/vite/plugin'

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir)
}

export default ({ command, mode }: ConfigEnv): UserConfig => {
  const root = process.cwd()

  const env = loadEnv(mode, root)

  // The boolean type read by loadEnv is a string. This function can be converted to boolean type
  const viteEnv = wrapperEnv(env)

  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY, VITE_DROP_CONSOLE } = viteEnv

  const isBuild = command === 'build'

  return {
    base: VITE_PUBLIC_PATH,
    root,
    resolve: {
      alias: [
        // /@/xxxx => src/xxxx
        {
          find: /\/@\//,
          replacement: pathResolve('src') + '/',
        },
        // /#/xxxx => types/xxxx
        {
          find: /\/#\//,
          replacement: pathResolve('src/types') + '/',
        },
      ],
    },
    server: {
      // Listening on all local IPs
      host: true,
      open: true,
      port: VITE_PORT,
      // Load proxy configuration from .env
      proxy: createProxy(VITE_PROXY),
    },
    build: {
      target: 'es2015',
      terserOptions: {
        compress: {
          keep_infinity: true,
          // Used to delete console in production environment
          drop_console: VITE_DROP_CONSOLE,
        },
      },
      // Turning off brotliSize display can slightly reduce packaging time
      brotliSize: false,
      chunkSizeWarningLimit: 2000,
    },
    define: {
      __INTLIFY_PROD_DEVTOOLS__: false,
    },

    css: {
      preprocessorOptions: {
        less: {
          // modifyVars: generateModifyVars(),
          modifyVars: {
            hack: `true; @import (reference) "${resolve(
              'src/design/var/breakpoint.less',
            )}"; @import (reference) "${resolve('src/design/var/variable.less')}";`,
          },
          javascriptEnabled: true,
        },
      },
    },

    // The vite plugin used by the project. The quantity is large, so it is separately extracted and managed
    plugins: createVitePlugins(viteEnv, isBuild),

    optimizeDeps: {
      include: ['@iconify/iconify'],
      // exclude: [],
    },
  }
}
