import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import Code from '../views/Code.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'HomePage',
    component: Home
  },
  {
    path: '/code',
    name: 'CodePage',
    component: Code
  },
]

const router = new VueRouter({
  routes
})

export default router
