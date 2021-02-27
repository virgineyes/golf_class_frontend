import * as types from './mutations_types.js'

export const state = {
    loading: false
 }

export const mutations = {
    [types.LOADING] (state, isLoading) {
        state.loading = isLoading
    }
}