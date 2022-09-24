import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user:{
      access:false,
      name:'',
      part:'',
      job:'',
    }
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    main_confirm(context,payload){
      context.state.user.name = payload.name
      context.state.user.access = payload.access
      context.state.user.job = payload.job
      context.state.user.part = payload.part
    }
  },
  modules: {
  }
})
