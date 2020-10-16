import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
const baseUrl = 'http://localhost:3000'



export default new Vuex.Store({
  state: {
    // quotes: "",
    // users: [],
    rooms: [],
    room: {},
    quote: ''
  },
  mutations: {
    // SET_QUOTES(state, payload) {
    //   state.quotes = payload
    // },
    'SOCKET_USER_CONNECTED'(state, payload) {
      state.users = payload
    },
    'SOCKET_ROOM_DETAIL'(state, payload) {
      state.room = payload
      console.log(state.room, "<<< socket updated room");
    },
    'SOCKET_UPDATED_ROOMS'(state, payload) {
      state.rooms = payload
      console.log(state.rooms, "<<< socket updated roomss");
    },
    'SOCKET_QUOTE_RECEIVED'(state, payload) {
      state.quote = payload
    }
  },
  actions: {
    // fetchQuotes(context) {
    //   console.log('trigger fetch quote from index.js')
    //   axios({
    //     url: baseUrl + '/quoteApi',
    //     method: 'get',
    //     // headers: {
    //     //   access_token: localStorage.access_token
    //     // }
    //   })
    //     .then(({ data }) => {
    //       console.log(data, '<< data fetch product index')
    //       context.commit('SET_QUOTES', data)
    //     })
    //     .catch(err => {
    //       console.log(err.response, '<< fetch products err response index')
    //     })
    // },

  },
  modules: {
  }
})
