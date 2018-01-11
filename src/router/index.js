import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import PersonPage from '@/pages/PersonPage'
import PersonPageEdit from '@/pages/PersonPageEdit'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/person',
      name: 'PersonPage',
      component: PersonPage
    },
    {
      path: '/person/:id',
      name: 'PersonPageEdit',
      component: PersonPageEdit
    }
  ]
})
