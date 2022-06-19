//tips:引入Cookie库
import Cookie from 'js-cookie'
export default {
    state: {
        token: ''
    },
    mutations: {
        setToken(state, val) {
            state.token = val
    //tips:存储token
            Cookie.set('token', val)
        },
        clearToken(state) {
            state.token = ''
    //tips:移除token
            Cookie.remove('token')
        },
        getToken(state) {
    //tips:获取token
            state.token = state.token || Cookie.get('token')
        }
    }
}