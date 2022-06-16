import Vue from 'vue'
import VueRouter from 'vue-router'

import store from '@/store'
import auth_service from '@/service/auth_service'

Vue.use(VueRouter)


const router = new VueRouter({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/Login.vue'),
    },
    {
      path: '/',
      name: 'Main',
      component: () => import('@/views/Main.vue'),
      meta: { auth: true },
    },
  ]
})


const addDynamicRoute = () => {
  const mainRoute = router.options.routes.find((v) => v.name === "Main");
  if (mainRoute.children != undefined && mainRoute.children.length > 0) return

  mainRoute.children = store.getters['menu/dynamicRoutes'];
  router.addRoutes([mainRoute]);
}

// 使用 token 登录
const tokenLogin = async next => {
  const res = await auth_service.loginToken()
  if (res && res.code == 0) {
    console.error('router token 登录成功, 进入主页')

    store.commit('cbTokenLogin', res.data)

    next({ name: 'Main' })
  } else {
    console.error('router loginToken 清除所有数据 返回错误信息:' + res.msg)
    store.commit('cbTokenInvalid')
    next({ name: 'Login' })
  }
}


router.beforeEach(async (to, from, next) => {
  // console.error('router.before to:', to.name, ',from:', from.name, ',isLogin:', store.state.isLogin, ',token:', store.state.token)

  if (to.name == null) {
    // 路由不存在, 说明是动态加载的路由, 可能是浏览器刷新后路由数据丢失
    next({ name: 'Main' })
    return
  }

  if (store.state.isLogin) {
    if (!store.getters['menu/isInit']) {
      await store.dispatch('menu/init')
      addDynamicRoute()

      next({ ...to, replace: true })
    } else {
      if (to.name == 'Login' && from != undefined && from.name != 'Login') {
        next(from)
      } else {
        next();
      }
    }
  } else {
    if (to.meta.auth) {
      if (store.state.token) {
        tokenLogin(next)
      } else {
        next({ name: 'Login' })
      }
    } else {
      if (to.name == 'Login' && store.state.token) {
        tokenLogin(next)
      } else {
        next()
      }
    }
  }
})


export default router
