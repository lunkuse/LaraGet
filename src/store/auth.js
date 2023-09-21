import AuthService from '../service/auth-service'
import { useLocalStorage } from '../service/local-starage-service'

const { user } = useLocalStorage()
const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null }

export const auth = {
  namespaced: true,
  state: initialState,
  name: 'auth',
  actions: {
    login({ commit }, user) {
      return AuthService.login(user).then(
        res => {
          if (res.status === true) {
            console.log('store login: current lang', localStorage.getItem('lang'))
            console.log('Login user', res.payload.patient)
            commit('loginSuccess', res.payload.patient)
            return Promise.resolve(res)
          } else {
            return Promise.reject(res.error)
          }
        },
        error => {
          commit('loginFailure')
          return Promise.reject(error)
        }
      )
    },
    verification({ commit }, user) {
      return AuthService.verifyEmail(user).then(
        res => {
          if (res.status === true) {
            console.log('store login: current lang', localStorage.getItem('lang'))
            console.log('Login user', res.payload.user)
            commit('loginSuccess', res.payload.user)
            return Promise.resolve(res)
          } else {
            return Promise.reject(res.error)
          }
        },
        error => {
          commit('loginFailure')
          return Promise.reject(error)
        }
      )
    },
    logout({ commit }) {
      AuthService.logout()
      commit('logout')
    },
    register({ commit }, user) {
      return AuthService.register(user).then(
        response => {
          commit('registerSuccess')
          return Promise.resolve(response)
        },
        error => {
          commit('registerFailure')
          return Promise.reject(error)
        }
      )
    }
  },
  mutations: {
    loginSuccess(state, user) {
      console.log('checking here')
      state.status.loggedIn = true
      state.user = user
    },
    loginFailure(state) {
      state.status.loggedIn = false
      state.user = null
    },
    logout(state) {
      state.status.loggedIn = false
      state.user = null
    },
    registerSuccess(state) {
      state.status.loggedIn = false
    },
    registerFailure(state) {
      state.status.loggedIn = false
    },
    // Update
    update(state, payload) {
      // console.log({ UserInfo: payload })
      state.user = payload.user
      if (payload.isUpdate) {
        localStorage.setItem('user', JSON.stringify(payload.user))
      }
    },
    updateLoanDetails(state, payload) {
      state.user = payload.user
      if (payload.isLoanProfileDetails) {
        localStorage.setItem('user', JSON.stringify(payload.user))
      }
    }
  }
}
