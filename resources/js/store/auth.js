import axios from 'axios';

const checkToken = () => {
    return localStorage.getItem('token') ? localStorage.getItem('token') : ''
}

const checkAuthentication = () => {
    return localStorage.getItem('token') ? true : false
}

const getUserObject = async () => {
    if (localStorage.getItem('token')) {
        const response = await axios.get('/api/user');
        // console.log(response.data.data);
        return response.data.data;
    } else {
        return {};
    }
}

export default {
    namespaced: true,
    state: {
        token: checkToken(),
        authenticated: checkAuthentication(),
        user: await getUserObject()
    },
    getters: {
        authenticated(state) {
            return state.authenticated
        },
        user(state) {
            return state.user
        },
        token(state) {
            return state.token
        }
    },
    mutations: {
        SET_AUTHENTICATED(state, value) {
            state.authenticated = value
        },
        SET_TOKEN(state, value) {
            state.token = value
        },
        SET_USER(state, value) {
            state.user = value
        }
    },
    actions: {
        login({commit}, response) {
            // console.log('LoginResponse:', response);
            commit('SET_USER', response.data.user)
            const token = response.data.token;
            localStorage.setItem('token', token);
            commit('SET_TOKEN', token)
            commit('SET_AUTHENTICATED', token ? true : false)
            // return axios.get('/api/user').then(({data}) => {
            //     console.log(data);
            //     commit('SET_USER', data)
            //     commit('SET_AUTHENTICATED', true)
            // }).catch(({res}) => {
            //     commit('SET_USER', {})
            //     commit('SET_AUTHENTICATED', false)
            // })
        },
        getUser({commit}) {
            return axios.get('/api/user').then(({data}) => {
                console.log(data);
                if (data.success) {
                    commit('SET_USER', data.data)
                    commit('SET_AUTHENTICATED', true)
                }
            }).catch(({res}) => {
                commit('SET_USER', {})
                commit('SET_AUTHENTICATED', false)
            })
        },
        logout({commit}) {
            commit('SET_USER', {})
            commit('SET_TOKEN', '')
            commit('SET_AUTHENTICATED', false)
        }
    }
}
