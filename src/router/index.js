import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/home'
import Music from '@/components/music/music'
import CanvasTest from '@/components/canvasTest/canvasTest'


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
    },
    {
      path: '/canvasTest',
      name: 'CanvasTest',
      component: CanvasTest
    }
  ]
})
