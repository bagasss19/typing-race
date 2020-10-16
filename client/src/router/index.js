import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Rooms from '../views/Rooms.vue'
import PlayRoom from '../views/PlayRoom.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'PlayRoom',
    component: PlayRoom
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/rooms',
    name: 'Rooms',
    component: Rooms
  },
  // {
  //   path: '/playroom/:name',
  //   name: 'PlayRoom',
  //   component: PlayRoom
  // },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  console.log(to);
  console.log(from);
  const isAuthenticated = localStorage.username
  if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
  else if (to.name === 'Login' && isAuthenticated) next({ name: 'PlayRoom' })
  else next()
})

export default router
