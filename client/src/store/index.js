import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
const baseUrl = 'http://localhost:3000'



export default new Vuex.Store({
  state: {
    users: [],
    quote: ''
  },
  mutations: {
    'SOCKET_USER_CONNECTED'(state, payload) {
      state.users = payload
    },
    'SOCKET_QUOTE_RECEIVED'(state, payload) {
      state.quote = payload
    }
  },
  actions: {},
  modules: {
  }
})
