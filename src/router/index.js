import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/home'
import Music from '@/components/music/music'


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/music',
      name: 'Music',
      component: Music
    }
  ]
})
