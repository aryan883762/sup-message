import Vuex from 'vuex'
import Vue from 'vue'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

const store = new Vuex.Store({

  state: {
        logged: false,
        token: '',
        accountID: '',
        secret: ''
  },
  
  getters: {
    logged: state => state.logged,
    token: state => state.token,
    accountID: state =>  state.accountID,
    secret: state => state.secret
  },
  
  mutations: {
    SET_TOKEN(state, token) {
        state.token = token,
        state.logged = true
      },
    SET_ACCOUNT_ID(state, id) {
    state.accountID = id
  },
  SET_API_SECRET(state, id) {
    state.secret = id
  },
  },
  
  actions: {
   
  },
  plugins: [createPersistedState()]
});
export default store;