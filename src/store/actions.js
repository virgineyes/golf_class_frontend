import * as types from './mutations_types.js'

export const toggleLoading = ({ commit }, isLoading) => {
    commit(types.LOADING, isLoading)
}