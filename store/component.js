export const state = () => ({
  states: []
})

export const getters = () => ({
  states (state) {
    return state.states
  }
})

export const mutations = {
  setStates (state, val = null) {
    state.states = []
    state.states = val
  }
}

export const actions = {
  async sendCommand ({ dispatch }, { ctx, name, value }) {
    const { $axios } = ctx
    const data = await $axios.put('/tags', { name, value })
    dispatch('fetchComponentState', { ctx })
    return data
    // console.log({ $overlayLoading, data })
    // $overlayLoading.show()
    // console.log({ app, name, value, $axios })
  },
  async fetchComponentState ({ commit }, { ctx }) {
    const { $overlayLoading, $axios } = ctx
    $overlayLoading.show()
    let res
    const a = async () => {
      res = await $axios.get('/tags')
      commit('setStates', res.data.data)
    }

    try {
      await a()
    } catch (error) {
      await a()
    }

    $overlayLoading.hide()
    return res.data.data
  },
  test ({ commit }, item) {
    console.log(item)
  }
}
