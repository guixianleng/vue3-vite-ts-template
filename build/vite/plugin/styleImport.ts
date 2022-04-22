/**
 *  Introduces component library styles on demand.
 * https://github.com/anncwb/vite-plugin-style-import
 */
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

export function configStyleImportPlugin() {
  const styleImportPlugin = Components({
    resolvers: [AntDesignVueResolver()],
    dts: true,
    dirs: [],
    deep: false,
  })
  return styleImportPlugin
}
