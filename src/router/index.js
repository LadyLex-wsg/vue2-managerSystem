import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    component:()=>import('@/views/in/index.vue'),
    redirect:'/login',
    children:[
      {
        path:'login',
        component:()=>import('@/views/in/login.vue')
      },
      {
        path:'register',
        component:()=>import('@/views/in/register.vue')
      }
    ]
  },
  {
    path:'/home',
    component:()=>import('@/views/inside/home.vue'),
    redirect:'/home/list',
    children:[
      {
        path:'list',
        component:()=>import('@/views/inside/list.vue')
      },
      {
        path:'fix',
        component:()=>import('@/views/inside/fix.vue')
      }
    ]
  },
  {
    path:'*',
    component:()=>import('@/views/404.vue')
  },{
    path:'/401',
    component:()=>import('@/views/401.vue')
  }
]

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
