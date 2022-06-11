import Vue from 'vue'
import Vuex from 'vuex'
import tab from './tab'
import user from './user'
//tips:模块化；引入vuex 
Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        tab,
        user
    }
})