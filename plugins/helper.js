export default ({ app }, inject) => {
  inject('overlayLoading', {
    show: () => {
      app.store.commit('SET_LOADING', true)
    },
    hide: () => {
      app.store.commit('SET_LOADING', false)
    }
  })
  inject('notifyLoading', {
    show: async (ctx, title = 'Loading...', description = 'Please wait...', background = true) => {
      const { $sleep } = ctx
      app.store.commit('SET_NOTIFY_LOADING', {
        show: true, title, description, background
      })
      await $sleep(1500)
    },
    hide: () => {
      app.store.commit('SET_NOTIFY_LOADING', { show: false })
    }
  })
  inject('sleep', ms => new Promise(resolve => setTimeout(resolve, ms)))
}
