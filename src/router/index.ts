import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home/Home.vue'
import store from '@/store'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,

  },
  {
    path: '/credit',
    name: 'Credit',
    component: () => import(/* webpackChunkName: "credit" */ '../views/Credit/Credit.vue'),

  },
  {
    path: '/financial',
    name: 'Financial',
    component: () => import(/* webpackChunkName: "financial" */ '../views/Financial/Financial.vue'),

  },
  {
    path: '/product',
    name: 'Product',
    component: () => import(/* webpackChunkName: "product" */ '../views/Product/Product.vue'),
  },
  {
    path: '/details',
    name: 'Details',
    component: () => import(/* webpackChunkName: "details" */ '../views/Details/Details.vue'),
  },


  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login/Login.vue'),

  },

  {
    path: '/admin',
    name: 'Admin',
    component: () => import(/* webpackChunkName: "admin" */ '../views/Admin/Admin.vue'),

  },
  {
    path: '/userinfo',
    name: 'UserInfo',
    component: () => import(/* webpackChunkName: "userinfo" */ '../views/UserInfo/UserInfo.vue'),

  },
  {
    path: '/change',
    name: 'Change',
    component: () => import(/* webpackChunkName: "change" */ '../views/Change/Change.vue'),

  },
  {
    path: '/cert',
    name: 'Cert',
    component: () => import(/* webpackChunkName: "cert" */ '../views/Cert/Cert.vue'),

  },
  {
    path: '/visit',
    name: 'Visit',
    component: () => import(/* webpackChunkName: "visit" */ '../views/Visit/Visit.vue'),

  },
  {
    path: '/certadd',
    name: 'CertAdd',
    component: () => import(/* webpackChunkName: "visit" */ '../views/CertAdd/CertAdd.vue'),

  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,

})


const routerKeep = ["Admin", "UserInfo", "Change", "Cert", 'Visit', 'CertAdd']

router.beforeEach((to, form, next) => {
  const managerInfo: UserInfor = store.getters["admin/managerInfo"];
  const name = to.name as string;
  const { manager_id } = managerInfo;
  const wx = navigator.userAgent.toLowerCase();
  if (!wx.match(/MicroMessenger/i)?.includes("micromessenger")) {
    return;
  }

  if (routerKeep.includes(name)) {
    manager_id ? next() : router.replace('/login');
  } else {
    next();
  }
})

export default router
