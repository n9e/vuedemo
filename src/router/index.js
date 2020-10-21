import Vue from 'vue'
import Router from 'vue-router'
import pkgJson from '../../package.json'
Vue.use(Router)

// 路由配置信息
const routes = [
  {
    path: '/home',
    component: () => import('../views/layout.vue'),
  },
  {
    path: '*',
    redirect: '/home'
  }
]

const router = new Router({
  mode: 'history',
  base: `/${pkgJson.systemName}`,
  scrollBehavior: () => ({ y: 0 }),
  routes: routes
})


export default router
