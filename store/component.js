export const state = () => ({
  states: []
})

export const getters = () => ({
  states (state) {
    return state.states
  }
})

export const mutations = {
  setState (state, val = null) {
    state.states.push(val)
  }
}

export const actions = {
  test ({ commit }, item) {
    console.log(item)
  }
}
