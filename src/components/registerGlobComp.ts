import type { App } from 'vue'
import Breadcrumb from './breadcrumb/index.vue'

const compList = [Breadcrumb]

export function registerGlobComp(app: App) {
  compList.forEach((comp) => {
    app.component(comp?.name || comp?.displayName, comp)
  })

  app.component('Breadcrumb', Breadcrumb)
}
