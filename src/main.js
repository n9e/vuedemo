import Vue from 'vue'
import App from './App'
import router from './router'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import singleSpaVue from 'single-spa-vue'

Vue.use(Antd)

Vue.config.productionTip = false

const vueOptions = {
  el: '#ecmc-layout-container',
  router,
  render: h => h(App)
}

function domElementGetter () {
  let el = document.getElementById('ecmc-layout-container')
  if (!el) {
    el = document.createElement('div')
    el.id = 'ecmc-layout-container'
    document.body.appendChild(el)
  }
  return el
}

// singleSpaVue包装一个vue微前端服务对象
const vueLifecycles = singleSpaVue({
  Vue,
  appOptions: vueOptions,
  domElementGetter
})

// 导出生命周期对象
export const bootstrap = [vueLifecycles.bootstrap] // 启动时
export const mount = [vueLifecycles.mount] // 挂载时
export const unmount = [vueLifecycles.unmount] // 卸载时
