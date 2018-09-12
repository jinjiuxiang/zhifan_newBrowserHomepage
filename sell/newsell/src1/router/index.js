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
      path: '/msearchList',
      name: 'msearchList',
      component:resolve => require(['@/components/mSearchList'],resolve)
    },
    {
      path: '/mNoList',
      name: 'mNoList',
      component:resolve => require(['@/components/mNoList'],resolve)
    },
  ]
})
