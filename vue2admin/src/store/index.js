import Vue from 'vue'
import Vuex from 'vuex'

import createPersistedState from "vuex-persistedstate"

import auth_service from '@/service/auth_service'
import admUserService from "@/service/adm_user_service"
import util from '@/util'

import menu from './modules/menu'

Vue.use(Vuex)


const store = new Vuex.Store({
  plugins: [createPersistedState({
    storage: window.sessionStorage,
    reducer(val) {
      return {
        isLogin: val.isLogin,
        token: val.isToken,
        userInfo: val.userInfo,
      }
    }
  })],

  state: {
    isLogin: false,
    token: localStorage.getItem('token'),
    userInfo: null,
  },
  mutations: {
    cbTokenLogin(state, userInfo) {
      state.isLogin = true
      state.userInfo = userInfo
    },
    cbTokenInvalid(state) {
      state.isLogin = false
      state.token = null
      localStorage.removeItem('token')
    },

    login(state, [token, userInfo]) {
      state.isLogin = true
      state.token = token
      state.userInfo = userInfo

      localStorage.setItem('token', token)
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    },

    logout(state) {
      Object.assign(state, initState)

      state.isLogin = false
      state.token = null
      state.userInfo = null
    },
  },
  actions: {
    login(context, data) {
      return new Promise((resolve, reject) => {
        auth_service.login(data).then((res) => {
          if (0 == res.code) {
            context.commit('login', [res.data.token, res.data.user])
            resolve(res)
          } else {
            reject(res.msg)
          }
        }).catch((err) => {
          reject(err)
        })
      })
    },
    info(context) {
      return new Promise((resolve, reject) => {
        admUserService.info().then((res) => {
          if (0 == res.code) {
            context.commit('setUserInfo', res.data)
            resolve(res)
          } else {
            reject(res.msg)
          }
        }).catch((err) => {
          reject(err)
        })
      })
    },
    logout(context) {
      localStorage.removeItem('token')

      auth_service.logout()

      context.commit('logout')
      
      window.location.reload()
    },
  },

  modules: {
    menu,
  }
})

const initState = util.deepCopy(store.state)


export default store
