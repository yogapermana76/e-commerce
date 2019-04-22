import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import login from './views/login.vue'
import register from './views/register.vue'
import products from './views/products.vue'
import detailProduct from './views/detail-product.vue'
import addProduct from './views/add-product.vue'
import listProduct from './views/list-product.vue'
import listCart from './views/list-cart.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/products',
      name: 'products',
      component: products
    },
    {
      path: '/detail-product',
      name: 'detail-product',
      component: detailProduct
    },
    {
      path: '/add-product',
      name: 'add-product',
      component: addProduct
    },
    {
      path: '/list-product',
      name: 'list-product',
      component: listProduct
    },
    {
      path: '/list-cart',
      name: 'list-cart',
      component: listCart
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
