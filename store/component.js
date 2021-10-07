export const state = () => ({
  states: [],
  sendingCommand: false
})

export const getters = () => ({
  states (state) {
    return state.states
  }
})

export const mutations = {
  setSendingCommand (state, active = true) {
    state.sendingCommand = active
  },
  setStates (state, val = null) {
    state.states = []
    state.states = val
  }
}

export const actions = {
  async sendCommand ({ commit }, { ctx, name, value }) {
    const { $axios } = ctx
    // commit sending command true
    commit('setSendingCommand', true)
    let data
    try {
      data = await $axios.put('/tags', { name, value })
    } catch (error) {
    }
    // commit sending command false
    commit('setSendingCommand', false)
    // dispatch('fetchComponentState', { ctx })
    return data
    // console.log({ $overlayLoading, data })
    // $overlayLoading.show()
    // console.log({ app, name, value, $axios })
  },
  async fetchComponentState ({ commit, state }, params) {
    const { $overlayLoading, $notifyLoading, $axios } = params.ctx
    if (state.sendingCommand) {
      return undefined
    }

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
    // console.log(item)
  }
}
