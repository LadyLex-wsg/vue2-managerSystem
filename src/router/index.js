import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    component:()=>import('../views/in/index.vue'),
    redirect:'/login',
    children:[
      {
        path:'login',
        component:()=>import('@/views/in/login.vue')
      },
      {
        path:'resign',
        component:()=>import('@/views/in/resign.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
