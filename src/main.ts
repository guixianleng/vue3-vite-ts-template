import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'

// Register icon sprite
import 'virtual:svg-icons-register'
import '@purge-icons/generated'

const app = createApp(App)

app.use(router)
app.use(store)

app.mount('#app')
