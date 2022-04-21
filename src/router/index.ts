import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import LocalCache from '@/utils/cache'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Main',
    redirect: '/article/default',
    component: ()=> import(/* webpackChunkName: "main" */ '../views/main/Main.vue'),
    children: [
      {
        path: 'article/:type',
        name:'article',
        component: ()=> import(/* webpackChunkName: "main" */ '../views/article/ArticleList.vue'),
      }
    ]
  },
  {
    path:'/test',
    name:'test',
    component:()=>import(/* webpackChunkName: "main" */ '../components/HelloWorld.vue')
  },
  {
    path:'/articleinfo',
    name:'ArticleInfo',
    component: ()=>import(/* webpackChunkName: "main" */ '../views/main/ArticleInfo.vue'),
    children:[
      {
        
        path:'info/:id',
        name:'info',
        props:true,
        component: ()=>import(/* webpackChunkName: "main" */ '../views/article/ArticleInfo.vue'),
      }
    ]
  },
  {
    path: '/login',
    component: ()=> import(/* webpackChunkName: "login" */ '../views/login/cpns/LoginPanel.vue')
  },
  {
    path: '/user',
    component: ()=>import(/* webpackChunkName: "user" */ '../views/user/user.vue'),
    meta: {
      login_require: true,
    },
  },
  {
    path: '/setpwd',
    component: ()=> import(/* webpackChunkName: "user" */ '../views/user/SetPwd.vue'),
    meta: {
      login_require: true,
    },
  },
  {
    path: '/forgetpwd',
    component: ()=> import(/* webpackChunkName: "user" */ '../views/user/ForgetPwd.vue'),
  },
  {
    path: '/create',
    component: ()=> import(/* webpackChunkName: "main" */ '../views/article/Article.vue'),
    meta: {
      login_require: true,
    },
  },
  {
    path:'/edit',
    name:'edit',
    component:()=>import('../components/Edit/Edit.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: () => import('../views/main/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to, from) => {
  console.log('to', to, 'from', from)
  if (to.meta.login_require && !LocalCache.getCache('token')) {
    return {
      path: '/login',
      query: { redirect: to.fullPath },
    }
  }
})

export default router
