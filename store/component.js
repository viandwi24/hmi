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
  async fetchComponentState ({ commit }, params) {
    const { $overlayLoading, $notifyLoading, $axios } = params.ctx
    if (params.background) {
      $overlayLoading.show()
    } else {
      await $notifyLoading.show(params.ctx, 'Fetching state...', 'Updating state of all component...', false)
    }
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

    if (params.background) {
      $overlayLoading.hide()
    } else {
      $notifyLoading.hide()
    }
    return res.data.data
  },
  test ({ commit }, item) {
    console.log(item)
  }
}
