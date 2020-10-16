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
  const isAuthenticated = localStorage.username
  if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
  else if (to.name === 'Login' && isAuthenticated) next({ name: 'PlayRoom' })
<<<<<<< HEAD
=======
  else if (to.name === 'PlayRoom' && from.name === null && isAuthenticated) {
    localStorage.clear()
    next({ name: 'Login' })
  }
>>>>>>> 29234a58089a71110ed63ad616208e79ba87ac14
  else next()
})

export default router
