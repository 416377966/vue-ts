import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/TS.vue'

Vue.use(Router)

export default new Router({
  //mode: 'history',
  routes: [
    {
      path: '/ts',
      alias: '/',
      name: 'ts',
      component: Home
    },
    {
      path: '/vuets',
      name: 'vuets',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "vuets" */ '@/views/VueTs.vue')
    },
    {
      path: '*',
      redirect: '/ts'
    }
  ]
})
