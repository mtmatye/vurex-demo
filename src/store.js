import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        list: [],
        inputValue: '',
        nextId: 5,
        viewType: 'all'
    },
    mutations: {
        initList(state, list) {
            state.list = list
        },
        changeInputValue(state, value) {
            state.inputValue = value
        },
        addItemToList(state, item) {
            state.list.push(item)
        },
        nextIdUp(state) {
            state.nextId += 1
        },
        changeChecked(state, obj) {
            const i = state.list.findIndex(item => item.id === obj.id)
            if (i !== -1) {
                state.list[i].done = obj.checked
            }
        },
        clearDone(state) {
            state.list = state.list.filter(item => item.done === false)
        },
        changeViewType(state, type) {
            state.viewType = type
        }
    },
    actions: {
        getList(context) {
            axios.get('/list.json').then(({
                data
            }) => {
                console.log(data)
                context.commit('initList', data)
            })
        }
    },
    getters: {
        unDoneCounts(state) {
            return state.list.filter(item => item.done === false).length
        },
        filteredList(state) {
            if (state.viewType === 'all') {
                return state.list
            } else if (state.viewType === 'undone') {
                return state.list.filter(item => item.done === false)
            } else if (state.viewType === 'done') {
                return state.list.filter(item => item.done === true)
            }
        }
    }
})
