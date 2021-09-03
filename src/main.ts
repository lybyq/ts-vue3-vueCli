import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import elementPlus from 'element-plus'
import dataLog from '@/utils/data-log-acquisition'
// 这里全局引入做好的自定义指令
import directives from '@/directive/index'

const app = createApp(App)
app.use(store)
app.use(router)
app.use(elementPlus, { size: 'small' })
app.config.globalProperties.$utils = {
  dataLog
}
// 路由准备就绪后挂载APP实例
router.isReady().then(() => {
  app.mount('#app')
})
// 这里循环遍历做全局注册指令使用
Object.keys(directives).forEach(name => app.directive(name, directives[name]))
