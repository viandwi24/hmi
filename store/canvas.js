export const state = () => ({
  componentSelected: null,
  componentsHaveAlarm: []
})

export const mutations = {
  setComponent (state, component = null) {
    state.componentSelected = component
  },
  setComponentsHaveAlarm (state, components = null) {
    state.componentsHaveAlarm = components
  }
}

export const actions = {
  componentOnClose ({ commit }, item) {
    const menuDiv = document.querySelector('div.footer')
    menuDiv.animate([
      { opacity: 1, transform: 'translateY(0px)' },
      { opacity: 0, transform: 'translateY(120px)' }
    ], {
      duration: 500
    })
    setTimeout(() => {
      document.querySelector('#line-spotlight').innerHTML = ''
      commit('setComponent', null)
      menuDiv.animate([
        { opacity: 0, transform: 'translateY(120px)' },
        { opacity: 1, transform: 'translateY(0px)' }
      ], {
        duration: 500
      })
    }, 400)
  },
  setComponentsHaveAlarm ({ commit, state }, components) {
    state.componentsHaveAlarm = components
  }
}
