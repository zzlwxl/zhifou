import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Main',
    component: import(/* webpackChunkName: "main" */ '../views/main/Main.vue')
  },
  {
    path:'/login',
    component:() => import(/* webpackChunkName: "login" */ '../views/login/cpns/LoginPanel.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
