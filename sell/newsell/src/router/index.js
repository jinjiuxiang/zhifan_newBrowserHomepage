import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/hello',
      name: 'HelloWorld',
      component:resolve => require(['@/components/HelloWorld'],resolve)
    },
    {
      path: '/parent',
      name: 'parent',
      component:resolve => require(['@/components/parent'],resolve)
    },
    {
      path: '/child',
      name: 'child',
      component:resolve => require(['@/components/child'],resolve)
    },
    {
      path: '/',
      name: 'home',
      component:resolve => require(['@/components/home'],resolve)
    },
    {
      path: '/searchList',
      name: 'searchList',
      component:resolve => require(['@/components/searchList'],resolve)
    },
    {
      path: '/nolist',
      name: 'nolist',
      component:resolve => require(['@/components/noList'],resolve)
    },
  ]
})
