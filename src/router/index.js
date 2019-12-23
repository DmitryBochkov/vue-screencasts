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
    path: '/admin',
    name: 'admin',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "admin" */ '../views/Admin.vue'),
    beforeEnter(to, from, next) {
      const currentUser = JSON.parse(window.localStorage.getItem('user'))
      if (currentUser && currentUser.admin) {
        next()
      } else {
        next('/')
      }
    },
    children: [
      {
        path: 'videos',
        name: 'admin-video-list',
        component: () => import(/* webpackChunkName: "adminvideolist" */ '../views/AdminVideoList.vue'),
      },
      {
        path: 'users',
        name: 'admin-user-list',
        component: () => import(/* webpackChunkName: "adminuserlist" */ '../views/AdminUserList.vue'),
      },
      {
        path: 'videos/:id/edit',
        name: 'admin-video-edit',
        component: () => import(/* webpackChunkName: "adminvideoedit" */ '../views/AdminVideoEdit.vue'),
        params: true
      },
      {
        path: 'videos/:id/show',
        name: 'admin-video-show',
        component: () => import(/* webpackChunkName: "adminvideoshow" */ '../views/AdminVideoShow.vue'),
        params: true
      },
      {
        path: 'video/new',
        name: 'admin-video-create',
        component: () => import(/* webpackChunkName: "adminvideocreate" */ '../views/AdminVideoCreate.vue')
      },
      {
        path: 'tags',
        name: 'admin-tag-list',
        component: () => import(/* webpackChunkName: "admintaglist" */ '../views/AdminTagList.vue')
      },
    ]
  },
  {
    path: '/registration',
    name: 'user-registration',
    component: () => import(/* webpackChunkName: "userregistration" */ '../views/UserRegistration.vue')
  },
  {
    path: '/login',
    name: 'user-login',
    component: () => import(/* webpackChunkName: "userlogin" */ '../views/UserLogin.vue')
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
