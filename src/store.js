import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
    username: null,
    password: null,
    category: null,
}

const mutations = {
    logined(state, username, password) {
        state.username = username;
        state.password = password;
    },
    logout(state) {
        state.username = null;
        state.password = null;
    },
    changeCategory(state, category) {
        state.category = category;
    }
}

export default new Vuex.Store({
    state,
    mutations
})