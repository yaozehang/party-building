import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Vuex.Store({
  state:{
    userinfo:{
      address: "",
      age: 0,
      birthday: "",
      branchId: "",
      count: 0,
      disabled: 0,
      education: "",
      header: "",
      hometown: "",
      id: 0,
      idCard: "",
      jobRank: "",
      joinPartyTime: "",
      lastPayTime: "",
      leadPerson: "",
      nation: "",
      partyStatus: 0,
      password: "",
      phone: "",
      qqNum: "",
      salary: 0,
      sex: 0,
      special: "",
      totalScore: 0,
      username: "",
      wxNum: "",
    }
  },
  mutations:{
    CHANGE_USERINFO(state,userinfo){
      state.userinfo = userinfo
    }
  },
  actions:{},
  plugins: [
    createPersistedState({
      storage: {
        getItem: key => sessionStorage.getItem(key),
        setItem: (key, value) =>
        sessionStorage.setItem(key, value),
        removeItem: key => sessionStorage.removeItem(key),
      },
    }),
  ],
})

export default store;