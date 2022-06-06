import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'

// Register icon sprite
import 'virtual:svg-icons-register'
import '@purge-icons/generated'

import '/@/design/index.less'
// 解决unplugin-vue-components为自动导入message和Modal的样式
import 'ant-design-vue/es/message/style/index'

// Register global components
import { registerGlobComp } from '/@/components/registerGlobComp'

const app = createApp(App)

registerGlobComp(app)
app.use(router)
app.use(store)

app.mount('#app')
