export const state = () => ({
  loading: false,
  notifyLoading: {
    show: false,
    title: '',
    description: ''
  }
})

export const mutations = {
  SET_LOADING (state, isLoading) {
    state.loading = isLoading
  },
  SET_NOTIFY_LOADING (state, params) {
    state.notifyLoading.show = params.show
    if (params.title) {
      state.notifyLoading.title = params.title
    }
    if (params.description) {
      state.notifyLoading.description = params.description
    }
  }
}
