import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
// import TagVideoList from '../views/TagVideoList.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/registration',
    name: 'user/registration',
    component: () => import(/* webpackChunkName: "userregistration" */ '../views/UserRegistration.vue')
  },
  {
    path: '/login',
    name: 'user/login',
    component: () => import(/* webpackChunkName: "userlogin" */ '../views/UserLogin.vue')
  },
  {
    path: '/admin/videos',
    name: 'admin-video-list',
    component: () => import(/* webpackChunkName: "adminvideolist" */ '../views/AdminVideoList.vue')
  },
  {
    path: '/admin/users',
    name: 'admin-user-list',
    component: () => import(/* webpackChunkName: "adminuserlist" */ '../views/AdminUserList.vue')
  },
  {
    path: '/admin/videos/:id/edit',
    name: 'admin-video-edit',
    component: () => import(/* webpackChunkName: "adminvideoedit" */ '../views/AdminVideoEdit.vue'),
    params: true
  },
  {
    path: '/video/new',
    name: 'video-create',
    component: () => import(/* webpackChunkName: "videocreate" */ '../views/VideoCreate.vue')
  },
  {
    path: '/video/:id',
    name: 'video-watch',
    component: () => import(/* webpackChunkName: "videowatch" */ '../views/VideoWatch.vue'),
    params: true
  },
  {
    path: '/tag/:id',
    name: 'tag',
    component: () => import(/* webpackChunkName: "tagvideolist" */ '../views/TagVideoList.vue'),
    params: true
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
