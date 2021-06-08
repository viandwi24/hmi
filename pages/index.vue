/* eslint-disable vue/no-v-html */
<template>
  <div class="screen">
    <div class="controls">
      <div class="group">
        <div class="header">
          Controls
        </div>
        <div class="content">
          <div class="tw-flex tw-w-full">
            <div class="tw-w-1/2">
              Panel Info
            </div>
            <div class="tw-w-1/2">
              <label class="flex items-center space-x-3">
                <input v-model="controls.showPanel" type="checkbox" name="checked-demo" class="form-tick appearance-none h-6 w-6 border border-gray-300 rounded-md checked:bg-blue-600 checked:border-transparent focus:outline-none">
                <span class="text-gray-900 font-medium">Enable</span>
              </label>
            </div>
          </div>
          <div class="tw-flex tw-w-full">
            <div class="tw-w-1/2">
              Obj Scale
            </div>
            <div class="tw-w-1/2 tw-flex">
              <input
                v-model="controls.objScale"
                class="rounded-lg overflow-hidden appearance-none bg-gray-400 tw-w-full"
                type="range"
                min="0.2"
                max="2"
                step="0.05"
                value="0.5"
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container" :style="{ transform: `scale(${controls.objScale})` }">
      <img src="img/machine/overview.png" class="overview">
      <div class="layer-components">
        <div class="components">
          <img
            v-for="(item, i) in components"
            :id="`component-${item.name}`"
            :key="i"
            :src="`img/machine/${item.onImgShow(item)}.png`"
            class="component"
            @click="componentClicked(item)"
          >
        </div>
      </div>
      <div class="layer-panels">
        <div v-if="controls.showPanel" class="panels">
          <div
            v-for="(item, i) in components"
            :id="`panel-${item.name}`"
            :key="i"
            class="panel"
          >
            <div class="panel-container" v-html="item.panel(item)" />
          </div>
        </div>
      </div>
    </div>
    <div class="menu">
      <div v-if="componentSelected != null" class="menu-container">
        <div class="header">
          {{ componentSelected.name }}
        </div>
        <div class="content">
          <div v-for="(item, i) in componentSelected.menu(componentSelected)" :key="i">
            <button v-if="item.type == 'button'" @click="item.onClick(componentSelected, item)">
              {{ item.text }}
            </button>
          </div>
          <button @click="componentSelected = null">
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  onMounted,
  reactive,
  ref
} from '@nuxtjs/composition-api'

export default {
  setup () {
    const controls = reactive({
      showPanel: true,
      objScale: 1
    })
    const componentSelected = ref(null)
    const components = reactive([
      {
        type: 'motor',
        name: 'motor_1',
        state: {
          active: false,
          auto: false
        },
        meta: {
          img: 'motor',
          position: {
            x: 538, y: 404
          }
        },
        panel: (item) => {
          return `
            <div class="header">${item.name}</div>
            <div class="content">
              <div>${(item.state.active) ? 'Active' : 'Nonactive'}</div>
              <div>Auto : ${(item.state.auto) ? 'On' : 'Off'}</div>
            </div>
          `
        },
        menu: (item) => {
          return [
            { type: 'button', name: 'toggle', text: (item.state.active ? 'Turn Off' : 'Turn On'), onClick: (item) => { item.state.active = !item.state.active } },
            { type: 'button', name: 'auto', text: (item.state.auto ? 'Disactive Auto' : 'Active Auto'), onClick: (item) => { item.state.auto = !item.state.auto } }
          ]
        },
        onImgShow: item => (item.state.active) ? `${item.meta.img}_active` : `${item.meta.img}`
      },
      {
        type: 'motor',
        name: 'motor_2_3000rpm',
        state: {
          active: true
        },
        meta: {
          img: 'motor',
          position: {
            x: 826, y: 540
          }
        },
        panel: (item) => {
          return `
            <div class="header">${item.name}</div>
            <div class="content">${(item.state.active) ? 'Active' : 'Nonactive'}</div>
          `
        },
        menu: (item) => {
          return [
            { type: 'button', name: 'toggle', text: (item.state.active ? 'Turn Off' : 'Turn On'), onClick: (item) => { item.state.active = !item.state.active } }
          ]
        },
        onImgShow: item => (item.state.active) ? `${item.meta.img}_active` : `${item.meta.img}`
      },
      {
        type: 'motor',
        name: 'motor_small_3_1000rpm',
        state: {
          active: true
        },
        meta: {
          img: 'motor_small',
          position: {
            x: 1424, y: 478
          }
        },
        panel: (item) => {
          return `
            <div class="header">${item.name}</div>
            <div class="content">${(item.state.active) ? 'Active' : 'Nonactive'}</div>
          `
        },
        menu: (item) => {
          return [
            { type: 'button', name: 'toggle', text: (item.state.active ? 'Turn Off' : 'Turn On'), onClick: (item) => { item.state.active = !item.state.active } }
          ]
        },
        onImgShow: item => (item.state.active) ? `${item.meta.img}_active` : `${item.meta.img}`
      }
    ])
    let timerRezise

    onMounted(() => {
      const overview = document.querySelector('img.overview')
      const overviewOriginal = 1920
      clearInterval(timerRezise)
      timerRezise = setInterval(() => {
        components.forEach((e) => {
          // component
          const overviewResult = overview.clientWidth
          const a = document.querySelector(`#component-${e.name}`)
          const clientOriginal = (typeof a.dataset.originalWidth === 'undefined') ? a.clientWidth : a.dataset.originalWidth
          const clientResult = (overviewResult * clientOriginal) / overviewOriginal
          const clientX = (overviewResult * e.meta.position.x) / overviewOriginal
          const clientY = (overviewResult * e.meta.position.y) / overviewOriginal
          a.dataset.originalWidth = clientOriginal
          a.style.width = `${clientResult}px`
          a.style.top = `${clientY}px`
          a.style.left = `${clientX}px`

          // panel
          if (controls.showPanel) {
            const panelGap = 35
            const panel = document.querySelector(`#panel-${e.name}`)
            panel.style.top = `${clientY}px`
            panel.style.left = `${(clientX - (panel.clientWidth + panelGap))}px`
          }
        })
      }, 50)
    })

    return {
      components,
      controls,
      componentSelected,
      componentClicked: (item) => {
        const menuDiv = document.querySelector('div.menu')

        componentSelected.value = item
        if (typeof item.onClick !== 'undefined') {
          item.onClick(item)
        }

        menuDiv.animate([
          { opacity: 0, transform: 'translateY(120px)' },
          { opacity: 1, transform: 'translateY(0px)' }
        ], {
          duration: 500
        })

        // setTimeout(() => )
      },
      togglePanel: () => {
        controls.showPanel = !controls.showPanel
      }
    }
  }
}
</script>
