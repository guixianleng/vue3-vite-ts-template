import type { App } from 'vue'
import CountdownInput from './CountDown/CountdownInput.vue'

const compList = [CountdownInput]

export function registerGlobComp(app: App) {
  compList.forEach((comp) => {
    app.component(comp?.name || comp?.displayName, comp)
  })

  app.component('CountdownInput', CountdownInput)
}
