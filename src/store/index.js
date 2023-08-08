import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)
export const sessionStorageKey = 'session-20220628';
const session = createPersistedState({
  key: sessionStorageKey,
  storage: window.sessionStorage, //选择sessionStorage 进行存储
  // paths:['menus','user']
  reducer: (vuexState) => {
    let sessionState = Object.assign({}, vuexState);
    // for (let key in sessionState) {
    //   if (key == 'login') {
    //     delete sessionState[key];
    //   }
    // }
    return sessionState;
  }
});

const user = {
  state: {
    userName: 'lidaxuan',
    count: 33
  },
  getters: {
    userName: state => state.userName,
    userCount: state => state.count,
  }
}

export const store = new Vuex.Store({
  state: {
    count: 1
  },
  getters: {
    count: state => state.count
  },
  mutations: {
    increment(state, num) {
      state.count = num;
    }
  },
  actions: {
    actionsIncrement({commit}, num) {
      commit('increment', num)
    }
  },
  modules: {
    user
  },
  plugins: [session]
})