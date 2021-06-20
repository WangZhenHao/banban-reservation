import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@src/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/login'),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/home',
    name: 'home',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/home'),
    meta: {
      title: '主页',
      noAuth: false
    },
    children: [
      {
        path: '/',
        redirect: '/home/twoSubject'
      },
      {
        path: '/home/twoSubject',
        name: 'twoSubject',
        component: () => import(/* webpackChunkName: "twoSubject" */ '../views/home/twoSubject'),
        meta: {
          title: '科目二'
        }
      },
      {
        path: '/home/analogueMachine',
        name: 'analogueMachine',
        component: () => import(/* webpackChunkName: "analogueMachine" */ '../views/home/analogueMachine'),
        meta: {
          title: '模拟机预约'
        }
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const title = to.meta.title
  document.title = title;

  if(to.meta.noAuth) {
    next();
  } else if(to.name === 'login') {
    store.dispatch('initInfo').then(() => {
      next('/home')
    }).catch(() => {
      next();
    })
  } else {
    store.dispatch('initInfo').then(() => {
      next();
    }).catch(() => {
      next('/login')
    })
  }

})

export default router
